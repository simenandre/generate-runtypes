[generate-runtypes](../README.md) / main

# Module: main

## Table of contents

### Functions

- [generateRuntypes](main.md#generateruntypes)
- [groupFieldKinds](main.md#groupfieldkinds)

## Functions

### generateRuntypes

▸ **generateRuntypes**(...`roots`: [*RootType*](types.md#roottype)[]): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`...roots` | [*RootType*](types.md#roottype)[] |

**Returns:** *string*

Defined in: [main.ts:36](https://github.com/cobraz/generate-runtypes/blob/2e2dd85/src/main.ts#L36)

___

### groupFieldKinds

▸ `Private`**groupFieldKinds**(`fields`: readonly [*RecordField*](types.md#recordfield)[]): { `fields`: [*RecordField*](types.md#recordfield)[] ; `nullable`: *boolean* ; `readonly`: *boolean*  }[]

public for testing

Used to evaluate if `Record` type include `readonly` and/or `nullable`

#### Parameters:

Name | Type |
:------ | :------ |
`fields` | readonly [*RecordField*](types.md#recordfield)[] |

**Returns:** { `fields`: [*RecordField*](types.md#recordfield)[] ; `nullable`: *boolean* ; `readonly`: *boolean*  }[]

Defined in: [main.ts:136](https://github.com/cobraz/generate-runtypes/blob/2e2dd85/src/main.ts#L136)
