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

Defined in: [src/types.ts:158](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L158)

___

### ArrayType

Ƭ **ArrayType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`kind` | *array* |
`readonly`? | *boolean* |
`type` | [*AnyType*](types.md#anytype) |

Defined in: [src/types.ts:74](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L74)

___

### DictionaryType

Ƭ **DictionaryType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`kind` | *dictionary* |
`valueType` | [*AnyType*](types.md#anytype) |

Defined in: [src/types.ts:91](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L91)

___

### IntersectionType

Ƭ **IntersectionType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`kind` | *intersect* |
`types` | [*AnyType*](types.md#anytype)[] |

Defined in: [src/types.ts:126](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L126)

___

### LiteralType

Ƭ **LiteralType**: *rt.Static*<*typeof* literalTypeRt\>

Defined in: [src/types.ts:29](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L29)

___

### NamedType

Ƭ **NamedType**: *rt.Static*<*typeof* namedTypeRt\>

Defined in: [src/types.ts:43](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L43)

___

### RecordField

Ƭ **RecordField**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | *string* |
`nullable`? | *boolean* |
`readonly`? | *boolean* |
`type` | [*AnyType*](types.md#anytype) |

Defined in: [src/types.ts:45](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L45)

___

### RecordType

Ƭ **RecordType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`fields` | [*RecordField*](types.md#recordfield)[] |
`kind` | *record* |

Defined in: [src/types.ts:52](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L52)

___

### RootType

Ƭ **RootType**: *rt.Static*<*typeof* [*rootTypeRt*](types.md#roottypert)\>

Defined in: [src/types.ts:165](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L165)

___

### SimpleType

Ƭ **SimpleType**: *rt.Static*<*typeof* simpleTypeRt\>

Defined in: [src/types.ts:18](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L18)

___

### UnionType

Ƭ **UnionType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`kind` | *union* |
`types` | [*AnyType*](types.md#anytype)[] |

Defined in: [src/types.ts:106](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L106)

## Variables

### rootTypeRt

• `Const` **rootTypeRt**: *Intersect*<[*Record*<{ `name`: *String* ; `type`: *Union*<[*Runtype*<[*ArrayType*](types.md#arraytype)\>, *Runtype*<[*DictionaryType*](types.md#dictionarytype)\>, *Runtype*<[*IntersectionType*](types.md#intersectiontype)\>, *Record*<{ `kind`: *Literal*<*literal*\> ; `value`: *Union*<[*Boolean*, *Literal*<*null*\>, *Number*, *String*, *Literal*<undefined\>]\>  }, *false*\>, *Record*<{ `kind`: *Literal*<*named*\> ; `name`: *String*  }, *false*\>, *Runtype*<[*RecordType*](types.md#recordtype)\>, *Record*<{ `kind`: *Union*<[*Literal*<*boolean*\>, *Literal*<*function*\>, *Literal*<*never*\>, *Literal*<*number*\>, *Literal*<*string*\>, *Literal*<*symbol*\>, *Literal*<*unknown*\>]\>  }, *false*\>, *Runtype*<[*UnionType*](types.md#uniontype)\>]\>  }, *false*\>, *InternalRecord*<{ `export`: *Boolean*  }, *true*, *false*\>]\>

Defined in: [src/types.ts:160](https://github.com/cobraz/generate-runtypes/blob/c1f01ea/src/types.ts#L160)
