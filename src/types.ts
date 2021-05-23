/* istanbul ignore file */
import * as rt from 'runtypes';

/**
 * Types that don't need any extra configuration
 */
const simpleTypeRt = rt.Record({
  kind: rt.Union(
    rt.Literal('boolean'),
    rt.Literal('function'),
    rt.Literal('never'),
    rt.Literal('null'),
    rt.Literal('number'),
    rt.Literal('string'),
    rt.Literal('symbol'),
    rt.Literal('undefined'),
    rt.Literal('unknown'),
  ),
});

export type SimpleType = rt.Static<typeof simpleTypeRt>;

/**
 * Same as:
 * rt.Literal(value)
 */
const literalTypeRt = rt.Record({
  kind: rt.Literal('literal'),
  value: rt.Union(rt.Boolean, rt.Null, rt.Number, rt.String, rt.Undefined),
});

export type LiteralType = rt.Static<typeof literalTypeRt>;

/**
 * Same as using an already defined runtype. such as how "personRt" is used here::
 *
 * const personRt = rt.Record({ name: rt.String });
 * const people = rt.Array(personRt);
 *
 */
const namedTypeRt = rt.Record({
  kind: rt.Literal('named'),
  name: rt.String,
});

export type NamedType = rt.Static<typeof namedTypeRt>;

export type RecordField = {
  name: string;
  type: AnyType;
  readonly?: boolean;
  nullable?: boolean;
  comment?: string | string[];
};

export type RecordType = {
  kind: 'record';
  fields: RecordField[];
};

/**
 * Same as rt.Record({...})
 */
const recordTypeRt: rt.Runtype<RecordType> = rt.Lazy(() =>
  rt.Record({
    kind: rt.Literal('record'),
    fields: rt.Array(
      rt.Record({
        name: rt.String,
        readonly: rt.Boolean,
        nullable: rt.Boolean,
        type: anyTypeRt,
      }),
    ),
  }),
);

export type ArrayType = {
  kind: 'array';
  type: AnyType;
  readonly?: boolean;
};

/**
 * Same as rt.Array(type)
 */
const arrayTypeRt: rt.Runtype<ArrayType> = rt.Lazy(() =>
  rt.Record({
    kind: rt.Literal('array'),
    type: anyTypeRt,
    readonly: rt.Boolean,
  }),
);

export type DictionaryType = {
  kind: 'dictionary';
  valueType: AnyType;
};

/**
 * Same as rt.Dictionary(valueType)
 */
const dictionaryTypeRt: rt.Runtype<DictionaryType> = rt.Lazy(() =>
  rt.Record({
    kind: rt.Literal('dictionary'),
    valueType: anyTypeRt,
  }),
);

export type UnionType = {
  kind: 'union';
  types: AnyType[];
};

/**
 * Same as rt.Union(type1, type2)
 */
const unionTypeRt: rt.Runtype<UnionType> = rt.Lazy(() =>
  rt.Record({
    kind: rt.Literal('union'),
    types: rt
      .Array(anyTypeRt)
      .withConstraint(
        (e) =>
          e.length <= 20 || `Union can have at most 20 types. Got ${e.length}.`,
      ),
  }),
);

export type IntersectionType = {
  kind: 'intersect';
  types: AnyType[];
};

/**
 * Same as rt.Intersect(type1, type2)
 */
const intersectionTypeRt: rt.Runtype<IntersectionType> = rt.Lazy(() =>
  rt.Record({
    kind: rt.Literal('intersect'),
    types: rt
      .Array(anyTypeRt)
      .withConstraint(
        (e) =>
          e.length <= 10 ||
          `Intersection can have at most 10 types. Got ${e.length}.`,
      ),
  }),
);

const anyTypeRt = rt.Union(
  arrayTypeRt,
  dictionaryTypeRt,
  intersectionTypeRt,
  literalTypeRt,
  namedTypeRt,
  recordTypeRt,
  simpleTypeRt,
  unionTypeRt,
);

export type AnyType = rt.Static<typeof anyTypeRt>;

export const rootTypeRt = rt.Intersect(
  rt.Record({ name: rt.String, type: anyTypeRt }),
  rt
    .Record({
      export: rt.Boolean,
      comment: rt.Union(rt.String, rt.Array(rt.String)),
    })
    .asPartial(),
);

export type RootType = rt.Static<typeof rootTypeRt>;
