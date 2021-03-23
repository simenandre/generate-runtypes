import { format, resolveConfig } from 'prettier';
import { Project, SourceFile } from 'ts-morph';
import { generateRuntypes } from '../main_alt';

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
    generateRuntypes(
      file,

      {
        name: 'personRt',
        export: false,
        type: {
          kind: 'record',
          fields: [
            { name: 'name', readonly: true, type: { kind: 'string' } },
            { name: 'age', readonly: true, type: { kind: 'number' } },
          ],
        },
      },

      {
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
            {
              name: 'someLiteral1',
              type: { kind: 'literal', value: 'string' },
            },
            { name: 'someLiteral2', type: { kind: 'literal', value: 1337 } },
            { name: 'someLiteral3', type: { kind: 'literal', value: true } },
            { name: 'someLiteral4', type: { kind: 'literal', value: null } },
            {
              name: 'someLiteral5',
              type: { kind: 'literal', value: undefined },
            },
            {
              name: 'someDictionary',
              type: { kind: 'dictionary', valueType: { kind: 'boolean' } },
            },
            {
              name: 'someArray',
              type: { kind: 'array', type: { kind: 'string' }, readonly: true },
            },
            {
              name: 'someNamedType',
              type: { kind: 'named', name: 'personRt' },
            },
            {
              name: 'someIntersection',
              type: {
                kind: 'intersect',
                types: [
                  {
                    kind: 'record',
                    fields: [{ name: 'member1', type: { kind: 'string' } }],
                  },
                  {
                    kind: 'record',
                    fields: [{ name: 'member2', type: { kind: 'number' } }],
                  },
                ],
              },
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
      },
    );
    const raw = file.getText();
    const formatted = await fmt(raw);
    expect(formatted).toMatchInlineSnapshot(`
      "const personRt = rt.Record({
        name: rt.String,
        age: rt.Number,
      });
      export const smokeTest = rt.Record({
        someBoolean: rt.Boolean,
        someNever: rt.Never,
        someNumber: rt.Number,
        someString: rt.String,
        someUnknown: rt.Unknown,
        someVoid: rt.Void,
        someLiteral1: rt.Literal('string'),
        someLiteral2: rt.Literal(1337),
        someLiteral3: rt.Literal(true),
        someLiteral4: rt.Literal(null),
        someLiteral5: rt.Literal(undefined),
        someDictionary: rt.Dictionary(rt.Boolean),
        someArray: rt.Array(rt.String).asReadonly(),
        someNamedType: personRt,
        someIntersection: rt.Intersect(
          rt.Record({
            member1: rt.String,
          }),
          rt.Record({
            member2: rt.Number,
          }),
        ),
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
