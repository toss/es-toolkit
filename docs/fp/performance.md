# Performance

`es-toolkit/fp` is benchmarked against `lodash/fp` and `remeda` with the same pipeline operations. `sortBy` is excluded for now.

## Performance Comparison

| Scenario                      | es-toolkit/fp     | lodash/fp      | remeda            | Fastest       |
| ----------------------------- | ----------------- | -------------- | ----------------- | ------------- |
| `pipe/map`                    | 20,063 ops/sec    | 93,033 ops/sec | 6,849 ops/sec     | lodash/fp     |
| `pipe/filter + map`           | 12,305 ops/sec    | 11,931 ops/sec | 4,092 ops/sec     | es-toolkit/fp |
| `pipe/map + filter + take(5)` | 1,897,403 ops/sec | 9,181 ops/sec  | 1,165,963 ops/sec | es-toolkit/fp |
| `pipe/uniq`                   | 16,295 ops/sec    | 15,002 ops/sec | 4,358 ops/sec     | es-toolkit/fp |
| `pipe/chunk(10)`              | 80,763 ops/sec    | 67,825 ops/sec | 80,757 ops/sec    | es-toolkit/fp |

## Measurement Method

The numbers above were measured on this branch with Vitest:

```bash
yarn vitest bench performance/fp/pipe.bench.ts --run
```

See `benchmarks/performance/fp/pipe.bench.ts` for the exact benchmark code.
