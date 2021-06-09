# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.3](https://github.com/cobraz/generate-runtypes/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2021-03-28)


### Bug Fixes

* intersection was generated with wrong name ([f94d755](https://github.com/cobraz/generate-runtypes/commit/f94d7556912d3a855bd3fb200808077bfd8142ac))

# [2.0.0-alpha.2](https://github.com/cobraz/generate-runtypes/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2021-03-27)


### Bug Fixes

* release please ([f09823b](https://github.com/cobraz/generate-runtypes/commit/f09823bea1ab5d3496ea5e9d62843e438531b58c))

# [2.0.0-alpha.1](https://github.com/cobraz/generate-runtypes/compare/v1.1.1...v2.0.0-alpha.1) (2021-03-25)


### Code Refactoring

* Remove non-alt version ([1625b96](https://github.com/cobraz/generate-runtypes/commit/1625b96c6cc31aea2f972cbe641b1a051183e1b8))


### Features

* Add groupFieldKinds, symbol type, remove void and partial/readonly ([742ce62](https://github.com/cobraz/generate-runtypes/commit/742ce62301a19e77e776606b35611a96b30b51f6))
* Alternative object format for runtypes ([#9](https://github.com/cobraz/generate-runtypes/issues/9)) ([baaaa02](https://github.com/cobraz/generate-runtypes/commit/baaaa02973dd7a5a909400ed8c1ca20dc860efed))
* More compact raw source output ([c76338d](https://github.com/cobraz/generate-runtypes/commit/c76338dabfb44eba7fe1f1c7166153e6c99f7662))
* Try alternate writer for for alt_serializer ([6543c99](https://github.com/cobraz/generate-runtypes/commit/6543c9981298dd82dd1026dac513928207b1519e))


### BREAKING CHANGES

* This package no longer require `ts-morph` and does not take inn file argument. Please consult our README.md for more information

## [3.0.0](https://www.github.com/cobraz/generate-runtypes/compare/v2.1.0...v3.0.0) (2021-06-09)


### ⚠ BREAKING CHANGES

* Previous versions vould emit code that doesn't deal with cycles, this version does. The previous versions would likely emit illegal code, nevertheless, this is breaking change.
* Anyone relying on ES6 being the target when transpiling, will need to adjust their settings when consuming this package.

### Features

* Add flag to detect unknown named types ([#106](https://www.github.com/cobraz/generate-runtypes/issues/106)) ([85267f0](https://www.github.com/cobraz/generate-runtypes/commit/85267f08eaeba568a8f88fe3c9d525a91f4091bc))
* Add flag to throw on cyclic dependencies between named types ([#101](https://www.github.com/cobraz/generate-runtypes/issues/101)) ([2e33303](https://www.github.com/cobraz/generate-runtypes/commit/2e333030746494332efb373ce82835e054858f7a))
* Add support for comments in output ([#80](https://www.github.com/cobraz/generate-runtypes/issues/80)) ([b1da522](https://www.github.com/cobraz/generate-runtypes/commit/b1da522adbb07da3f04cb1f5296858c36c463482))
* Support generating lazy runtypes ([#107](https://www.github.com/cobraz/generate-runtypes/issues/107)) ([a63d32c](https://www.github.com/cobraz/generate-runtypes/commit/a63d32c6035c1592e72be65c5aabda672a4eaec4))
* Topological sort of dependencies ([#114](https://www.github.com/cobraz/generate-runtypes/issues/114)) ([f0a80b5](https://www.github.com/cobraz/generate-runtypes/commit/f0a80b5dfbe7d2fbbc52556ead2f679af84ddb12))


### Bug Fixes

* generate correct type for dict/record ([8037530](https://www.github.com/cobraz/generate-runtypes/commit/8037530b3543b95af44f0e901309dfbb1b95a450))


### Miscellaneous Chores

* Update target to ES2019 ([#95](https://www.github.com/cobraz/generate-runtypes/issues/95)) ([a647c07](https://www.github.com/cobraz/generate-runtypes/commit/a647c073e81d75bfb5fa465c31805e9b5c06ec46))

## [2.1.0](https://www.github.com/cobraz/generate-runtypes/compare/v2.0.1...v2.1.0) (2021-04-27)


### Features

* Add null and undefined types [#64](https://www.github.com/cobraz/generate-runtypes/issues/64) ([ac8be76](https://www.github.com/cobraz/generate-runtypes/commit/ac8be76df519e9c968eb09592827ba66195ecf77))

### [2.0.1](https://www.github.com/cobraz/generate-runtypes/compare/v2.0.0...v2.0.1) (2021-04-23)


### Bug Fixes

* use formatter function for all named types ([#52](https://www.github.com/cobraz/generate-runtypes/issues/52)) ([335fc0e](https://www.github.com/cobraz/generate-runtypes/commit/335fc0eca6daaaa84d8ad670321c546c4ac8c894))

## [2.0.0](https://www.github.com/cobraz/generate-runtypes/compare/v1.1.1...v2.0.0) (2021-04-16)


### ⚠ BREAKING CHANGES

* This package no longer require `ts-morph` and does not take inn file argument. Please consult our README.md for more information

### Features

* Add groupFieldKinds, symbol type, remove void and partial/readonly ([742ce62](https://www.github.com/cobraz/generate-runtypes/commit/742ce62301a19e77e776606b35611a96b30b51f6))
* Alternative object format for runtypes ([#9](https://www.github.com/cobraz/generate-runtypes/issues/9)) ([baaaa02](https://www.github.com/cobraz/generate-runtypes/commit/baaaa02973dd7a5a909400ed8c1ca20dc860efed))
* More compact raw source output ([c76338d](https://www.github.com/cobraz/generate-runtypes/commit/c76338dabfb44eba7fe1f1c7166153e6c99f7662))
* output type definitions and allow custom names ([#30](https://www.github.com/cobraz/generate-runtypes/issues/30)) ([bbad2d3](https://www.github.com/cobraz/generate-runtypes/commit/bbad2d3c8a0dad408bd9d950964d6cc08c25b059)), closes [#28](https://www.github.com/cobraz/generate-runtypes/issues/28)
* Try alternate writer for for alt_serializer ([6543c99](https://www.github.com/cobraz/generate-runtypes/commit/6543c9981298dd82dd1026dac513928207b1519e))


### Bug Fixes

* Getting ready to release v2 ([8080edc](https://www.github.com/cobraz/generate-runtypes/commit/8080edcfb26e25ade27d7b5f3cc4b037b6aa0c29))
* infinite loop on empty record ([#34](https://www.github.com/cobraz/generate-runtypes/issues/34)) ([5596de4](https://www.github.com/cobraz/generate-runtypes/commit/5596de4633b65c151a9024f3130ea941c653453e))
* intersection was generated with wrong name ([f94d755](https://www.github.com/cobraz/generate-runtypes/commit/f94d7556912d3a855bd3fb200808077bfd8142ac))
* release please ([f09823b](https://www.github.com/cobraz/generate-runtypes/commit/f09823bea1ab5d3496ea5e9d62843e438531b58c))


### Code Refactoring

* Remove non-alt version ([1625b96](https://www.github.com/cobraz/generate-runtypes/commit/1625b96c6cc31aea2f972cbe641b1a051183e1b8))

## [1.1.1](https://github.com/cobraz/generate-runtypes/compare/v1.1.0...v1.1.1) (2021-03-21)


### Bug Fixes

* Reference correct `main` file ([0a9da84](https://github.com/cobraz/generate-runtypes/commit/0a9da84008fea6c66d71212460f4f12cd2ae49a6))

# [1.1.0](https://github.com/cobraz/generate-runtypes/compare/v1.0.0...v1.1.0) (2021-03-21)


### Features

* initial commit ([e1e7d90](https://github.com/cobraz/generate-runtypes/commit/e1e7d90a015b9ebd2bb35becca5a144b8d1b2fe2))

# 1.0.0 (2021-03-21)


### Features

* initial commit ([048073d](https://github.com/cobraz/generate-runtypes/commit/048073dc45dab424e280a976ec6586aa500224d9))
