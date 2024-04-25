# Contributing to es-toolkit

We welcome contribution from everyone in the community. All communications in this repository will be in English.

> Every contributor to es-toolkit should adhere to our Code of Conduct. Please read the [full text](./CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## 1. Our Design Priniciples

Note that we value performance, simplicity of implementation, and detailed documentations. We do not aim for supporting a variety of features and options. Our goal is to provide a small set of performant and well-functioning utilities.

### 1.1 Performance

All functions es-toolkit provides should be more performant than or similar with that of alternative libraries provide. 

We measure the performance of our library every time our code is edited. We are using [vitest's benchmark feature](https://vitest.dev/api/#bench). For our benchmark code, please refer to our [benchmark directory](https://github.com/toss/es-toolkit/tree/main/benchmarks).

When a new functionality is added, a benchmark code should be added. Please add screenshots of the benchmarks when opening a pull request for easy reference and history tracking.

### 1.2 Simplicity

We value implementation and interface simplicity over a variety of features for performance, code readability, and easy maintenance. Our functions will not provide complex options to suit every usecase. 

In this manner, instead of having complex options of making full use of overloading, etc, to support edge cases, we aim to provide the most simplest interface and implementation for the most common 85% usecases.

### 1.3 Documentation

All of our functions should be documented in detail for easy reference. All functions should have the jsdoc and corresponding documents [in our documentation directory](https://github.com/toss/es-toolkit/tree/main/docs) for all of their features. 

We use English as our primary language, but we aim to support Korean documents in our best effort. If you have difficulties writing Korean documents, please let our contributors know so that we can provide the corresponding Korean documents for you.

## 2. Issues

You can contribute to es-toolkit via:

- Improving our [docs](https://es-toolkit.slash.page)
- [Reporting a bug in our issues tab](https://github.com/toss/es-toolkit/issues/new/choose)
- [Requesting a new feature or package](https://github.com/toss/es-toolkit/issues/new/choose)
- [Having a look at our issue list](https://github.com/toss/es-toolkit/issues) to see what's to be fixed

## 3. Pull Requests

> [Opening a pull request](https://github.com/toss/es-toolkit/compare) <br/>

You can raise your own pull request. The title of your pull request should match the following format:

```
<type>[function names]: <description>
```

> We do not care about the number, or style of commits in your history, because we squash merge every PR into main. <br/>
> Feel free to commit in whatever style you feel comfortable with.

### 3.1 Type

**Type must be one of those**

if you changed shipped code :

- feat - for any new functionality additions
- fix - for any fixes that don't add new functionality

if you haven't changed shipped code :

- docs - if you only change documentation
- test - if you only change tests

other :

- chore - anything else

### 3.2 Function Names

The name of function that you made changes. (ex: debounce, throttle)<br/>
If you made changes across multiple packages, writing package scope is optional.

### 3.3 Description

A clear and concise description of what the pr is about.
