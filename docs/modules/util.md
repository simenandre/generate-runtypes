[generate-runtypes](../README.md) / util

# Module: util

## Table of contents

### Functions

- [getCyclicDependencies](util.md#getcyclicdependencies)
- [getNamedTypes](util.md#getnamedtypes)

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

Defined in: [src/util.ts:87](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/util.ts#L87)

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

Defined in: [src/util.ts:36](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/util.ts#L36)
