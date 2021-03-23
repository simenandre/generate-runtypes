import * as rt from 'runtypes';

/**
 * Types that don't need any extra configuration
 */
const simpleTypeRt = rt.Record({
  kind: rt.Union(
    rt.Literal('boolean'),
    rt.Literal('function'),
    rt.Literal('never'),
    rt.Literal('number'),
    rt.Literal('string'),
    rt.Literal('unknown'),
    rt.Literal('void'),
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

export const rootType = rt.Record({
  name: rt.String,
  export: rt.Boolean,
  type: anyTypeRt,
});

export type RootType = rt.Static<typeof rootType>;

const personRt = rt.Record({
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
  someLiteral4: rt.Literal(rt.Null),
  someLiteral5: rt.Literal(rt.Undefined),
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
