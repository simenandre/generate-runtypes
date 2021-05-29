[generate-runtypes](../README.md) / util

# Module: util

## Table of contents

### Functions

- [groupFieldKinds](util.md#groupfieldkinds)

## Functions

### groupFieldKinds

▸ `Private` **groupFieldKinds**(`fields`: readonly [*RecordField*](types.md#recordfield)[]): { `fields`: [*RecordField*](types.md#recordfield)[] ; `nullable`: *boolean* ; `readonly`: *boolean*  }[]

public for testing

Used to evaluate if `Record` type include `readonly` and/or `nullable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | readonly [*RecordField*](types.md#recordfield)[] |

**Returns:** { `fields`: [*RecordField*](types.md#recordfield)[] ; `nullable`: *boolean* ; `readonly`: *boolean*  }[]

Defined in: [src/util.ts:9](https://github.com/cobraz/generate-runtypes/blob/1c53623/src/util.ts#L9)
