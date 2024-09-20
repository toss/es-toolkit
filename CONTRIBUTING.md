# Contributing to es-toolkit

Thanks to all the contributors who have helped to improve the es-toolkit project. We appreciate your help!

## Introducing directories

- `src`: Contains the source code and tests of the project.
- `tests`: Contains the tests of the project. now, Includes build target tests only.
- `benchmarks`: Contains the benchmarks of the project, between es-toolkit and lodash library.
- `docs`: Contains the documentation of the project. default as english and other languages are included in the subdirectories.

## How to contribute

### Preparing setup

We use [corepack](https://github.com/nodejs/corepack) to install and use a specific version of Yarn. Make sure you have it installed on your machine.

```shell
corepack enable

yarn install
```

### Running tests

To run the tests, you can use the following command with watch mode:

```shell
yarn vitest
```

also, you can run the tests with coverage:

```shell
yarn test
```

if you change the benchmarks directory, you can run the benchmarks with the following command:

```shell
yarn benchmark
```

## Before commit

Before committing your changes, make sure to run the following command:

```shell
yarn lint

yarn format

yarn test
```
