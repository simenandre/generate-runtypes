import { GenerateOptions } from './main';
import { AnyType, RootType } from './types';
import { RecordField } from './types';

/**
 * public for testing
 *
 * Used to evaluate if `Record` type include `readonly` and/or `nullable`
 * @private
 */
export function groupFieldKinds(fields: readonly RecordField[]): {
  readonly: boolean;
  nullable: boolean;
  fields: RecordField[];
}[] {
  return [
    {
      readonly: false,
      nullable: false,
      fields: fields.filter((e) => !e.readonly && !e.nullable),
    },
    {
      readonly: false,
      nullable: true,
      fields: fields.filter((e) => !e.readonly && e.nullable),
    },
    {
      readonly: true,
      nullable: false,
      fields: fields.filter((e) => e.readonly && !e.nullable),
    },
    {
      readonly: true,
      nullable: true,
      fields: fields.filter((e) => e.readonly && e.nullable),
    },
  ].filter((e) => e.fields.length > 0);
}

/**
 * Return a copy of `items` with duplicates removed. Uses the value returned
 * by `keyFun` to determine the identity of an item.
 * @param items
 * @param keyFun
 */
function uniqBy<T, K>(items: readonly T[], keyFun: (value: T) => K): T[] {
  const keys = new Set<K>();
  const ret: T[] = [];
  for (const item of items) {
    const key = keyFun(item);
    if (!keys.has(key)) {
      keys.add(key);
      ret.push(item);
    }
  }
  return ret;
}

/**
 * Returns a copy of `strings` with duplicates removed.
 * @param strings
 */
function uniq(strings: readonly string[]) {
  return uniqBy(strings, (e) => e);
}

/**
 * Get a list of all named named types referenced in a type
 *
 * public for testing
 * @private
 */
export function getNamedTypes(t: AnyType): readonly string[] {
  switch (t.kind) {
    case 'boolean':
    case 'function':
    case 'literal':
    case 'never':
    case 'null':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
    case 'unknown':
      return [];
    case 'named':
      return [t.name];
    case 'array':
      return uniq(getNamedTypes(t.type));
    case 'dictionary':
      return uniq(getNamedTypes(t.valueType));
    case 'intersect':
      return uniq(t.types.flatMap(getNamedTypes));
    case 'record':
      return uniq(t.fields.map((e) => e.type).flatMap(getNamedTypes));
    case 'union':
      return uniq(t.types.flatMap(getNamedTypes));
  }
}

/**
 * Given an array of roots, return an object with
 * root names as keys and array of adjacent node names as values.
 * @param roots
 */
function getEdges(roots: RootType[]): Record<string, readonly string[]> {
  return Object.fromEntries(
    roots.map((root) => [root.name, getNamedTypes(root.type)]),
  );
}

/**
 * Finds root type that reference each other cyclicly. Returns an array of
 * tuples. Each tuple contains two strings; the name of the roots that reference
 * each other.
 *
 * Dependencies can either be a root referencing itself, two roots directly
 * referencing each other, or roots referencing each other via other named
 * types.
 *
 * @param roots
 * @returns
 */
export function getCyclicDependencies(roots: RootType[]): [string, string][] {
  const nodeEdges = getEdges(roots);
  const cycles: [string, string][] = [];

  const visitor = (target: string, subject: string, visited: string[]) => {
    const neighbors = nodeEdges[subject];
    if (neighbors === undefined) {
      return;
    }

    visited.push(subject);
    if (neighbors.includes(target)) {
      cycles.push([target, subject]);
    }
    neighbors
      .filter((e) => !visited.includes(e))
      .forEach((e) => visitor(target, e, visited));
  };

  roots.forEach((e) => visitor(e.name, e.name, []));

  const ret = uniqBy(
    cycles.map((e) => e.sort()),
    (e) => e.join(':'),
  );

  return ret;
}
/**
 * public for testing
 * @private
 * @param roots
 * @returns
 */
export function getUnknownNamedTypes(roots: RootType[]): readonly string[] {
  const rootNames = roots.map((e) => e.name);
  const namedTypes = roots.flatMap((e) => getNamedTypes(e.type));
  return namedTypes.filter((e) => !rootNames.includes(e));
}

export function anyTypeToTsType(
  type: AnyType,
  opts: Pick<GenerateOptions, 'formatTypeName'>,
): string {
  switch (type.kind) {
    case 'boolean':
    case 'never':
    case 'null':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
    case 'unknown':
      return type.kind;

    case 'array':
      return `
        ${type.readonly ? 'readonly ' : ''} (${anyTypeToTsType(
        type.type,
        opts,
      )})[];
      `.trim();

    case 'union':
      return type.types.map((e) => anyTypeToTsType(e, opts)).join(' | ');

    case 'intersect':
      return type.types.map((e) => anyTypeToTsType(e, opts)).join(' & ');

    case 'dictionary':
      return `Dictionary<string, ${anyTypeToTsType(type.valueType, opts)}>`;

    case 'named':
      return opts.formatTypeName(type.name);

    case 'literal':
      return typeof type.value === 'string'
        ? `"${type.value}"`
        : String(type.value);

    case 'function':
      return `() => unknown`;

    case 'record': {
      const fields = type.fields.map((field) => {
        return `${field.readonly ? 'readonly ' : ''}${field.name}${
          field.nullable ? '?' : ''
        }: ${anyTypeToTsType(field.type, opts)}`;
      });
      return `{\n ${fields.join('\n')} \n}`;
    }
  }
}

export function rootToType(
  root: RootType,
  opts: Pick<GenerateOptions, 'formatRuntypeName' | 'formatTypeName'>,
): string {
  return `type ${root.name} = ${anyTypeToTsType(root.type, opts)}`;
}

/**
 * Topological sort of non-cyclic roots. Allows us to emit them in the correct
 * order. Uses depth first search, see
 * https://en.wikipedia.org/wiki/Topological_sorting
 * public for testing
 * @private
 */
export function topoSortRoots(roots: readonly RootType[]): RootType[] {
  const ret: RootType[] = [];
  const checked: RootType[] = [];

  function visitor(root: RootType, visited: string[] = []) {
    // if checked, or cyclic, we're done with the node
    if (checked.includes(root) || visited.includes(root.name)) {
      return;
    }

    const neighbors = getNamedTypes(root.type);

    for (const neighbor of neighbors) {
      const rootToCheck = roots.find((e) => e.name === neighbor);
      if (!rootToCheck) {
        continue;
      }
      visitor(rootToCheck, [...visited, root.name]);
    }
    checked.push(root);
    ret.unshift(root);
  }

  roots.forEach((e) => visitor(e));
  return ret.reverse();
}
