---
description: The minimal bundle footprint offered by es-toolkit
---

# Bundle Footprint

<BundleSizeChart />

With its modern implementation, es-toolkit significantly reduces its bundle size, cutting it down by up to 97% compared to other libraries like lodash.

This makes es-toolkit the most efficient in terms of bundle size, with some utility functions being as small as less than 100 bytes.

## Bundle Footprint Comparison

<BundleSizeTable />

## Bundle Size Test Method

Our bundle size is measured using [esbuild 0.23.0](https://esbuild.github.io), by analyzing the size of code like the following:

```tsx
import { chunk } from 'es-toolkit';

// or import { chunk } from 'lodash-es';

console.log(chunk);
```

See our [bundle size benchmark code](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size) for details.
