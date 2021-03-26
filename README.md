<div align="center">
  <img width="520" src="./.github/header.svg" alt="Generate Runtypes types">
  
  A code generator for Runtypes types

[![lifecycle](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
[![NPM version](https://img.shields.io/npm/v/generate-runtypes.svg)](https://www.npmjs.com/package/generate-runtypes)
[![codecov](https://codecov.io/gh/cobraz/generate-runtypes/branch/master/graph/badge.svg)](https://codecov.io/gh/cobraz/generate-runtypes)

</div>

This library aims to provide an intuitive and easy way to generate
[Runtypes][runtypes] types. This package aims to be a great utility for a
conversion package (e.g. JSON Schema to Runtypes).

We are thankful for all help with adding new functionality, fixing issues, or
improve the package. Feel free to open issues and pull requests ❤️

**Note**: The documentation below relates to `v2` which is currently in alpha
stage. If you want to use `v1`, please refer to
[main branch](https://github.com/cobraz/generate-runtypes/tree/main)

## Documentation

Apart from this README, you can find details and examples of using the SDK in
the following places:

- [API Documentation][docs]

## Example

```typescript
import { generateRuntypes } from 'generate-runtypes';

const sourceCode = generateRuntypes([
  {
    name: 'Comment',
    type: {
      kind: 'record',
      fields: [
        { name: 'author', type: { kind: 'string' } },
        { name: 'body', type: { kind: 'string' } },
        { name: 'timestamp', type: { kind: 'number' } },
      ],
    },
  },
  {
    name: 'Post',
    export: true,
    type: {
      kind: 'record',
      fields: [
        { name: 'title', type: { kind: 'string' } },
        { name: 'body', type: { kind: 'string' } },
        { name: 'author', type: { kind: 'string' } },
        {
          name: 'comments',
          type: { kind: 'array', type: { kind: 'named', name: 'Comment' } },
        },
      ],
    },
  },
]);
```

The generated code looks like this after formatting:

```typescript
import * as rt from 'runtypes';

const Comment = rt.Record({
  author: rt.String,
  body: rt.String,
  timestamp: rt.Number,
});

export const Post = rt.Record({
  title: rt.String,
  body: rt.String,
  author: rt.String,
  comments: rt.Array(Comment),
});
```

[runtypes]: https://github.com/pelotom/runtypes
[docs]: ./docs
