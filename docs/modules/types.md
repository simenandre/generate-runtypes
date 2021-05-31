[generate-runtypes](../README.md) / types

# Module: types

## Table of contents

### Type aliases

- [AnyType](types.md#anytype)
- [ArrayType](types.md#arraytype)
- [DictionaryType](types.md#dictionarytype)
- [IntersectionType](types.md#intersectiontype)
- [LiteralType](types.md#literaltype)
- [NamedType](types.md#namedtype)
- [RecordField](types.md#recordfield)
- [RecordType](types.md#recordtype)
- [RootType](types.md#roottype)
- [SimpleType](types.md#simpletype)
- [UnionType](types.md#uniontype)

### Variables

- [rootTypeRt](types.md#roottypert)

## Type aliases

### AnyType

Ƭ **AnyType**: *rt.Static*<*typeof* anyTypeRt\>

Defined in: [src/types.ts:162](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L162)

___

### ArrayType

Ƭ **ArrayType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"array"`` |
| `readonly?` | *boolean* |
| `type` | [*AnyType*](types.md#anytype) |

Defined in: [src/types.ts:78](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L78)

___

### DictionaryType

Ƭ **DictionaryType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"dictionary"`` |
| `valueType` | [*AnyType*](types.md#anytype) |

Defined in: [src/types.ts:95](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L95)

___

### IntersectionType

Ƭ **IntersectionType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"intersect"`` |
| `types` | [*AnyType*](types.md#anytype)[] |

Defined in: [src/types.ts:130](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L130)

___

### LiteralType

Ƭ **LiteralType**: *rt.Static*<*typeof* literalTypeRt\>

Defined in: [src/types.ts:32](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L32)

___

### NamedType

Ƭ **NamedType**: *rt.Static*<*typeof* namedTypeRt\>

Defined in: [src/types.ts:46](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L46)

___

### RecordField

Ƭ **RecordField**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `comment?` | *string* \| *string*[] |
| `name` | *string* |
| `nullable?` | *boolean* |
| `readonly?` | *boolean* |
| `type` | [*AnyType*](types.md#anytype) |

Defined in: [src/types.ts:48](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L48)

___

### RecordType

Ƭ **RecordType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields` | [*RecordField*](types.md#recordfield)[] |
| `kind` | ``"record"`` |

Defined in: [src/types.ts:56](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L56)

___

### RootType

Ƭ **RootType**: *rt.Static*<*typeof* [*rootTypeRt*](types.md#roottypert)\>

Defined in: [src/types.ts:174](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L174)

___

### SimpleType

Ƭ **SimpleType**: *rt.Static*<*typeof* simpleTypeRt\>

Defined in: [src/types.ts:21](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L21)

___

### UnionType

Ƭ **UnionType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"union"`` |
| `types` | [*AnyType*](types.md#anytype)[] |

Defined in: [src/types.ts:110](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L110)

## Variables

### rootTypeRt

• `Const` **rootTypeRt**: *Intersect*<[*Record*<{ `name`: *String* ; `type`: *Union*<[*Runtype*<[*ArrayType*](types.md#arraytype)\>, *Runtype*<[*DictionaryType*](types.md#dictionarytype)\>, *Runtype*<[*IntersectionType*](types.md#intersectiontype)\>, *Record*<{ `kind`: *Literal*<``"literal"``\> ; `value`: *Union*<[*Boolean*, *Literal*<``null``\>, *Number*, *String*, *Literal*<undefined\>]\>  }, ``false``\>, *Record*<{ `kind`: *Literal*<``"named"``\> ; `name`: *String*  }, ``false``\>, *Runtype*<[*RecordType*](types.md#recordtype)\>, *Record*<{ `kind`: *Union*<[*Literal*<``"boolean"``\>, *Literal*<``"function"``\>, *Literal*<``"never"``\>, *Literal*<``"null"``\>, *Literal*<``"number"``\>, *Literal*<``"string"``\>, *Literal*<``"symbol"``\>, *Literal*<``"undefined"``\>, *Literal*<``"unknown"``\>]\>  }, ``false``\>, *Runtype*<[*UnionType*](types.md#uniontype)\>]\>  }, ``false``\>, *InternalRecord*<{ `comment`: *Union*<[*String*, *Arr*<String, ``false``\>]\> ; `export`: *Boolean*  }, ``true``, ``false``\>]\>

Defined in: [src/types.ts:164](https://github.com/cobraz/generate-runtypes/blob/a647c07/src/types.ts#L164)
