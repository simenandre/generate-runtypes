import { Options as PrettierOptions, format } from 'prettier';
import {
  AnyType,
  ArrayType,
  DictionaryType,
  LiteralType,
  NamedType,
  RecordField,
  RecordType,
  RootType,
  UnionType,
  rootTypeRt,
} from './types';

export type {
  PrettierOptions,
  AnyType,
  ArrayType,
  DictionaryType,
  LiteralType,
  NamedType,
  RecordField,
  RecordType,
  RootType,
  UnionType,
};

export { rootTypeRt };

interface CodeWriter {
  getSource(): string;
  write(data: string): void;
  conditionalWrite(cond: boolean, data: string): void;
}

function makeWriter(): CodeWriter {
  const chunks: string[] = [];
  return {
    getSource() {
      return chunks.join('');
    },
    write(data) {
      chunks.push(data);
    },
    conditionalWrite(cond, data) {
      if (cond) {
        chunks.push(data);
      }
    },
  };
}

type NameFunction = (originalName: string) => string;

export interface GenerateOptions {
  /** Apply formatting to the output using prettier. Default: true */
  format?: boolean;

  /** Options to use for prettier formatting. Default: undefined */
  formatOptions?: PrettierOptions;

  /**
   * Include code that imports the runtypes library in the generated code.
   * When turned on, `import * as rt from "runtypes";` will be added at the
   * top of the generated code.
   * Default: true
   */
  includeImport?: boolean;

  /**
   * Generate type definitions in addition to runtype definitions.
   * Default: true
   *
   * @example
   *
   * When enabled:
   * ```
   * const myRuntype = rt.Record({ name: rt.String });
   * ```
   *
   *    * When disabled:
   * ```
   * const myRuntype = rt.Record({ name: rt.String });
   * type MyRuntype = rt.Static<typeof myRuntype>;
   * ```
   */
  includeTypes?: boolean;

  /**
   * Function used to format the names of generated runtypes.
   * The function is passed in a name and must return a string that will be
   * used in place of that name.
   */
  formatRuntypeName?: NameFunction;

  /**
   * Function used to format the names of generated type.
   * The function is passed in a name and must return a string that will be
   * used in place of that name.
   */
  formatTypeName?: NameFunction;
}

const defaultOptions: GenerateOptions = {
  format: true,
  includeImport: true,
  includeTypes: true,
  formatRuntypeName: (e) => e[0].toLowerCase() + e.slice(1),
  formatTypeName: (e) => e[0].toUpperCase() + e.slice(1),
};

/**
 * @param rootConfig one or more `RootType` objects.
 * @param opts options to control the generator.
 * @returns
 */
export function generateRuntypes(
  rootConfig: RootType | RootType[],
  opts?: GenerateOptions,
): string {
  const allOptions = { ...defaultOptions, ...opts };
  const writer = makeWriter();
  const roots = Array.isArray(rootConfig) ? rootConfig : [rootConfig];

  writer.conditionalWrite(
    allOptions.includeImport,
    'import * as rt from "runtypes";\n\n',
  );
  roots.forEach((root) => writeRootType(allOptions, writer, root));

  const source = writer.getSource();
  return allOptions.format
    ? format(source, { parser: 'typescript', ...allOptions.formatOptions })
    : source.trim();
}

function writeRootType(
  options: GenerateOptions,
  w: CodeWriter,
  node: RootType,
) {
  const { formatRuntypeName, formatTypeName, includeTypes } = options;
  const runtypeName = formatRuntypeName(node.name);
  const typeName = formatTypeName(node.name);
  if (node.comment) {
    writeComment(w, node.comment);
  }
  w.conditionalWrite(Boolean(node.export), 'export ');
  w.write(`const ${runtypeName}=`);
  writeAnyType(options, w, node.type);
  w.write(';\n\n');

  w.conditionalWrite(Boolean(node.export) && includeTypes, 'export ');
  w.conditionalWrite(
    includeTypes,
    `type ${typeName}=rt.Static<typeof ${runtypeName}>;`,
  );
  w.write('\n\n');
}

// fixme: use mapped type so `node` is typed more narrowly maybe
const writers: Record<
  AnyType['kind'],
  (options: GenerateOptions, w: CodeWriter, node: AnyType) => void
