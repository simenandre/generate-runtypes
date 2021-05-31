[generate-runtypes](../README.md) / main

# Module: main

## Table of contents

### References

- [AnyType](main.md#anytype)
- [ArrayType](main.md#arraytype)
- [DictionaryType](main.md#dictionarytype)
- [LiteralType](main.md#literaltype)
- [NamedType](main.md#namedtype)
- [RecordField](main.md#recordfield)
- [RecordType](main.md#recordtype)
- [RootType](main.md#roottype)
- [UnionType](main.md#uniontype)
- [rootTypeRt](main.md#roottypert)

### Interfaces

- [GenerateOptions](../interfaces/main.generateoptions.md)
- [PrettierOptions](../interfaces/main.prettieroptions.md)

### Functions

- [generateRuntypes](main.md#generateruntypes)
- [groupFieldKinds](main.md#groupfieldkinds)

## References

### AnyType

Re-exports: [AnyType](types.md#anytype)

___

### ArrayType

Re-exports: [ArrayType](types.md#arraytype)

___

### DictionaryType

Re-exports: [DictionaryType](types.md#dictionarytype)

___

### LiteralType

Re-exports: [LiteralType](types.md#literaltype)

___

### NamedType

Re-exports: [NamedType](types.md#namedtype)

___

### RecordField

Re-exports: [RecordField](types.md#recordfield)

___

### RecordType

Re-exports: [RecordType](types.md#recordtype)

___

### RootType

Re-exports: [RootType](types.md#roottype)

___

### UnionType

Re-exports: [UnionType](types.md#uniontype)

___

### rootTypeRt

Re-exports: [rootTypeRt](types.md#roottypert)

## Functions

### generateRuntypes

▸ **generateRuntypes**(`rootConfig`: [*RootType*](types.md#roottype) \| [*RootType*](types.md#roottype)[], `opts?`: [*GenerateOptions*](../interfaces/main.generateoptions.md)): *string*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootConfig` | [*RootType*](types.md#roottype) \| [*RootType*](types.md#roottype)[] | one or more `RootType` objects. |
| `opts?` | [*GenerateOptions*](../interfaces/main.generateoptions.md) | options to control the generator. |

**Returns:** *string*

Defined in: [src/main.ts:117](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/main.ts#L117)

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

Defined in: [src/main.ts:295](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/main.ts#L295)
