---
description: The minimal bundle footprint offered by es-toolkit
---

# Bundle Footprint

![Graph showing the difference in bundle size between es-toolkit and lodash. There is a difference up to 97% in bundle size.](/assets/bundle-size.png)

With its modern implementation, es-toolkit significantly reduces its bundle size, cutting it down by up to 97% compared to other libraries like lodash.

This makes es-toolkit the most efficient in terms of bundle size, with some utility functions being as small as less than 100 bytes.

## Bundle Footprint Comparison

|                                            | es-toolkit@0.0.1 | lodash-es@4.17.21 | Difference |
| ------------------------------------------ | ---------------- | ----------------- | ---------- |
| [sample](./reference/array/sample)         | 88 bytes         | 2000 bytes        | -95.6%     |
| [difference](./reference/array/difference) | 91 bytes         | 3190 bytes        | -97.2%     |
| [sum](./reference/math/sum)                | 152 bytes        | 413 bytes         | -63.2%     |
| [debounce](./reference/function/debounce)  | 144 bytes        | 1400 bytes        | -89.7%     |
| [throttle](./reference/function/throttle)  | 110 bytes        | 1460 bytes        | -92.5%     |
| [pick](./reference/object/pick)            | 657 bytes        | 3860 bytes        | -83.0%     |
| [zip](./reference/array/zip)               | 797 bytes        | 1790 bytes        | -55.5%     |

## Bundle Size Test Method

Our bundle size is measured using [esbuild 0.23.0](https://esbuild.github.io), by analyzing the size of code like the following:

```tsx
import { chunk } from 'es-toolkit';

// or import { chunk } from 'lodash-es';

console.log(chunk);
```

See our [bundle size benchmark code](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size) for details.
