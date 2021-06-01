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

<<<<<<< HEAD
Defined in: [src/main.ts:62](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/main.ts#L62)
=======
Defined in: [src/main.ts:58](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L58)
>>>>>>> main

___

### formatOptions

• `Optional` **formatOptions**: [*PrettierOptions*](main.prettieroptions.md)

Options to use for prettier formatting. Default: undefined

<<<<<<< HEAD
Defined in: [src/main.ts:65](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/main.ts#L65)
=======
Defined in: [src/main.ts:61](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L61)
>>>>>>> main

___

### formatRuntypeName

• `Optional` **formatRuntypeName**: NameFunction

Function used to format the names of generated runtypes.
The function is passed in a name and must return a string that will be
used in place of that name.

<<<<<<< HEAD
Defined in: [src/main.ts:99](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/main.ts#L99)
=======
Defined in: [src/main.ts:95](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L95)
>>>>>>> main

___

### formatTypeName

• `Optional` **formatTypeName**: NameFunction

Function used to format the names of generated type.
The function is passed in a name and must return a string that will be
used in place of that name.

<<<<<<< HEAD
Defined in: [src/main.ts:106](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/main.ts#L106)
=======
Defined in: [src/main.ts:102](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L102)
>>>>>>> main

___

### includeImport

• `Optional` **includeImport**: *boolean*

Include code that imports the runtypes library in the generated code.
When turned on, `import * as rt from "runtypes";` will be added at the
top of the generated code.
Default: true

<<<<<<< HEAD
Defined in: [src/main.ts:73](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/main.ts#L73)
=======
Defined in: [src/main.ts:69](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L69)
>>>>>>> main

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

<<<<<<< HEAD
Defined in: [src/main.ts:92](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/main.ts#L92)
=======
Defined in: [src/main.ts:88](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L88)
>>>>>>> main

___

### rejectCyclicDependencies

• `Optional` **rejectCyclicDependencies**: *boolean*

Whether to throw when encountering root types with cyclic dependencies,
or emit possibly broken code for them.
Default: false

<<<<<<< HEAD
Defined in: [src/main.ts:113](https://github.com/cobraz/generate-runtypes/blob/2a76286/src/main.ts#L113)
=======
Defined in: [src/main.ts:109](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L109)

___

### rejectUnknownNamedTypes

• `Optional` **rejectUnknownNamedTypes**: *boolean*

Whether to throw when encountering a named type that's not one of the, root
types. Useful for caching typos when generating code. Must be disabled when
using named types that are not part of the ones being generated.

Default: false

Defined in: [src/main.ts:118](https://github.com/cobraz/generate-runtypes/blob/7317811/src/main.ts#L118)
>>>>>>> main
