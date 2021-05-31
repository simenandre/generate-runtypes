import { groupFieldKinds } from '../util';

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
