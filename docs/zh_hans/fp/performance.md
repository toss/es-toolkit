# 性能

`es-toolkit/fp` 使用相同的管道操作与 `lodash/fp` 和 `remeda` 进行比较。`sortBy` 目前暂不纳入。

## 性能比较

| 场景                          | es-toolkit/fp     | lodash/fp      | remeda            | 最快          |
| ----------------------------- | ----------------- | -------------- | ----------------- | ------------- |
| `pipe/map`                    | 20,063 ops/sec    | 93,033 ops/sec | 6,849 ops/sec     | lodash/fp     |
| `pipe/filter + map`           | 12,305 ops/sec    | 11,931 ops/sec | 4,092 ops/sec     | es-toolkit/fp |
| `pipe/map + filter + take(5)` | 1,897,403 ops/sec | 9,181 ops/sec  | 1,165,963 ops/sec | es-toolkit/fp |
| `pipe/uniq`                   | 16,295 ops/sec    | 15,002 ops/sec | 4,358 ops/sec     | es-toolkit/fp |
| `pipe/chunk(10)`              | 80,763 ops/sec    | 67,825 ops/sec | 80,757 ops/sec    | es-toolkit/fp |

## 测量方法

以上数字是在此分支上使用 Vitest 测得的。

```bash
yarn vitest bench performance/fp/pipe.bench.ts --run
```

准确的基准测试代码见 `benchmarks/performance/fp/pipe.bench.ts`。
