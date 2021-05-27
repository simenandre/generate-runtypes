[generate-runtypes](../README.md) / util

# Module: util

## Table of contents

### Functions

- [getCyclicDependencies](util.md#getcyclicdependencies)
- [getNamedTypes](util.md#getnamedtypes)
<<<<<<< HEAD
- [groupFieldKinds](util.md#groupfieldkinds)
=======
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

## Functions

### getCyclicDependencies

▸ **getCyclicDependencies**(`roots`: [*RootType*](types.md#roottype)[]): [*string*, *string*][]

Finds root type that reference each other cyclicly. Returns an array of
tuples. Each tuple contains two strings; the name of the roots that reference
each other.

Dependencies can either be a root referencing itself, two roots directly
referencing each other, or roots referencing each other via other named
types.

#### Parameters

| Name | Type |
| :------ | :------ |
| `roots` | [*RootType*](types.md#roottype)[] |

**Returns:** [*string*, *string*][]

<<<<<<< HEAD
Defined in: [src/util.ts:123](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/util.ts#L123)
=======
Defined in: [src/util.ts:87](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/util.ts#L87)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### getNamedTypes

▸ `Private` **getNamedTypes**(`t`: [*AnyType*](types.md#anytype)): readonly *string*[]

Get a list of all named named types referenced in a type

public for testing

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | [*AnyType*](types.md#anytype) |

**Returns:** readonly *string*[]

<<<<<<< HEAD
Defined in: [src/util.ts:72](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/util.ts#L72)

___

### groupFieldKinds

▸ `Private` **groupFieldKinds**(`fields`: readonly [*RecordField*](types.md#recordfield)[]): { `fields`: [*RecordField*](types.md#recordfield)[] ; `nullable`: *boolean* ; `readonly`: *boolean*  }[]

public for testing

Used to evaluate if `Record` type include `readonly` and/or `nullable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | readonly [*RecordField*](types.md#recordfield)[] |

**Returns:** { `fields`: [*RecordField*](types.md#recordfield)[] ; `nullable`: *boolean* ; `readonly`: *boolean*  }[]

Defined in: [src/util.ts:10](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/util.ts#L10)
=======
Defined in: [src/util.ts:36](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/util.ts#L36)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)
