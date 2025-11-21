---
description: The minimal bundle footprint offered by es-toolkit
---

# Bundle Footprint

![Graph showing the difference in bundle size between es-toolkit and lodash. There is a difference up to 97% in bundle size.](/assets/bundle-size.png)

With its modern implementation, es-toolkit significantly reduces its bundle size, cutting it down by up to 97% compared to other libraries like lodash.

This makes es-toolkit the most efficient in terms of bundle size, with some utility functions being as small as less than 100 bytes.

## Bundle Footprint Comparison

|                                            | es-toolkit@1.40.0 | lodash-es@4.17.21 | Difference |
| ------------------------------------------ | ----------------- | ----------------- | ---------- |
| [sample](./reference/array/sample)         | 94 bytes          | 4817 bytes        | -98.0%     |
| [difference](./reference/array/difference) | 90 bytes          | 7985 bytes        | -98.8%     |
| [sum](./reference/math/sum)                | 93 bytes          | 698 bytes         | -86.6%     |
| [debounce](./reference/function/debounce)  | 531 bytes         | 2873 bytes        | -81.5%     |
| [throttle](./reference/function/throttle)  | 764 bytes         | 3111 bytes        | -75.4%     |
| [pick](./reference/object/pick)            | 132 bytes         | 9520 bytes        | -98.6%     |
| [zip](./reference/array/zip)               | 221 bytes         | 3961 bytes        | -94.4%     |

## Bundle Size Test Method

Our bundle size is measured using [esbuild 0.23.0](https://esbuild.github.io), by analyzing the size of code like the following:

```tsx
import { chunk } from 'es-toolkit';

// or import { chunk } from 'lodash-es';

console.log(chunk);
```

See our [bundle size benchmark code](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size) for details.
