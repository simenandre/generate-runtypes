import { RootType } from '../main';
import {
  getCyclicDependencies,
  getNamedTypes,
  getUnknownNamedTypes,
  groupFieldKinds,
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
});

describe('getNamedTypes', () => {
  it('smoke test', () => {
    const ret = getNamedTypes({
      kind: 'record',
      fields: [
        { name: 'field1', type: { kind: 'named', name: 'Person' } },
        { name: 'field2', type: { kind: 'named', name: 'Animal' } },
        { name: 'field3', type: { kind: 'named', name: 'Person' } },
        {
          name: 'field4',
          type: {
            kind: 'record',
            fields: [
              { name: 'nestedField1', type: { kind: 'named', name: 'Person' } },
              { name: 'nestedField2', type: { kind: 'named', name: 'Animal' } },
              { name: 'nestedField3', type: { kind: 'named', name: 'Robot' } },
            ],
          },
        },
      ],
    });
    expect(Array.from(ret).sort()).toEqual(['Animal', 'Person', 'Robot']);
  });

  it.todo('unions, arrays etc');
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
