# Bundle Size

`es-toolkit/fp` keeps functional helpers small while preserving tree shaking. The table below shows the minified bundle size for importing one function at a time.

## Bundle Size Comparison

| Function   | es-toolkit/fp | lodash/fp direct import | remeda      |
| ---------- | ------------- | ----------------------- | ----------- |
| `add`      | 72 bytes      | 51,537 bytes            | 301 bytes   |
| `chunk`    | 286 bytes     | 51,712 bytes            | 607 bytes   |
| `filter`   | 320 bytes     | 51,917 bytes            | 391 bytes   |
| `flatMap`  | 556 bytes     | 52,042 bytes            | 434 bytes   |
| `map`      | 314 bytes     | 51,945 bytes            | 359 bytes   |
| `multiply` | 72 bytes      | 51,542 bytes            | 301 bytes   |
| `omit`     | 164 bytes     | 52,210 bytes            | 471 bytes   |
| `pick`     | 180 bytes     | 51,825 bytes            | 353 bytes   |
| `pipe`     | 759 bytes     | 51,856 bytes            | 908 bytes   |
| `sortBy`   | 497 bytes     | 53,390 bytes            | 612 bytes   |
| `take`     | 413 bytes     | 51,388 bytes            | 443 bytes   |
| `uniq`     | 108 bytes     | 51,943 bytes            | 1,233 bytes |

## Measurement Method

The numbers are measured with esbuild 0.28.0 by bundling concrete JavaScript imports like these:

```typescript
import { filter } from 'es-toolkit/fp';

console.log(filter);
```

```typescript
import filter from 'lodash/fp/filter';

console.log(filter);
```

```typescript
import { filter } from 'remeda';

console.log(filter);
```

See the benchmark files in `benchmarks/bundle-size/fp/` for the exact scripts.
