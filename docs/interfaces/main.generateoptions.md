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

## Properties

### format

• `Optional` **format**: *boolean*

Apply formatting to the output using prettier. Default: true

<<<<<<< HEAD
Defined in: [src/main.ts:59](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/main.ts#L59)
=======
Defined in: [src/main.ts:58](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/main.ts#L58)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### formatOptions

• `Optional` **formatOptions**: [*PrettierOptions*](main.prettieroptions.md)

Options to use for prettier formatting. Default: undefined

<<<<<<< HEAD
Defined in: [src/main.ts:62](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/main.ts#L62)
=======
Defined in: [src/main.ts:61](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/main.ts#L61)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### formatRuntypeName

• `Optional` **formatRuntypeName**: NameFunction

Function used to format the names of generated runtypes.
The function is passed in a name and must return a string that will be
used in place of that name.

<<<<<<< HEAD
Defined in: [src/main.ts:96](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/main.ts#L96)
=======
Defined in: [src/main.ts:95](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/main.ts#L95)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### formatTypeName

• `Optional` **formatTypeName**: NameFunction

Function used to format the names of generated type.
The function is passed in a name and must return a string that will be
used in place of that name.

<<<<<<< HEAD
Defined in: [src/main.ts:103](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/main.ts#L103)
=======
Defined in: [src/main.ts:102](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/main.ts#L102)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### includeImport

• `Optional` **includeImport**: *boolean*

Include code that imports the runtypes library in the generated code.
When turned on, `import * as rt from "runtypes";` will be added at the
top of the generated code.
Default: true

<<<<<<< HEAD
Defined in: [src/main.ts:70](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/main.ts#L70)
=======
Defined in: [src/main.ts:69](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/main.ts#L69)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

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
Defined in: [src/main.ts:89](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/main.ts#L89)
=======
Defined in: [src/main.ts:88](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/main.ts#L88)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)

___

### rejectCyclicDependencies

• `Optional` **rejectCyclicDependencies**: *boolean*

Whether to throw when encountering root types with cyclic dependencies,
or emit possibly broken code for them.
Default: false

<<<<<<< HEAD
Defined in: [src/main.ts:110](https://github.com/cobraz/generate-runtypes/blob/0a259e5/src/main.ts#L110)
=======
Defined in: [src/main.ts:109](https://github.com/cobraz/generate-runtypes/blob/2abef03/src/main.ts#L109)
>>>>>>> 0a259e5 (feat: Add flag to throw on cyclic dependencies between named types)
