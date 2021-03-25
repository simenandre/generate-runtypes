import { format, resolveConfig } from 'prettier';
import { generateRuntypes, groupFieldKinds } from '../main';

async function fmt(source: string) {
  const config = await resolveConfig(__filename);
  return format(source, config);
}

describe('runtype generation', () => {
  it('smoke test', async () => {
    const raw = generateRuntypes([
      {
        name: 'personRt',
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
            { name: 'someSymbol', type: { kind: 'symbol' } },
            { name: 'someUnknown', type: { kind: 'unknown' } },
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
                  { name: 'name', type: { kind: 'string' } },
                  { name: 'age', type: { kind: 'number' } },
                  {
                    name: 'medals',
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
    ]);
    const formatted = await fmt(raw);
    expect(formatted).toMatchInlineSnapshot(`
      "const personRt = rt.Record({ name: rt.String, age: rt.Number }).asReadonly();

      export const smokeTest = rt.Record({
        someBoolean: rt.Boolean,
        someNever: rt.Never,
        someNumber: rt.Number,
        someString: rt.String,
        someSymbol: rt.Symbol,
        someUnknown: rt.Unknown,
        someLiteral1: rt.Literal('string'),
        someLiteral2: rt.Literal(1337),
        someLiteral3: rt.Literal(true),
        someLiteral4: rt.Literal(null),
        someLiteral5: rt.Literal(undefined),
        someDictionary: rt.Dictionary(rt.Boolean),
        someArray: rt.Array(rt.String).asReadonly(),
        someNamedType: personRt,
        someIntersection: rt.Intersect(
          rt.Record({ member1: rt.String }),
          rt.Record({ member2: rt.Number }),
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

  describe('objects', () => {
    it('groupFieldKinds', () => {
      const res = groupFieldKinds([
        { name: 'field_1', type: { kind: 'string' } },
        { name: 'field_2', type: { kind: 'string' }, nullable: true },
        { name: 'field_3', type: { kind: 'string' }, readonly: true },
        {
          name: 'field_4',
          type: { kind: 'string' },
          nullable: true,
          readonly: true,
        },
      ]);

      const [default_, nullable, readonly, both] = res;
      expect(default_.fields.map((e) => e.name)).toEqual(['field_1']);
      expect(nullable.fields.map((e) => e.name)).toEqual(['field_2']);
      expect(readonly.fields.map((e) => e.name)).toEqual(['field_3']);
      expect(both.fields.map((e) => e.name)).toEqual(['field_4']);
    });

    it('default modifiers', async () => {
      const raw = generateRuntypes({
        name: 'test',
        type: {
          kind: 'record',
          fields: [{ name: 'name', type: { kind: 'string' } }],
        },
      });
      const formatted = await fmt(raw);
      expect(formatted).toMatchInlineSnapshot(`
        "const test = rt.Record({ name: rt.String });
        "
      `);
    });

    it('readonly modifiers', async () => {
      const raw = generateRuntypes({
        name: 'test',
        type: {
          kind: 'record',
          fields: [{ name: 'name', readonly: true, type: { kind: 'string' } }],
        },
      });
      const formatted = await fmt(raw);
      expect(formatted).toMatchInlineSnapshot(`
        "const test = rt.Record({ name: rt.String }).asReadonly();
        "
      `);
    });

    it('nullable modifiers', async () => {
      const raw = generateRuntypes({
        name: 'test',
        type: {
          kind: 'record',
          fields: [{ name: 'name', nullable: true, type: { kind: 'string' } }],
        },
      });
      const formatted = await fmt(raw);
      expect(formatted).toMatchInlineSnapshot(`
        "const test = rt.Record({ name: rt.String }).asPartial();
        "
      `);
    });

    it('both modifiers', async () => {
      const raw = generateRuntypes({
        name: 'test',
        type: {
          kind: 'record',
          fields: [
            {
              name: 'name',
              nullable: true,
              readonly: true,
              type: { kind: 'string' },
            },
          ],
        },
      });
      const formatted = await fmt(raw);
      expect(formatted).toMatchInlineSnapshot(`
        "const test = rt.Record({ name: rt.String }).asPartial().asReadonly();
        "
      `);
    });

    it('all groups', async () => {
      const raw = generateRuntypes({
        name: 'test',
        type: {
          kind: 'record',
          fields: [
            {
              name: 'field_1',
              type: { kind: 'string' },
            },
            {
              name: 'field_2',
              nullable: true,
              type: { kind: 'string' },
            },
            {
              name: 'field_3',
              readonly: true,
              type: { kind: 'string' },
            },
            {
              name: 'field_4',
              nullable: true,
              readonly: true,
              type: { kind: 'string' },
            },
          ],
        },
      });
      const formatted = await fmt(raw);
      expect(formatted).toMatchInlineSnapshot(`
        "const test = rt.intersect(
          rt.Record({ field_1: rt.String }),
          rt.Record({ field_2: rt.String }).asPartial(),
          rt.Record({ field_3: rt.String }).asReadonly(),
          rt.Record({ field_4: rt.String }).asPartial().asReadonly(),
        );
        "
      `);
    });
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
});
