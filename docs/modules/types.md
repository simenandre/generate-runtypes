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

<<<<<<< HEAD
Defined in: [src/types.ts:162](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L162)
=======
Defined in: [src/types.ts:162](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L162)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### ArrayType

Ƭ **ArrayType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"array"`` |
| `readonly?` | *boolean* |
| `type` | [*AnyType*](types.md#anytype) |

<<<<<<< HEAD
Defined in: [src/types.ts:78](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L78)
=======
Defined in: [src/types.ts:78](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L78)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### DictionaryType

Ƭ **DictionaryType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"dictionary"`` |
| `valueType` | [*AnyType*](types.md#anytype) |

<<<<<<< HEAD
Defined in: [src/types.ts:95](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L95)
=======
Defined in: [src/types.ts:95](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L95)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### IntersectionType

Ƭ **IntersectionType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"intersect"`` |
| `types` | [*AnyType*](types.md#anytype)[] |

<<<<<<< HEAD
Defined in: [src/types.ts:130](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L130)
=======
Defined in: [src/types.ts:130](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L130)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### LiteralType

Ƭ **LiteralType**: *rt.Static*<*typeof* literalTypeRt\>

<<<<<<< HEAD
Defined in: [src/types.ts:32](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L32)
=======
Defined in: [src/types.ts:32](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L32)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### NamedType

Ƭ **NamedType**: *rt.Static*<*typeof* namedTypeRt\>

<<<<<<< HEAD
Defined in: [src/types.ts:46](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L46)
=======
Defined in: [src/types.ts:46](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L46)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

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

<<<<<<< HEAD
Defined in: [src/types.ts:48](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L48)
=======
Defined in: [src/types.ts:48](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L48)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### RecordType

Ƭ **RecordType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields` | [*RecordField*](types.md#recordfield)[] |
| `kind` | ``"record"`` |

<<<<<<< HEAD
Defined in: [src/types.ts:56](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L56)
=======
Defined in: [src/types.ts:56](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L56)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### RootType

Ƭ **RootType**: *rt.Static*<*typeof* [*rootTypeRt*](types.md#roottypert)\>

<<<<<<< HEAD
Defined in: [src/types.ts:174](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L174)
=======
Defined in: [src/types.ts:174](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L174)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### SimpleType

Ƭ **SimpleType**: *rt.Static*<*typeof* simpleTypeRt\>

<<<<<<< HEAD
Defined in: [src/types.ts:21](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L21)
=======
Defined in: [src/types.ts:21](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L21)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### UnionType

Ƭ **UnionType**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kind` | ``"union"`` |
| `types` | [*AnyType*](types.md#anytype)[] |

<<<<<<< HEAD
Defined in: [src/types.ts:110](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L110)
=======
Defined in: [src/types.ts:110](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L110)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

## Variables

### rootTypeRt

• `Const` **rootTypeRt**: *Intersect*<[*Record*<{ `name`: *String* ; `type`: *Union*<[*Runtype*<[*ArrayType*](types.md#arraytype)\>, *Runtype*<[*DictionaryType*](types.md#dictionarytype)\>, *Runtype*<[*IntersectionType*](types.md#intersectiontype)\>, *Record*<{ `kind`: *Literal*<``"literal"``\> ; `value`: *Union*<[*Boolean*, *Literal*<``null``\>, *Number*, *String*, *Literal*<undefined\>]\>  }, ``false``\>, *Record*<{ `kind`: *Literal*<``"named"``\> ; `name`: *String*  }, ``false``\>, *Runtype*<[*RecordType*](types.md#recordtype)\>, *Record*<{ `kind`: *Union*<[*Literal*<``"boolean"``\>, *Literal*<``"function"``\>, *Literal*<``"never"``\>, *Literal*<``"null"``\>, *Literal*<``"number"``\>, *Literal*<``"string"``\>, *Literal*<``"symbol"``\>, *Literal*<``"undefined"``\>, *Literal*<``"unknown"``\>]\>  }, ``false``\>, *Runtype*<[*UnionType*](types.md#uniontype)\>]\>  }, ``false``\>, *InternalRecord*<{ `comment`: *Union*<[*String*, *Arr*<String, ``false``\>]\> ; `export`: *Boolean*  }, ``true``, ``false``\>]\>

<<<<<<< HEAD
Defined in: [src/types.ts:164](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/types.ts#L164)
=======
Defined in: [src/types.ts:164](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/types.ts#L164)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)
