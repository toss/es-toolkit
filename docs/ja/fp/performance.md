# パフォーマンス

`es-toolkit/fp` は同じパイプライン処理で `lodash/fp` と `remeda` と比較しています。`sortBy` は現時点では除外しています。

## パフォーマンス比較

| シナリオ                      | es-toolkit/fp     | lodash/fp      | remeda            | 最速          |
| ----------------------------- | ----------------- | -------------- | ----------------- | ------------- |
| `pipe/map`                    | 20,063 ops/sec    | 93,033 ops/sec | 6,849 ops/sec     | lodash/fp     |
| `pipe/filter + map`           | 12,305 ops/sec    | 11,931 ops/sec | 4,092 ops/sec     | es-toolkit/fp |
| `pipe/map + filter + take(5)` | 1,897,403 ops/sec | 9,181 ops/sec  | 1,165,963 ops/sec | es-toolkit/fp |
| `pipe/uniq`                   | 16,295 ops/sec    | 15,002 ops/sec | 4,358 ops/sec     | es-toolkit/fp |
| `pipe/chunk(10)`              | 80,763 ops/sec    | 67,825 ops/sec | 80,757 ops/sec    | es-toolkit/fp |

## 測定方法

上記の数値は、このブランチで Vitest を使って測定しました。

```bash
yarn vitest bench performance/fp/pipe.bench.ts --run
```

正確なベンチマークコードは `benchmarks/performance/fp/pipe.bench.ts` を参照してください。
