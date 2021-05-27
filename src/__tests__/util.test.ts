import { RootType } from '../main';
import { getCyclicDependencies, getNamedTypes } from '../util';

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
