import { format } from 'prettier';
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
} from './types';

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

interface GenerateOptions {
  format?: boolean;
}

export function generateRuntypes(
  rootConfig: RootType | RootType[],
  opts: GenerateOptions = { format: true },
): string {
  const writer = makeWriter();
  const roots = Array.isArray(rootConfig) ? rootConfig : [rootConfig];

  writer.write('import * as rt from "runtypes"\n\n');
  roots.forEach((root) => writeRootType(writer, root));

  const source = writer.getSource();
  return opts.format ? format(source, { parser: 'typescript' }) : source.trim();
}

function writeRootType(writer: CodeWriter, node: RootType) {
  writer.conditionalWrite(Boolean(node.export), 'export ');
  writer.write(`const ${node.name}=`);
  writeAnyType(writer, node.type);
  writer.write(';\n\n');
}

// fixme: use mapped type so `node` is typed more narrowly maybe
const writers: Record<
  AnyType['kind'],
  (writer: CodeWriter, node: AnyType) => void
> = {
  boolean: simpleWriter('rt.Boolean'),
  function: simpleWriter('rt.Function'),
  never: simpleWriter('rt.Never'),
  number: simpleWriter('rt.Number'),
  string: simpleWriter('rt.String'),
  symbol: simpleWriter('rt.Symbol'),
  unknown: simpleWriter('rt.Unknown'),
  array: writeArrayType,
  record: writeRecordType,
  union: writeUnionType,
  literal: writeLiteralType,
  named: writeNamedType,
  intersect: writeIntersectionType,
  dictionary: writeDictionaryType,
};

function simpleWriter(value: string): (writer: CodeWriter) => void {
  return (writer) => writer.write(value);
}

function writeDictionaryType(w: CodeWriter, node: DictionaryType) {
  w.write('rt.Dictionary(');
  writeAnyType(w, node.valueType);
  w.write(')');
}

function writeNamedType(w: CodeWriter, node: NamedType) {
  w.write(node.name);
}

function writeAnyType(w: CodeWriter, node: AnyType) {
  const writer = writers[node.kind];
  writer(w, node);
}

function writeLiteralType(w: CodeWriter, node: LiteralType) {
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

function writeArrayType(w: CodeWriter, node: ArrayType) {
  w.write('rt.Array(');
  writeAnyType(w, node.type);
  w.write(')');
  w.conditionalWrite(node.readonly, '.asReadonly()');
}

function writeUnionType(w: CodeWriter, node: UnionType) {
  w.write('rt.Union(');
  for (const type of node.types) {
    writeAnyType(w, type);
    w.write(',');
  }
  w.write(')');
}

function writeIntersectionType(w: CodeWriter, node: UnionType) {
  w.write('rt.Intersect(');
  for (const type of node.types) {
    writeAnyType(w, type);
    w.write(',');
  }
  w.write(')');
}

/**
 * public for testing
 *
 * Used to evaluate if `Record` type include `readonly` and/or `nullable`
 * @private
 * @param fields
 */
export function groupFieldKinds(
  fields: readonly RecordField[],
): {
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

function writeRecordType(w: CodeWriter, node: RecordType) {
  const fieldKinds = groupFieldKinds(node.fields);
  const hasMultiple = fieldKinds.length > 1;
  w.conditionalWrite(hasMultiple, 'rt.intersect(');
  for (const fieldKind of fieldKinds) {
    w.write('rt.Record({');
    for (const field of fieldKind.fields) {
      w.write(field.name);
      w.write(':');
      writeAnyType(w, field.type);
      w.write(',');
    }
    w.write('})');
    w.conditionalWrite(fieldKind.nullable ?? false, '.asPartial()');
    w.conditionalWrite(fieldKind.readonly ?? false, '.asReadonly()');
    w.conditionalWrite(hasMultiple, ',');
  }
  w.conditionalWrite(hasMultiple, '\n)');
}
