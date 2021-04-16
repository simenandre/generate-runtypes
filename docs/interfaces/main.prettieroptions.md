[generate-runtypes](../README.md) / [main](../modules/main.md) / PrettierOptions

# Interface: PrettierOptions

[main](../modules/main.md).PrettierOptions

## Hierarchy

* *Partial*<RequiredOptions\>

  ↳ **PrettierOptions**

## Table of contents

### Properties

- [arrowParens](main.prettieroptions.md#arrowparens)
- [bracketSpacing](main.prettieroptions.md#bracketspacing)
- [embeddedInHtml](main.prettieroptions.md#embeddedinhtml)
- [embeddedLanguageFormatting](main.prettieroptions.md#embeddedlanguageformatting)
- [endOfLine](main.prettieroptions.md#endofline)
- [filepath](main.prettieroptions.md#filepath)
- [htmlWhitespaceSensitivity](main.prettieroptions.md#htmlwhitespacesensitivity)
- [insertPragma](main.prettieroptions.md#insertpragma)
- [jsxBracketSameLine](main.prettieroptions.md#jsxbracketsameline)
- [jsxSingleQuote](main.prettieroptions.md#jsxsinglequote)
- [parentParser](main.prettieroptions.md#parentparser)
- [parser](main.prettieroptions.md#parser)
- [plugins](main.prettieroptions.md#plugins)
- [printWidth](main.prettieroptions.md#printwidth)
- [proseWrap](main.prettieroptions.md#prosewrap)
- [quoteProps](main.prettieroptions.md#quoteprops)
- [rangeEnd](main.prettieroptions.md#rangeend)
- [rangeStart](main.prettieroptions.md#rangestart)
- [requirePragma](main.prettieroptions.md#requirepragma)
- [semi](main.prettieroptions.md#semi)
- [singleQuote](main.prettieroptions.md#singlequote)
- [tabWidth](main.prettieroptions.md#tabwidth)
- [trailingComma](main.prettieroptions.md#trailingcomma)
- [useTabs](main.prettieroptions.md#usetabs)
- [vueIndentScriptAndStyle](main.prettieroptions.md#vueindentscriptandstyle)

## Properties

### arrowParens

• `Optional` **arrowParens**: *always* \| *avoid*

Include parentheses around a sole arrow function parameter.

**`default`** 'always'

Inherited from: Partial.arrowParens

Defined in: node_modules/@types/prettier/index.d.ts:139

___

### bracketSpacing

• `Optional` **bracketSpacing**: *boolean*

Print spaces between brackets in object literals.

**`default`** true

Inherited from: Partial.bracketSpacing

Defined in: node_modules/@types/prettier/index.d.ts:91

___

### embeddedInHtml

• `Optional` **embeddedInHtml**: *boolean*

Inherited from: Partial.embeddedInHtml

Defined in: node_modules/@types/prettier/index.d.ts:613

___

### embeddedLanguageFormatting

• `Optional` **embeddedLanguageFormatting**: *auto* \| *off*

Control whether Prettier formats quoted code embedded in the file.

**`default`** 'auto'

Inherited from: Partial.embeddedLanguageFormatting

Defined in: node_modules/@types/prettier/index.d.ts:168

___

### endOfLine

• `Optional` **endOfLine**: *auto* \| *lf* \| *crlf* \| *cr*

Which end of line characters to apply.

**`default`** 'lf'

Inherited from: Partial.endOfLine

Defined in: node_modules/@types/prettier/index.d.ts:153

___

### filepath

• `Optional` **filepath**: *string*

Specify the input filepath. This will be used to do parser inference.

Inherited from: Partial.filepath

Defined in: node_modules/@types/prettier/index.d.ts:114

___

### htmlWhitespaceSensitivity

• `Optional` **htmlWhitespaceSensitivity**: *css* \| *strict* \| *ignore*

How to handle whitespaces in HTML.

**`default`** 'css'

Inherited from: Partial.htmlWhitespaceSensitivity

Defined in: node_modules/@types/prettier/index.d.ts:148

___

### insertPragma

• `Optional` **insertPragma**: *boolean*

Prettier can insert a special @format marker at the top of files specifying that
the file has been formatted with prettier. This works well when used in tandem with
the --require-pragma option. If there is already a docblock at the top of
the file then this option will add a newline to it with the @format marker.

**`default`** false

Inherited from: Partial.insertPragma

Defined in: node_modules/@types/prettier/index.d.ts:128

___

### jsxBracketSameLine

• `Optional` **jsxBracketSameLine**: *boolean*

Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.

**`default`** false

Inherited from: Partial.jsxBracketSameLine

Defined in: node_modules/@types/prettier/index.d.ts:96

___

### jsxSingleQuote

• `Optional` **jsxSingleQuote**: *boolean*

Use single quotes in JSX.

**`default`** false

Inherited from: Partial.jsxSingleQuote

Defined in: node_modules/@types/prettier/index.d.ts:81

___

### parentParser

• `Optional` **parentParser**: *string*

Inherited from: Partial.parentParser

Defined in: node_modules/@types/prettier/index.d.ts:612

___

### parser

• `Optional` **parser**: *angular* \| *babel-flow* \| *babel-ts* \| *babel* \| *css* \| *espree* \| *flow* \| *glimmer* \| *graphql* \| *html* \| *json-stringify* \| *json* \| *json5* \| *less* \| *lwc* \| *markdown* \| *mdx* \| *meriyah* \| *scss* \| *typescript* \| *vue* \| *yaml* \| *Pick*<string, never\> & { `_?`: *never*  } \| CustomParser

Specify which parser to use.

Inherited from: Partial.parser

Defined in: node_modules/@types/prettier/index.d.ts:110

___

### plugins

• `Optional` **plugins**: (*string* \| *Plugin*<any\>)[]

The plugin API is in a beta state.

Inherited from: Partial.plugins

Defined in: node_modules/@types/prettier/index.d.ts:143

___

### printWidth

• `Optional` **printWidth**: *number*

Specify the line length that the printer will wrap on.

**`default`** 80

Inherited from: Partial.printWidth

Defined in: node_modules/@types/prettier/index.d.ts:601

___

### proseWrap

• `Optional` **proseWrap**: *never* \| *always* \| *preserve*

By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer.
In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out.

**`default`** 'preserve'

Inherited from: Partial.proseWrap

Defined in: node_modules/@types/prettier/index.d.ts:134

___

### quoteProps

• `Optional` **quoteProps**: *preserve* \| *as-needed* \| *consistent*

Change when properties in objects are quoted.

**`default`** 'as-needed'

Inherited from: Partial.quoteProps

Defined in: node_modules/@types/prettier/index.d.ts:158

___

### rangeEnd

• `Optional` **rangeEnd**: *number*

Format only a segment of a file.

**`default`** Infinity

Inherited from: Partial.rangeEnd

Defined in: node_modules/@types/prettier/index.d.ts:106

___

### rangeStart

• `Optional` **rangeStart**: *number*

Format only a segment of a file.

**`default`** 0

Inherited from: Partial.rangeStart

Defined in: node_modules/@types/prettier/index.d.ts:101

___

### requirePragma

• `Optional` **requirePragma**: *boolean*

Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
This is very useful when gradually transitioning large, unformatted codebases to prettier.

**`default`** false

Inherited from: Partial.requirePragma

Defined in: node_modules/@types/prettier/index.d.ts:120

___

### semi

• `Optional` **semi**: *boolean*

Print semicolons at the ends of statements.

**`default`** true

Inherited from: Partial.semi

Defined in: node_modules/@types/prettier/index.d.ts:71

___

### singleQuote

• `Optional` **singleQuote**: *boolean*

Use single quotes instead of double quotes.

**`default`** false

Inherited from: Partial.singleQuote

Defined in: node_modules/@types/prettier/index.d.ts:76

___

### tabWidth

• `Optional` **tabWidth**: *number*

Specify the number of spaces per indentation-level.

**`default`** 2

Inherited from: Partial.tabWidth

Defined in: node_modules/@types/prettier/index.d.ts:606

___

### trailingComma

• `Optional` **trailingComma**: *none* \| *es5* \| *all*

Print trailing commas wherever possible.

**`default`** 'es5'

Inherited from: Partial.trailingComma

Defined in: node_modules/@types/prettier/index.d.ts:86

___

### useTabs

• `Optional` **useTabs**: *boolean*

Indent lines with tabs instead of spaces

**`default`** false

Inherited from: Partial.useTabs

Defined in: node_modules/@types/prettier/index.d.ts:611

___

### vueIndentScriptAndStyle

• `Optional` **vueIndentScriptAndStyle**: *boolean*

Whether or not to indent the code inside <script> and <style> tags in Vue files.

**`default`** false

Inherited from: Partial.vueIndentScriptAndStyle

Defined in: node_modules/@types/prettier/index.d.ts:163
