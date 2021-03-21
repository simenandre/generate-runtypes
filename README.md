<div align="center">
  <img width="520" src="./media/Logo.svg">
  
  # Generate [Runtypes][runtypes]
  
  A code generator to generate Runtypes types

[![lifecycle](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
[![NPM version](https://img.shields.io/npm/v/generate-runtypes.svg)](https://www.npmjs.com/package/generate-runtypes)
[![codecov](https://codecov.io/gh/cobraz/generate-runtypes/branch/master/graph/badge.svg)](https://codecov.io/gh/cobraz/generate-runtypes)

</div>

This library aims to provide an intuitive and easy way to generate
[Runtypes][runtypes] types. This package aims to be a great utility for a
conversion package (e.g. JSON Schema to Runtypes).

We are thankful for all help with adding new functionality, fixing issues, or
improve the package. Feel free to open issues and pull requests ❤️

It's based on [ts-morph][ts-morph] 🎉

## Documentation

Apart from this README, you can find details and examples of using the SDK in
the following places:

- [API Documentation][docs]
- [Pulumi][pulumi]

## Example

```typescript
import { Project } from 'ts-morph';
import { generateRuntype } from 'generate-runtypes';

const project = new Project();
const file = project.createSourceFile('./my-file.ts');

generateRuntype(file, {
  name: 'Post',
  fields: [
    { name: 'title', type: 'String' },
    { name: 'body', type: 'String' },
    { name: 'author', type: 'String' },
    { name: 'comments', type: 'Array', subType: 'Comment' },
  ],
});
```

[runtypes]: https://github.com/pelotom/runtypes
[ts-morph]: https://github.com/dsherret/ts-morph
