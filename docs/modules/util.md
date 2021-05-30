[generate-runtypes](../README.md) / util

# Module: util

## Table of contents

### Functions

- [anyTypeToTsType](util.md#anytypetotstype)
- [getCyclicDependencies](util.md#getcyclicdependencies)
- [getNamedTypes](util.md#getnamedtypes)
- [groupFieldKinds](util.md#groupfieldkinds)
- [rootToType](util.md#roottotype)

## Functions

### anyTypeToTsType

▸ **anyTypeToTsType**(`type`: [*AnyType*](types.md#anytype), `opts`: *Pick*<[*GenerateOptions*](../interfaces/main.generateoptions.md), ``"formatTypeName"``\>): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [*AnyType*](types.md#anytype) |
| `opts` | *Pick*<[*GenerateOptions*](../interfaces/main.generateoptions.md), ``"formatTypeName"``\> |

**Returns:** *string*

Defined in: [src/util.ts:149](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/util.ts#L149)

___

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

Defined in: [src/util.ts:124](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/util.ts#L124)

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

Defined in: [src/util.ts:73](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/util.ts#L73)

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

Defined in: [src/util.ts:11](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/util.ts#L11)

___

### rootToType

▸ **rootToType**(`root`: [*RootType*](types.md#roottype), `opts`: *Pick*<[*GenerateOptions*](../interfaces/main.generateoptions.md), ``"formatRuntypeName"`` \| ``"formatTypeName"``\>): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [*RootType*](types.md#roottype) |
| `opts` | *Pick*<[*GenerateOptions*](../interfaces/main.generateoptions.md), ``"formatRuntypeName"`` \| ``"formatTypeName"``\> |

**Returns:** *string*

Defined in: [src/util.ts:203](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/util.ts#L203)
