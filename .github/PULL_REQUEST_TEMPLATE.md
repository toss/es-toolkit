<!--
Thanks for contributing to es-toolkit!

We encourage you to use AI to assist you in researching, creating, and reviewing changes. However, you must review and deeply understand what you submit. For this reason, **pull request descriptions from external contributors must be written by a human**.

## Title

Use the format `<type>[function names]: <description>`, for example `fix[chunk]: handle empty arrays`.
The type is one of feat, fix, docs, test, or chore. See .github/CONTRIBUTING.md#4-pull-requests

## Before you open this

Find your change below and go through its checklist. These are the only categories we accept — a rename or a rewrite that leaves the behavior unchanged is not one of them, and neither is a new function that has not been discussed yet. The reasoning behind each rule is in .github/CONTRIBUTING.md#41-what-we-accept

### Adding a new function

- [ ] A discussion proposing this function was accepted, and it is linked below. Without one we close the pull request, even when the implementation is good.
- [ ] The implementation, tests, a benchmark, and documentation in all four languages are included.

### Improving performance

- [ ] Benchmark results for `main` and for this branch are pasted under "Benchmark results". We cannot tell a real speedup from reading code, so a claim without numbers gets closed.

### Fixing behavior that differs from Lodash (es-toolkit/compat)

- [ ] The difference is written as code: the input, what Lodash returns for it, and what es-toolkit returns today.
- [ ] A test that fails without this change is included, so the behavior does not drift back later.
- [ ] Benchmark results are attached if the function runs in a hot path.

### Fixing a bug or the documentation

- [ ] Related issues are linked with `fixes #number`.
- [ ] Documentation changes are applied to all four languages: English, Korean, Japanese, and Simplified Chinese.
- [ ] Small documentation fixes are collected into this one pull request rather than split across several.

Now fill in the sections below.
-->

## Summary

<!-- What problem does this solve? Link the related issue or discussion. -->

## Changes

<!-- What you changed, in bullet points. -->

## Benchmark results

<!--
Only for performance changes: paste the benchmark output for `main` and for this branch. Delete this section otherwise.

No need to paste test output — CI runs the test suite on every pull request. Benchmarks are the exception, since nothing in CI runs them.
-->
