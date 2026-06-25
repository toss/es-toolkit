# 성능

`es-toolkit/fp`는 같은 파이프라인 작업을 기준으로 `lodash/fp`, `remeda`와 비교해요. `sortBy`는 지금은 제외했어요.

## 성능 비교

| 시나리오                      | es-toolkit/fp     | lodash/fp      | remeda            | 가장 빠름     |
| ----------------------------- | ----------------- | -------------- | ----------------- | ------------- |
| `pipe/map`                    | 20,063 ops/sec    | 93,033 ops/sec | 6,849 ops/sec     | lodash/fp     |
| `pipe/filter + map`           | 12,305 ops/sec    | 11,931 ops/sec | 4,092 ops/sec     | es-toolkit/fp |
| `pipe/map + filter + take(5)` | 1,897,403 ops/sec | 9,181 ops/sec  | 1,165,963 ops/sec | es-toolkit/fp |
| `pipe/uniq`                   | 16,295 ops/sec    | 15,002 ops/sec | 4,358 ops/sec     | es-toolkit/fp |
| `pipe/chunk(10)`              | 80,763 ops/sec    | 67,825 ops/sec | 80,757 ops/sec    | es-toolkit/fp |

## 측정 방법

위 숫자는 이 브랜치에서 Vitest로 측정했어요.

```bash
yarn vitest bench performance/fp/pipe.bench.ts --run
```

정확한 벤치마크 코드는 `benchmarks/performance/fp/pipe.bench.ts`에서 확인할 수 있어요.
