import { CodeBlockWriter, SourceFile, VariableDeclarationKind } from 'ts-morph';
import { RuntypeField, RuntypeFieldType, RuntypeObject } from './types';

function parseType(type: string) {
  if (RuntypeFieldType.validate(type)) {
    return `rt.${type}`;
  }

  return type;
}

function parseFields(w: CodeBlockWriter, fields: RuntypeField[]) {
  for (let i = 0; i < fields.length; i++) {
    if (i > 0) w.write(',').newLine();
    const field = fields[i];

    w.write(field.name);
    w.write(': ');
    w.write(parseType(field.type));
    if (field.subType) {
      w.write('(');
      w.write(parseType(field.subType));
      w.write(')');
    }
  }
  w.newLine();
}

export function generateRuntype(file: SourceFile, config: RuntypeObject): void {
  RuntypeObject.check(config);

  const requiredFields = config.fields.filter((f) => !f.optional);
  const optionalFields = config.fields.filter((f) => f.optional);

  file.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: config.name,
        initializer: (writer) => {
          let w = writer;
          if (requiredFields.length) {
            w = w
              .write('rt.Record(')
              .block(() => parseFields(w, requiredFields))
              .write(')');
          }
          if (requiredFields.length && optionalFields.length) {
            w = w.write('.And(rt.Partial(');
          } else if (optionalFields.length) {
            w = w.write('rt.Partial(');
          }

          if (optionalFields.length) {
            w.block(() => parseFields(w, optionalFields)).write(')');
          }
        },
      },
    ],
  });
}
