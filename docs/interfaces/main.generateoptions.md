[generate-runtypes](../README.md) / [main](../modules/main.md) / GenerateOptions

# Interface: GenerateOptions

[main](../modules/main.md).GenerateOptions

## Table of contents

### Properties

- [format](main.generateoptions.md#format)
- [formatOptions](main.generateoptions.md#formatoptions)
- [formatRuntypeName](main.generateoptions.md#formatruntypename)
- [formatTypeName](main.generateoptions.md#formattypename)
- [includeImport](main.generateoptions.md#includeimport)
- [includeTypes](main.generateoptions.md#includetypes)
- [rejectCyclicDependencies](main.generateoptions.md#rejectcyclicdependencies)
- [rejectUnknownNamedTypes](main.generateoptions.md#rejectunknownnamedtypes)

## Properties

### format

• `Optional` **format**: *boolean*

Apply formatting to the output using prettier. Default: true

Defined in: [src/main.ts:58](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L58)

___

### formatOptions

• `Optional` **formatOptions**: [*PrettierOptions*](main.prettieroptions.md)

Options to use for prettier formatting. Default: undefined

Defined in: [src/main.ts:61](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L61)

___

### formatRuntypeName

• `Optional` **formatRuntypeName**: NameFunction

Function used to format the names of generated runtypes.
The function is passed in a name and must return a string that will be
used in place of that name.

Defined in: [src/main.ts:95](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L95)

___

### formatTypeName

• `Optional` **formatTypeName**: NameFunction

Function used to format the names of generated type.
The function is passed in a name and must return a string that will be
used in place of that name.

Defined in: [src/main.ts:102](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L102)

___

### includeImport

• `Optional` **includeImport**: *boolean*

Include code that imports the runtypes library in the generated code.
When turned on, `import * as rt from "runtypes";` will be added at the
top of the generated code.
Default: true

Defined in: [src/main.ts:69](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L69)

___

### includeTypes

• `Optional` **includeTypes**: *boolean*

Generate type definitions in addition to runtype definitions.
Default: true

**`example`**

When enabled:
```
const myRuntype = rt.Record({ name: rt.String });
```

   * When disabled:
```
const myRuntype = rt.Record({ name: rt.String });
type MyRuntype = rt.Static<typeof myRuntype>;
```

Defined in: [src/main.ts:88](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L88)

___

### rejectCyclicDependencies

• `Optional` **rejectCyclicDependencies**: *boolean*

Whether to throw when encountering root types with cyclic dependencies,
or emit possibly broken code for them.
Default: false

Defined in: [src/main.ts:109](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L109)

___

### rejectUnknownNamedTypes

• `Optional` **rejectUnknownNamedTypes**: *boolean*

Whether to throw when encountering a named type that's not one of the, root
types. Useful for caching typos when generating code. Must be disabled when
using named types that are not part of the ones being generated.

Default: false

Defined in: [src/main.ts:118](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L118)
