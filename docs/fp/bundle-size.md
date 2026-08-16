# Bundle Size

<FpBundleSizeChart />

Because `es-toolkit/fp` uses a modern implementation, it has a very small bundle size compared with other libraries. Compared with [remeda](https://remedajs.com/), its bundle size is 1.5x to more than 10x smaller.

In this respect, `es-toolkit/fp` is the most efficient choice for reducing bundle size. Some utility functions are smaller than 100 bytes. Tree shaking is supported as well.

## Bundle Size Comparison

<FpBundleSizeTable />

## Measurement Method

The numbers are measured with esbuild 0.28.0 by bundling concrete JavaScript imports like these:

```typescript
import { filter } from 'es-toolkit/fp';

console.log(filter);
```

```typescript
import { filter } from 'remeda';

console.log(filter);
```

See the benchmark files in `benchmarks/bundle-size/fp/` for the exact scripts.
