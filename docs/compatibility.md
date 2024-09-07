# Compatibility with Lodash

```tsx
// es-toolkit/compat aims to provide 100% feature parity with lodash
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3, 4], 0);
// Returns [], which is identical to lodash
```

For maximum compatibility with `lodash`, use `es-toolkit/compat`, a compatibility layer that bridges the gap between the two libraries.

This module is designed to provide an identical API to `lodash`, making it easier to switch between the two libraries.

`es-toolkit/compat` has been thoroughly tested with real test cases from `lodash`.

It's important to note that `es-toolkit/compat` may have a slight performance impact and a larger bundle size compared to the original `es-toolkit`. This module is designed to facilitate a smooth transition and should be replaced with the original `es-toolkit` for optimal performance once the migration is complete.

## Design Principles

::: info
Design principles are subject to change.
:::

Our compatibility layer aims to achieve feature parity with 100% accuracy for:

- Features that are written as a test case in lodash.
- Features that can be inferred from types of `@types/lodash` or `@types/lodash-es`.

However, the following are out of scope for `es-toolkit/compat`:

- Implicit type conversions, such as converting an empty string to zero or false.
- Functions that have specialized implementations for specific types of arrays, like [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq).
- Handling cases where internal object prototypes, like `Array.prototype`, have been modified.
- Managing cases with JavaScript realms.
- Method chaining support through "Seq" methods.

## Implementation Status

::: info
The following emojis indicate the status of each feature:

- ✅: Completed (The function is fully implemented and has passed all tests with lodash test code.)
- 📝: In Review (The function is implemented but hasn't been tested with lodash test code yet.)
- ❌: Not Implemented (The function hasn't been implemented.)

Even if a feature is marked "in review," it might already be under review to ensure it matches lodash perfectly, and it could already offer the same functionality.
:::

<CompatibilityStatus lang="en"/>
