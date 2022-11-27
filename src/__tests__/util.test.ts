import { format } from 'prettier';
import { RootType } from '../main';
import {
  anyTypeToTsType,
  getCyclicDependencies,
  getNamedTypes,
  getUnknownNamedTypes,
  groupFieldKinds,
  makeValidIdentifier,
  rootToType,
  topoSortRoots,
} from '../util';

describe('groupFieldKinds', () => {
  it('smoke test', () => {
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
});

describe('circular dependencies detection', () => {
  it('deals with type referencing itself', () => {
    const roots: RootType[] = [
      {
        name: 'person',
        type: {
          kind: 'record',
          fields: [
            { name: 'id', type: { kind: 'string' } },
            {
              name: 'manager',
              type: { kind: 'named', name: 'person' },
              nullable: true,
            },
          ],
        },
      },
    ];
    expect(getCyclicDependencies(roots)).toEqual([['person', 'person']]);
  });

  it('deals with 2 types mutually referencing each other', () => {
    const roots: RootType[] = [
      {
        name: 'person',
        type: {
          kind: 'record',
          fields: [{ name: 'job', type: { kind: 'named', name: 'jobType' } }],
        },
      },

      {
        name: 'jobType',
        type: {
          kind: 'record',
          fields: [{ name: 'people', type: { kind: 'named', name: 'person' } }],
        },
      },
    ];

    expect(getCyclicDependencies(roots)).toEqual([['jobType', 'person']]);
  });

  it('deals with 3 types mutually referencing each other', () => {
    const roots: RootType[] = [
      {
        name: 'person',
        type: {
          kind: 'record',
          fields: [
            { name: 'job', type: { kind: 'named', name: 'jobType' } },
            { name: 'office', type: { kind: 'named', name: 'place' } },
            { name: 'person', type: { kind: 'named', name: 'person' } },
          ],
        },
      },

      {
        name: 'jobType',
        type: {
          kind: 'record',
          fields: [
            { name: 'job', type: { kind: 'named', name: 'jobType' } },
            { name: 'office', type: { kind: 'named', name: 'place' } },
            { name: 'person', type: { kind: 'named', name: 'person' } },
          ],
        },
      },

      {
        name: 'place',
        type: {
          kind: 'record',
          fields: [
            { name: 'job', type: { kind: 'named', name: 'jobType' } },
            { name: 'office', type: { kind: 'named', name: 'place' } },
            { name: 'person', type: { kind: 'named', name: 'person' } },
          ],
        },
      },
    ];

    expect(getCyclicDependencies(roots)).toEqual([
      ['person', 'person'],
      ['jobType', 'person'],
      ['person', 'place'],
      ['jobType', 'jobType'],
      ['jobType', 'place'],
      ['place', 'place'],
    ]);
  });

  it('deals with 3 types chained', () => {
    const roots: RootType[] = [
      {
        name: 'person',
        type: {
          kind: 'record',
          fields: [{ name: 'job', type: { kind: 'named', name: 'jobType' } }],
        },
      },

      {
        name: 'jobType',
        type: {
          kind: 'record',
          fields: [{ name: 'office', type: { kind: 'named', name: 'place' } }],
        },
      },

      {
        name: 'place',
        type: {
          kind: 'record',
          fields: [{ name: 'person', type: { kind: 'named', name: 'person' } }],
        },
      },
    ];

    expect(getCyclicDependencies(roots)).toEqual([
      ['person', 'place'],
      ['jobType', 'person'],
      ['jobType', 'place'],
    ]);
  });

  it('deals with types not depending on each other', () => {
    const roots: RootType[] = [
      {
        name: 'person',
        type: {
          kind: 'record',
          fields: [{ name: 'job', type: { kind: 'named', name: 'jobType' } }],
        },
      },

      {
        name: 'jobType',
        type: {
          kind: 'record',
          fields: [{ name: 'name', type: { kind: 'string' } }],
        },
      },
    ];

    expect(getCyclicDependencies(roots)).toEqual([]);
  });

  it('deals with type referencing unknown types', () => {
    const roots: RootType[] = [
      {
        name: 'person',
        type: {
          kind: 'record',
          fields: [
            { name: 'id', type: { kind: 'string' } },
            {
              name: 'unknown',
              type: { kind: 'named', name: 'unknownObject ' },
              nullable: true,
            },
          ],
        },
      },
    ];
    expect(getCyclicDependencies(roots)).toEqual([]);
  });
});

describe('getNamedTypes', () => {
  it('smoke test', () => {
    const ret = getNamedTypes({
      kind: 'record',
      fields: [
        { name: 'field1', type: { kind: 'named', name: 'Person' } },
        { name: 'field2', type: { kind: 'named', name: 'Animal' } },
        { name: 'field3', type: { kind: 'named', name: 'Robot' } },
        {
          name: 'field4',
          type: {
            kind: 'record',
            fields: [
              { name: 'nestedField1', type: { kind: 'named', name: 'Car' } },
              { name: 'nestedField2', type: { kind: 'named', name: 'Plane' } },
              { name: 'nestedField3', type: { kind: 'named', name: 'Train' } },
            ],
          },
        },
        {
          name: 'field5',
          type: {
            kind: 'union',
            types: [
              { kind: 'named', name: 'Fire' },
              { kind: 'named', name: 'Water' },
            ],
          },
        },
        {
          name: 'field6',
          type: {
            kind: 'intersect',
            types: [
              { kind: 'named', name: 'Air' },
              { kind: 'named', name: 'Wind' },
            ],
          },
        },
        {
          name: 'field7',
          type: {
            kind: 'array',
            type: { kind: 'named', name: 'Cat' },
          },
        },
      ],
    });
    expect(Array.from(ret).sort()).toEqual([
      'Air',
      'Animal',
      'Car',
      'Cat',
      'Fire',
      'Person',
      'Plane',
      'Robot',
      'Train',
      'Water',
      'Wind',
    ]);
  });
});

describe('rootToType', () => {
  const prettyPrint = (src: string) => format(src, { parser: 'typescript' });
  const formatters = {
    formatRuntypeName: (e: string) => e,
    formatTypeName: (e: string) => e,
  };

  it('smoke 1', () => {
    const root: RootType = { name: 'first', type: { kind: 'string' } };
    expect(prettyPrint(rootToType(root, formatters))).toMatchInlineSnapshot(`
      "type first = string;
      "
    `);
  });

  it('record', () => {
    const root: RootType = {
      name: 'first',
      type: {
        kind: 'record',
        fields: [
          { name: 'field1', nullable: true, type: { kind: 'boolean' } },
          { name: 'field2', nullable: false, type: { kind: 'number' } },
          {
            name: 'field3',
            type: { kind: 'array', type: { kind: 'named', name: 'boop' } },
          },
          {
            name: 'field4',
            type: {
              kind: 'union',
              types: [
                { kind: 'literal', value: 'boop' },
                { kind: 'literal', value: 123 },
                { kind: 'literal', value: false },
                {
                  kind: 'record',
                  fields: [{ name: 'foo', type: { kind: 'string' } }],
                },
                {
                  kind: 'record',
                  fields: [{ name: 'bar', type: { kind: 'number' } }],
                },
              ],
            },
          },
        ],
      },
    };
    expect(prettyPrint(rootToType(root, formatters))).toMatchInlineSnapshot(`
      "type first = {
        field1?: boolean;
        field2: number;
        field3: boop[];
        field4:
          | \\"boop\\"
          | 123
          | false
          | {
              foo: string;
            }
          | {
              bar: number;
            };
      };
      "
    `);
  });
});

describe('getUknownNamedTypes', () => {
  it('finds unknown types', () => {
    const roots: RootType[] = [
      { name: 'internal', type: { kind: 'string' } },
      {
        name: 'foo',
        type: {
          kind: 'record',
          fields: [
            { name: 'first', type: { kind: 'named', name: 'external' } },
            { name: 'second', type: { kind: 'named', name: 'internal' } },
          ],
        },
      },
    ];
    expect(getUnknownNamedTypes(roots)).toEqual(['external']);
  });

  it('empty result when no unknown', () => {
    const roots: RootType[] = [
      { name: 'internal', type: { kind: 'string' } },
      {
        name: 'foo',
        type: {
          kind: 'record',
          fields: [
            { name: 'second', type: { kind: 'named', name: 'internal' } },
          ],
        },
      },
    ];
    expect(getUnknownNamedTypes(roots)).toEqual([]);
  });
});

describe('anyTypeToTsType', () => {
  const prettyPrint = (src: string) => format(src, { parser: 'typescript' });

  it('smoke test', () => {
    const source = anyTypeToTsType(
      {
        kind: 'record',
        fields: [
          { name: 'booleanKind', type: { kind: 'boolean' } },
          { name: 'neverKind', type: { kind: 'never' } },
          { name: 'nullKind', type: { kind: 'null' } },
          { name: 'numberKind', type: { kind: 'number' } },
          { name: 'stringKind', type: { kind: 'string' } },
          { name: 'symbolKind', type: { kind: 'symbol' } },
          { name: 'undefinedKind', type: { kind: 'undefined' } },
          { name: 'unknownKind', type: { kind: 'unknown' } },
          {
            name: 'arrayKindReadWrite',
            type: { kind: 'array', type: { kind: 'string' } },
          },
          {
            name: 'arrayKindReadOnly',
            type: { kind: 'array', readonly: true, type: { kind: 'string' } },
          },
          {
            name: 'unionKind',
            type: {
              kind: 'union',
              types: [{ kind: 'string' }, { kind: 'undefined' }],
            },
          },
          {
            name: 'intersectKind',
            type: {
              kind: 'intersect',
              types: [
                {
                  kind: 'record',
                  fields: [
                    {
                      name: 'lasers',
                      nullable: true,
                      type: { kind: 'string' },
                    },
                    {
                      name: 'feelings',
                      readonly: true,
                      type: { kind: 'string' },
                    },
                  ],
                },
              ],
            },
          },
          {
            name: 'dictionaryKind',
            type: { kind: 'dictionary', valueType: { kind: 'number' } },
          },
          { name: 'namedKind', type: { kind: 'named', name: 'foo' } },
          { name: 'literalNumberKind', type: { kind: 'literal', value: 1 } },
          {
            name: 'literalStringKind',
            type: { kind: 'literal', value: 'foo' },
          },
          {
            name: 'literalBooleanKind',
            type: { kind: 'literal', value: true },
          },
          { name: 'functionKind', type: { kind: 'function' } },
        ],
      },
      { formatTypeName: (e) => e },
    );
    expect(prettyPrint(`type TestObject = ${source}`)).toMatchInlineSnapshot(`
      "type TestObject = {
        booleanKind: boolean;
        neverKind: never;
        nullKind: null;
        numberKind: number;
        stringKind: string;
        symbolKind: symbol;
        undefinedKind: undefined;
        unknownKind: unknown;
        arrayKindReadWrite: string[];
        arrayKindReadOnly: readonly string[];
        unionKind: string | undefined;
        intersectKind: {
          lasers?: string;
          readonly feelings: string;
        };
        dictionaryKind: Record<string, number>;
        namedKind: foo;
        literalNumberKind: 1;
        literalStringKind: \\"foo\\";
        literalBooleanKind: true;
        functionKind: () => unknown;
      };
      "
    `);
  });

  describe('topoSortRoots', () => {
    it('sorts when wrong order of 2 dependencies', () => {
      const roots: RootType[] = [
        {
          name: 'person',
          type: {
            kind: 'record',
            fields: [
              {
                name: 'office',
                type: { kind: 'named', name: 'office' },
              },
            ],
          },
        },

        {
          name: 'office',
          type: {
            kind: 'record',
            fields: [
              {
                name: 'address',
                type: { kind: 'string' },
              },
            ],
          },
        },
      ];

      expect(topoSortRoots(roots).map((e) => e.name)).toEqual([
        'office',
        'person',
      ]);
    });

    it('sorts when wrong order of 4 dependencies', () => {
      const roots: RootType[] = [
        {
          name: 'office',
          type: {
            kind: 'record',
            fields: [
              {
                name: 'city',
                type: { kind: 'named', name: 'city' },
              },
            ],
          },
        },

        {
          name: 'city',
          type: {
            kind: 'record',
            fields: [
              {
                name: 'country',
                type: { kind: 'named', name: 'country' },
              },
            ],
          },
        },

        {
          name: 'country',
          type: {
            kind: 'record',
            fields: [
              {
                name: 'name',
                type: { kind: 'string' },
              },
            ],
          },
        },

        {
          name: 'person',
          type: {
            kind: 'record',
            fields: [
              {
                name: 'office',
                type: { kind: 'named', name: 'office' },
              },
            ],
          },
        },
      ];

      expect(topoSortRoots(roots).map((e) => e.name)).toEqual([
        'country',
        'city',
        'office',
        'person',
      ]);
    });
  });

  it('sorts when referencing unknown types', () => {
    const roots: RootType[] = [
      {
        name: 'person',
        type: {
          kind: 'record',
          fields: [
            {
              name: 'office',
              type: { kind: 'named', name: 'office' },
            },
          ],
        },
      },

      {
        name: 'office',
        type: {
          kind: 'record',
          fields: [
            {
              name: 'address',
              type: { kind: 'named', name: 'unknownType' },
            },
          ],
        },
      },
    ];

    expect(topoSortRoots(roots).map((e) => e.name)).toEqual([
      'office',
      'person',
    ]);
  });
});

test('makeValidIdentifier', () => {
  expect(makeValidIdentifier('asdf')).toEqual('asdf');
  expect(makeValidIdentifier('1234')).toEqual('_1234');
  expect(makeValidIdentifier('a1234')).toEqual('a1234');
});
