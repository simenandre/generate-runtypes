import { format, resolveConfig } from 'prettier';
import { Project, SourceFile } from 'ts-morph';
import { createRuntypes } from '../main_alt';

async function fmt(source: string) {
  const config = await resolveConfig(__filename);
  return format(source, config);
}

describe('runtype generation', () => {
  let project: Project;
  let file: SourceFile;

  beforeEach(() => {
    project = new Project();
    file = project.createSourceFile('./test.ts');
  });

  it('smoke test', async () => {
    createRuntypes(file, {
      export: true,
      name: 'smokeTest',
      type: {
        kind: 'record',
        fields: [
          { name: 'someBoolean', type: { kind: 'boolean' } },
          { name: 'someNever', type: { kind: 'never' } },
          { name: 'someNumber', type: { kind: 'number' } },
          { name: 'someString', type: { kind: 'string' } },
          { name: 'someUnknown', type: { kind: 'unknown' } },
          { name: 'someVoid', type: { kind: 'void' } },
          { name: 'someLiteral', type: { kind: 'literal', value: 'boop' } },
          {
            name: 'someArray',
            type: { kind: 'array', type: { kind: 'string' }, readonly: true },
          },
          {
            name: 'someObject',
            type: {
              kind: 'record',
              fields: [
                { name: 'name', readonly: true, type: { kind: 'string' } },
                { name: 'age', readonly: true, type: { kind: 'number' } },
                {
                  name: 'medals',
                  readonly: true,
                  type: {
                    kind: 'union',
                    types: [
                      { kind: 'literal', value: '1' },
                      { kind: 'literal', value: '2' },
                      { kind: 'literal', value: '3' },
                      { kind: 'literal', value: 'last' },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    });
    const raw = file.getText();
    const formatted = await fmt(raw);
    expect(formatted).toMatchInlineSnapshot(`
      "export const smokeTest = rt.Record({
        someBoolean: rt.Boolean,
        someNever: rt.Never,
        someNumber: rt.Number,
        someString: rt.String,
        someUnknown: rt.Unknown,
        someVoid: rt.Void,
        someLiteral: rt.Literal('boop'),
        someArray: rt.Array(rt.String).asReadonly(),
        someObject: rt.Record({
          name: rt.String,
          age: rt.Number,
          medals: rt.Union(
            rt.Literal('1'),
            rt.Literal('2'),
            rt.Literal('3'),
            rt.Literal('last'),
          ),
        }),
      });
      "
    `);
  });

  it.todo('Array');
  it.todo('Boolean');
  it.todo('Brand');
  it.todo('Constrant');
  it.todo('Dictionary');
  it.todo('Function');
  it.todo('Literal');
  it.todo('Never');
  it.todo('Number');
  it.todo('Record');
  it.todo('String');
  it.todo('Symbol');
  it.todo('Tuple');
  it.todo('Union');
  it.todo('Unknown');
  it.todo('Void');
});