> = {
  boolean: simpleWriter('rt.Boolean'),
  function: simpleWriter('rt.Function'),
  never: simpleWriter('rt.Never'),
  number: simpleWriter('rt.Number'),
  null: simpleWriter('rt.Null'),
  string: simpleWriter('rt.String'),
  symbol: simpleWriter('rt.Symbol'),
  undefined: simpleWriter('rt.Undefined'),
  unknown: simpleWriter('rt.Unknown'),
  array: writeArrayType,
  record: writeRecordType,
  union: writeUnionType,
  literal: writeLiteralType,
  named: writeNamedType,
  intersect: writeIntersectionType,
  dictionary: writeDictionaryType,
};

function simpleWriter(
  value: string,
): (options: GenerateOptions, w: CodeWriter) => void {
  return (options: GenerateOptions, writer) => writer.write(value);
}

function writeDictionaryType(
  options: GenerateOptions,
  w: CodeWriter,
  node: DictionaryType,
) {
  w.write('rt.Dictionary(');
  writeAnyType(options, w, node.valueType);
  w.write(')');
}

function writeNamedType(
  options: GenerateOptions,
  w: CodeWriter,
  node: NamedType,
) {
  w.write(options.formatRuntypeName(node.name));
}

function writeAnyType(options: GenerateOptions, w: CodeWriter, node: AnyType) {
  const writer = writers[node.kind];
  writer(options, w, node);
}

function writeLiteralType(
  options: GenerateOptions,
  w: CodeWriter,
  node: LiteralType,
) {
  const { value } = node;
  w.write('rt.Literal(');
  if (value === undefined) {
    w.write('undefined');
  } else if (value === null) {
    w.write('null');
  } else if (typeof value === 'string') {
    w.write(`'${value}'`);
  } else {
    // It's a boolean or a number at this point.
    w.write(String(value));
  }
  w.write(')');
}

function writeArrayType(
  options: GenerateOptions,
  w: CodeWriter,
  node: ArrayType,
) {
  w.write('rt.Array(');
  writeAnyType(options, w, node.type);
  w.write(')');
  w.conditionalWrite(node.readonly, '.asReadonly()');
}

function writeUnionType(
  options: GenerateOptions,
  w: CodeWriter,
  node: UnionType,
) {
  w.write('rt.Union(');
  for (const type of node.types) {
    writeAnyType(options, w, type);
    w.write(',');
  }
  w.write(')');
}

function writeIntersectionType(
  options: GenerateOptions,
  w: CodeWriter,
  node: UnionType,
) {
  w.write('rt.Intersect(');
  for (const type of node.types) {
    writeAnyType(options, w, type);
    w.write(',');
  }
  w.write(')');
}

function writeComment(w: CodeWriter, comment: string | string[]) {
  const lines = (Array.isArray(comment) ? comment : [comment])
    .map((e) => e.trim())
    .map((e) => e.split('\n'))
    .reduce((prev, cur) => [...prev, ...cur], []);

  if (lines.length === 0) {
    return;
  } else if (lines.length === 1) {
    w.write(`// ${lines[0]}\n`);
  } else {
    w.write(`/**\n`);
    for (const line of lines) {
      w.write(`* ${line}\n`);
    }
    w.write(`*/\n`);
  }
}

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

function writeRecordType(
  options: GenerateOptions,
  w: CodeWriter,
  node: RecordType,
) {
  if (node.fields.length === 0) {
    w.write('rt.Record({})');
    return;
  }

  const fieldKinds = groupFieldKinds(node.fields);
  const hasMultiple = fieldKinds.length > 1;
  w.conditionalWrite(hasMultiple, 'rt.Intersect(');
  for (const fieldKind of fieldKinds) {
    w.write('rt.Record({');
    for (const field of fieldKind.fields) {
      if (field.comment) {
        writeComment(w, field.comment);
      }
      w.write(field.name);
      w.write(':');
      writeAnyType(options, w, field.type);
      w.write(',');
    }
    w.write('})');
    w.conditionalWrite(fieldKind.nullable, '.asPartial()');
    w.conditionalWrite(fieldKind.readonly, '.asReadonly()');
    w.conditionalWrite(hasMultiple, ',');
  }
  w.conditionalWrite(hasMultiple, '\n)');
}
