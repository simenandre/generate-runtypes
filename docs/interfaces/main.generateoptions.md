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

## Properties

### format

• `Optional` **format**: *boolean*

Apply formatting to the output using prettier. Default: true

Defined in: [src/main.ts:58](https://github.com/cobraz/generate-runtypes/blob/e397a85/src/main.ts#L58)

___

### formatOptions

• `Optional` **formatOptions**: [*PrettierOptions*](main.prettieroptions.md)

Options to use for prettier formatting. Default: undefined

Defined in: [src/main.ts:61](https://github.com/cobraz/generate-runtypes/blob/e397a85/src/main.ts#L61)

___

### formatRuntypeName

• `Optional` **formatRuntypeName**: NameFunction

Function used to format the names of generated runtypes.
The function is passed in a name and must return a string that will be
used in place of that name.

Defined in: [src/main.ts:95](https://github.com/cobraz/generate-runtypes/blob/e397a85/src/main.ts#L95)

___

### formatTypeName

• `Optional` **formatTypeName**: NameFunction

Function used to format the names of generated type.
The function is passed in a name and must return a string that will be
used in place of that name.

Defined in: [src/main.ts:102](https://github.com/cobraz/generate-runtypes/blob/e397a85/src/main.ts#L102)

___

### includeImport

• `Optional` **includeImport**: *boolean*

Include code that imports the runtypes library in the generated code.
When turned on, `import * as rt from "runtypes";` will be added at the
top of the generated code.
Default: true

Defined in: [src/main.ts:69](https://github.com/cobraz/generate-runtypes/blob/e397a85/src/main.ts#L69)

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

Defined in: [src/main.ts:88](https://github.com/cobraz/generate-runtypes/blob/e397a85/src/main.ts#L88)
