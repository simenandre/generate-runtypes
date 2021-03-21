import * as rt from 'runtypes';

export const RuntypeFieldType = rt.Union(
  rt.Literal('Array'),
  rt.Literal('Boolean'),
  rt.Literal('Brand'),
  rt.Literal('Constrant'),
  rt.Literal('Dictionary'),
  rt.Literal('Function'),
  rt.Literal('Literal'),
  rt.Literal('Never'),
  rt.Literal('Number'),
  rt.Literal('Record'),
  rt.Literal('String'),
  rt.Literal('Symbol'),
  rt.Literal('Tuple'),
  rt.Literal('Union'),
  rt.Literal('Unknown'),
  rt.Literal('Void'),
);

export type RuntypeFieldType = rt.Static<typeof RuntypeFieldType>;

export const RuntypeField = rt
  .Record({
    type: RuntypeFieldType.Or(rt.String),
    name: rt.String,
  })
  .And(
    rt.Partial({
      subType: RuntypeFieldType.Or(rt.String),
      optional: rt.Boolean,
    }),
  );

export type RuntypeField = rt.Static<typeof RuntypeField>;

export const RuntypeObject = rt.Record({
  name: rt.String,
  fields: rt.Array(RuntypeField),
});

export type RuntypeObject = rt.Static<typeof RuntypeObject>;
