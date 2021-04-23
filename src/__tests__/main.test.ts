import { generateRuntypes, groupFieldKinds } from '../main';
import { RootType } from '../types';

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
            {
              name: 'emptyObject',
              type: {
                kind: 'record',
                fields: [],
              },
            },
          ],
        },
      },
    ]);
    expect(raw).toMatchInlineSnapshot(`
      "import * as rt from \\"runtypes\\";

      const personRt = rt.Record({ name: rt.String, age: rt.Number }).asReadonly();

      type PersonRt = rt.Static<typeof personRt>;

      export const smokeTest = rt.Record({
        someBoolean: rt.Boolean,
        someNever: rt.Never,
        someNumber: rt.Number,
        someString: rt.String,
        someSymbol: rt.Symbol,
        someUnknown: rt.Unknown,
        someLiteral1: rt.Literal(\\"string\\"),
        someLiteral2: rt.Literal(1337),
        someLiteral3: rt.Literal(true),
        someLiteral4: rt.Literal(null),
        someLiteral5: rt.Literal(undefined),
        someDictionary: rt.Dictionary(rt.Boolean),
        someArray: rt.Array(rt.String).asReadonly(),
        someNamedType: personRt,
        someIntersection: rt.Intersect(
          rt.Record({ member1: rt.String }),
          rt.Record({ member2: rt.Number })
        ),
        someObject: rt.Record({
          name: rt.String,
          age: rt.Number,
          medals: rt.Union(
            rt.Literal(\\"1\\"),
            rt.Literal(\\"2\\"),
            rt.Literal(\\"3\\"),
            rt.Literal(\\"last\\")
          ),
        }),
        emptyObject: rt.Record({}),
      });

      export type SmokeTest = rt.Static<typeof smokeTest>;
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
      expect(raw).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const test = rt.Record({ name: rt.String });

        type Test = rt.Static<typeof test>;
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
      expect(raw).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const test = rt.Record({ name: rt.String }).asReadonly();

        type Test = rt.Static<typeof test>;
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
      expect(raw).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const test = rt.Record({ name: rt.String }).asPartial();

        type Test = rt.Static<typeof test>;
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
      expect(raw).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const test = rt.Record({ name: rt.String }).asPartial().asReadonly();

        type Test = rt.Static<typeof test>;
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
      expect(raw).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const test = rt.Intersect(
          rt.Record({ field_1: rt.String }),
          rt.Record({ field_2: rt.String }).asPartial(),
          rt.Record({ field_3: rt.String }).asReadonly(),
          rt.Record({ field_4: rt.String }).asPartial().asReadonly()
        );

        type Test = rt.Static<typeof test>;
        "
      `);
    });
  });

  it('formatting', () => {
    const root: RootType = {
      name: 'person',
      type: {
        kind: 'record',
        fields: [
          { name: 'id', type: { kind: 'string' }, readonly: true },
          { name: 'name', type: { kind: 'string' }, readonly: true },
          { name: 'age', type: { kind: 'string' }, readonly: true },
        ],
      },
    };
    const sourceFormatted = generateRuntypes(root);
    expect(sourceFormatted).toMatchInlineSnapshot(`
      "import * as rt from \\"runtypes\\";

      const person = rt
        .Record({ id: rt.String, name: rt.String, age: rt.String })
        .asReadonly();

      type Person = rt.Static<typeof person>;
      "
    `);

    const sourceUnformatted = generateRuntypes(root, { format: false });
    expect(sourceUnformatted).toMatchInlineSnapshot(`
      "import * as rt from \\"runtypes\\";

      const person=rt.Record({id:rt.String,name:rt.String,age:rt.String,}).asReadonly();

      type Person=rt.Static<typeof person>;"
    `);
  });

  it('omit imports', () => {
    const source = generateRuntypes(
      { name: 'name', type: { kind: 'string' } },
      { includeImport: false },
    );
    expect(source).not.toMatch(/import/);
  });

  it('format options', () => {
    const source = generateRuntypes(
      { name: 'name', type: { kind: 'string' } },
      { formatOptions: { semi: false } },
    );
    expect(source).not.toMatch(/;/);
  });

  describe('output types', () => {
    it('can omit the types', () => {
      const source = generateRuntypes(
        [
          {
            name: 'thing',
            type: {
              kind: 'record',
              fields: [{ name: 'tag', type: { kind: 'string' } }],
            },
          },
          {
            name: 'things',
            type: { kind: 'array', type: { kind: 'named', name: 'thing' } },
          },
          { name: 'name', type: { kind: 'string' } },
        ],
        { includeTypes: false },
      );

      expect(source).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const thing = rt.Record({ tag: rt.String });

        const things = rt.Array(thing);

        const name = rt.String;
        "
      `);
    });

    it('can pass in name formatter', () => {
      const source = generateRuntypes(
        [
          {
            name: 'thing',
            type: {
              kind: 'record',
              fields: [{ name: 'tag', type: { kind: 'string' } }],
            },
          },
          {
            name: 'things',
            export: true,
            type: { kind: 'array', type: { kind: 'named', name: 'thing' } },
          },
          { name: 'name', type: { kind: 'string' } },
        ],
        {
          formatRuntypeName: (e) => `${e}Runtype`,
          formatTypeName: (e) => `${e}Type`,
        },
      );

      expect(source).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const thingRuntype = rt.Record({ tag: rt.String });

        type thingType = rt.Static<typeof thingRuntype>;

        export const thingsRuntype = rt.Array(thingRuntype);

        export type thingsType = rt.Static<typeof thingsRuntype>;

        const nameRuntype = rt.String;

        type nameType = rt.Static<typeof nameRuntype>;
        "
      `);
    });
  });

  describe('misc', () => {
    it('uses correct names in nested structures', () => {
      const source = generateRuntypes(
        [
          {
            name: 'link',
            type: {
              kind: 'record',
              fields: [
                { name: 'next', type: { kind: 'string' } },
                { name: 'prev', type: { kind: 'string' } },
              ],
            },
          },
          {
            name: 'links',
            export: true,
            type: { kind: 'array', type: { kind: 'named', name: 'link' } },
          },
        ],
        {
          formatRuntypeName: (e) => `${e}Runtype`,
          formatTypeName: (e) => `${e}Type`,
        },
      );

      expect(source).toMatchInlineSnapshot(`
      "import * as rt from \\"runtypes\\";

      const linkRuntype = rt.Record({ next: rt.String, prev: rt.String });

      type linkType = rt.Static<typeof linkRuntype>;

      export const linksRuntype = rt.Array(linkRuntype);

      export type linksType = rt.Static<typeof linksRuntype>;
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
