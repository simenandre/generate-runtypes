import { generateRuntypes } from '../main';
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
            {
              name: 'location',
              readonly: true,
              type: { kind: 'named', name: 'locationRt' },
            },
          ],
        },
      },

      {
        name: 'locationRt',
        type: {
          kind: 'record',
          fields: [
            { name: 'address', readonly: true, type: { kind: 'string' } },
            {
              name: 'alternateLocation',
              readonly: true,
              nullable: true,
              type: { kind: 'named', name: 'locationRt' },
            },
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
            { name: 'someNull', type: { kind: 'null' } },
            { name: 'someUndefined', type: { kind: 'undefined' } },
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

      type LocationRt = {
        readonly address: string;
        readonly alternateLocation?: LocationRt;
      };

      const locationRt: rt.Runtype<LocationRt> = rt.Lazy(() =>
        rt.Intersect(
          rt.Record({ address: rt.String }).asReadonly(),
          rt.Record({ alternateLocation: locationRt }).asPartial().asReadonly()
        )
      );

      const personRt = rt
        .Record({ name: rt.String, age: rt.Number, location: locationRt })
        .asReadonly();

      type PersonRt = rt.Static<typeof personRt>;

      export const smokeTest = rt.Record({
        someBoolean: rt.Boolean,
        someNever: rt.Never,
        someNumber: rt.Number,
        someString: rt.String,
        someSymbol: rt.Symbol,
        someUnknown: rt.Unknown,
        someNull: rt.Null,
        someUndefined: rt.Undefined,
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

    it('handles field names that must be quoted', async () => {
      const raw = generateRuntypes({
        name: 'test',
        type: {
          kind: 'record',
          fields: [{ name: 'name with space', type: { kind: 'string' } }],
        },
      });
      expect(raw).toMatchInlineSnapshot(`
"import * as rt from \\"runtypes\\";

const test = rt.Record({ \\"name with space\\": rt.String });

type Test = rt.Static<typeof test>;
"
`);
    });

    it('handles field names with quotes in', async () => {
      const raw = generateRuntypes({
        name: 'test',
        type: {
          kind: 'record',
          fields: [{ name: 'name with "quote"', type: { kind: 'string' } }],
        },
      });
      expect(raw).toMatchInlineSnapshot(`
"import * as rt from \\"runtypes\\";

const test = rt.Record({ 'name with \\"quote\\"': rt.String });

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

const person=rt.Record({\\"id\\":rt.String,\\"name\\":rt.String,\\"age\\":rt.String,}).asReadonly();

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

  describe('with `array` kind', () => {
    it('generates the runtype', () => {
      const source = generateRuntypes(
        {
          name: 'Foo',
          type: {
            kind: 'array',
            type: {
              kind: 'string',
            },
          },
        },
        { includeTypes: false },
      );

      expect(source).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const foo = rt.Array(rt.String);
        "
      `);
    });

    it('appends .asReadonly() if node.readonly is true', () => {
      const source = generateRuntypes({
        name: 'Bar',
        type: {
          kind: 'array',
          type: {
            kind: 'number',
          },
          readonly: true,
        },
      });

      expect(source).toMatch('.asReadonly()');
    });
  });

  it.each([
    ['boolean', 'Boolean'],
    ['function', 'Function'],
    ['never', 'Never'],
    ['null', 'Null'],
    ['number', 'Number'],
    ['string', 'String'],
    ['symbol', 'Symbol'],
    ['undefined', 'Undefined'],
    ['unknown', 'Unknown'],
  ] as const)('generates runtype with `%s` kind', (kind, runtype) => {
    const source = generateRuntypes(
      {
        name: 'Foo',
        type: {
          kind,
        },
      },
      { includeTypes: false },
    );

    expect(source).toMatch(`const foo = rt.${runtype};`);
  });

  it('generates runtype with `dictionary` kind', () => {
    const source = generateRuntypes(
      {
        name: 'Foo',
        type: {
          kind: 'dictionary',
          valueType: {
            kind: 'number',
          },
        },
      },
      { includeTypes: false },
    );

    expect(source).toMatchInlineSnapshot(`
      "import * as rt from \\"runtypes\\";

      const foo = rt.Dictionary(rt.Number);
      "
    `);
  });

  describe('with `literal` kind', () => {
    it.each([
      ['bar', '"bar"'],
      [undefined, 'undefined'],
      [null, 'null'],
      [true, 'true'],
      [false, 'false'],
      [5, '5'],
    ] as const)(
      'generates runtype for `%s` value',
      (value, expectedLiteralValue) => {
        const source = generateRuntypes(
          {
            name: 'Foo',
            type: {
              kind: 'literal',
              value,
            },
          },
          { includeTypes: false },
        );

        expect(source).toMatch(
          `const foo = rt.Literal(${expectedLiteralValue});`,
        );
      },
    );
  });

  describe('with `record` kind', () => {
    it('generates empty record runtype when node.fields is empty', () => {
      const source = generateRuntypes(
        { name: 'Foo', type: { kind: 'record', fields: [] } },
        { includeTypes: false },
      );

      expect(source).toMatch(`const foo = rt.Record({});`);
    });

    it('generates record with fields when fields are passed', () => {
      const source = generateRuntypes(
        {
          name: 'Foo',
          type: {
            kind: 'record',
            fields: [
              { name: 'oof', type: { kind: 'string' } },
              { name: 'bar', type: { kind: 'boolean' } },
              { name: 'baz', type: { kind: 'number' } },
            ],
          },
        },
        { includeTypes: false },
      );

      expect(source).toMatchInlineSnapshot(`
        "import * as rt from \\"runtypes\\";

        const foo = rt.Record({ oof: rt.String, bar: rt.Boolean, baz: rt.Number });
        "
      `);
    });

    it('handles names that are not valid JS indetifiers', () => {
      const source = generateRuntypes([
        {
          name: '007',
          type: { kind: 'string' },
        },

        {
          name: 'agent',
          type: { kind: 'named', name: '007' },
        },
      ]);

      expect(source).toMatchInlineSnapshot(`
"import * as rt from \\"runtypes\\";

const _007 = rt.String;

type _007 = rt.Static<typeof _007>;

const agent = _007;

type Agent = rt.Static<typeof agent>;
"
`);
    });
  });

  it('generates runtype with `union` kind', () => {
    const source = generateRuntypes(
      {
        name: 'Foo',
        type: {
          kind: 'union',
          types: [{ kind: 'string' }, { kind: 'number' }, { kind: 'boolean' }],
        },
      },
      { includeTypes: false },
    );

    expect(source).toMatchInlineSnapshot(`
      "import * as rt from \\"runtypes\\";

      const foo = rt.Union(rt.String, rt.Number, rt.Boolean);
      "
    `);
  });

  it('comments', () => {
    const source = generateRuntypes(
      [
        {
          name: 'Event',
          comment: 'An event object',
          type: {
            kind: 'record',
            fields: [
              {
                name: 'name',
                type: { kind: 'string' },
                comment: 'Single line comment',
              },
              {
                name: 'age',
                type: { kind: 'string' },
                comment: 'Single line comment.\nWith newlines',
              },
              {
                name: 'id',
                type: { kind: 'string' },
                comment: ['Multi line comment', 'As array'],
              },
              {
                name: 'noComment1',
                type: { kind: 'string' },
                comment: [],
              },
              {
                name: 'noComment2',
                type: { kind: 'string' },
                comment: '',
              },
            ],
          },
        },
        {
          name: 'Person',
          comment: 'A cyclic person',
          type: {
            kind: 'record',
            fields: [
              { name: 'name', type: { kind: 'string' } },
              {
                name: 'parent',
                nullable: true,
                type: { kind: 'named', name: 'Person' },
              },
            ],
          },
        },
      ],
      { includeTypes: false },
    );

    expect(source).toMatchInlineSnapshot(`
      "import * as rt from \\"runtypes\\";

      // An event object
      const event = rt.Record({
        // Single line comment
        name: rt.String
        /**
         * Single line comment.
         * With newlines
         */,
        age: rt.String
        /**
         * Multi line comment
         * As array
         */,
        id: rt.String,
        noComment1: rt.String,
        noComment2: rt.String,
      });

      // A cyclic person
      type Person = {
        name: string;
        parent?: Person;
      };

      const person: rt.Runtype<Person> = rt.Lazy(() =>
        rt.Intersect(
          rt.Record({ name: rt.String }),
          rt.Record({ parent: person }).asPartial()
        )
      );
      "
    `);
  });

  describe('cyclical dependencies', () => {
    it('emits code for cyclical dependencies when allowed', () => {
      const source = generateRuntypes(
        {
          name: 'person',
          type: {
            kind: 'record',
            fields: [
              { name: 'name', type: { kind: 'string' } },
              { name: 'parent', type: { kind: 'named', name: 'person' } },
            ],
          },
        },
        { rejectCyclicDependencies: false, includeImport: false },
      );

      expect(source).toMatchInlineSnapshot(`
        "type Person = {
          name: string;
          parent: Person;
        };

        const person: rt.Runtype<Person> = rt.Lazy(() =>
          rt.Record({ name: rt.String, parent: person })
        );
        "
      `);
    });

    it('throws when not allowed', () => {
      expect(() => {
        generateRuntypes(
          {
            name: 'person',
            type: {
              kind: 'record',
              fields: [
                { name: 'name', type: { kind: 'string' } },
                { name: 'parent', type: { kind: 'named', name: 'person' } },
              ],
            },
          },
          { rejectCyclicDependencies: true },
        );
      }).toThrow();
    });
  });

  describe('lazy runtypes', () => {
    it('smoke test', () => {
      const source = generateRuntypes(
        [
          {
            name: 'person',
            type: {
              kind: 'record',
              fields: [
                { name: 'name', type: { kind: 'string' } },
                { name: 'parent', type: { kind: 'named', name: 'person' } },
                { name: 'job', type: { kind: 'named', name: 'job' } },
              ],
            },
          },
          {
            name: 'job',
            type: {
              kind: 'record',
              fields: [
                { name: 'title', type: { kind: 'string' } },
                {
                  name: 'people',
                  type: {
                    kind: 'array',
                    type: { kind: 'named', name: 'person' },
                  },
                },
              ],
            },
          },
        ],
        {
          formatRuntypeName: (e) => `${e}_runtype`,
          formatTypeName: (e) => `${e}_Type`,
          includeImport: false,
        },
      );

      expect(source).toMatchInlineSnapshot(`
        "type job_Type = {
          title: string;
          people: person_Type[];
        };

        const job_runtype: rt.Runtype<job_Type> = rt.Lazy(() =>
          rt.Record({ title: rt.String, people: rt.Array(person_runtype) })
        );

        type person_Type = {
          name: string;
          parent: person_Type;
          job: job_Type;
        };

        const person_runtype: rt.Runtype<person_Type> = rt.Lazy(() =>
          rt.Record({ name: rt.String, parent: person_runtype, job: job_runtype })
        );
        "
      `);
    });

    it("doesn't export type when root is non-public", () => {
      const source = generateRuntypes(
        {
          name: 'person',
          export: false,
          type: {
            kind: 'record',
            fields: [
              { name: 'name', type: { kind: 'string' } },
              { name: 'parent', type: { kind: 'named', name: 'person' } },
            ],
          },
        },
        {
          formatRuntypeName: (e) => `${e}_runtype`,
          formatTypeName: (e) => `${e}_Type`,
          includeImport: false,
        },
      );

      expect(source).toMatchInlineSnapshot(`
        "type person_Type = {
          name: string;
          parent: person_Type;
        };

        const person_runtype: rt.Runtype<person_Type> = rt.Lazy(() =>
          rt.Record({ name: rt.String, parent: person_runtype })
        );
        "
      `);
    });

    it('exports type when root is public', () => {
      const source = generateRuntypes(
        {
          name: 'person',
          export: true,
          type: {
            kind: 'record',
            fields: [
              { name: 'name', type: { kind: 'string' } },
              { name: 'parent', type: { kind: 'named', name: 'person' } },
            ],
          },
        },
        {
          formatRuntypeName: (e) => `${e}_runtype`,
          formatTypeName: (e) => `${e}_Type`,
          includeImport: false,
        },
      );

      expect(source).toMatchInlineSnapshot(`
        "export type person_Type = {
          name: string;
          parent: person_Type;
        };

        const person_runtype: rt.Runtype<person_Type> = rt.Lazy(() =>
          rt.Record({ name: rt.String, parent: person_runtype })
        );
        "
      `);
    });

    it('mixing lazy and non-lazy', () => {
      const source = generateRuntypes(
        [
          {
            name: 'job',
            type: {
              kind: 'record',
              fields: [
                { name: 'title', type: { kind: 'string' } },
                {
                  name: 'people',
                  type: {
                    kind: 'array',
                    type: { kind: 'named', name: 'person' },
                  },
                },
              ],
            },
          },

          {
            name: 'person',
            type: {
              kind: 'record',
              fields: [
                { name: 'name', type: { kind: 'string' } },
                { name: 'parent', type: { kind: 'named', name: 'person' } },
              ],
            },
          },
        ],
        {
          formatRuntypeName: (e) => `${e}_runtype`,
          formatTypeName: (e) => `${e}_Type`,
          includeImport: false,
        },
      );

      expect(source).toMatchInlineSnapshot(`
        "type person_Type = {
          name: string;
          parent: person_Type;
        };

        const person_runtype: rt.Runtype<person_Type> = rt.Lazy(() =>
          rt.Record({ name: rt.String, parent: person_runtype })
        );

        const job_runtype = rt.Record({
          title: rt.String,
          people: rt.Array(person_runtype),
        });

        type job_Type = rt.Static<typeof job_runtype>;
        "
      `);
    });
  });
});
