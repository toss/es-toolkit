# 성능

<FpBenchmarkChart />

`es-toolkit/fp`는 설계할 때 성능을 우선적으로 고려하고 있어요. [remeda](https://remedajs.com/)와 같은 다른 라이브러리와 비교했을 때, 평균적으로 1.5-3배의 성능 향상을 확인할 수 있었어요. 현대적인 JavaScript API를 이용하고, 꼭 필요한 기능들 중심으로 구현했기 때문이에요.

## 성능 비교

<FpBenchmarkEnvironment />

<FpBenchmarkTable />

## 측정 방법

위 숫자는 이 브랜치에서 Vitest로 측정했어요.

```bash
yarn vitest bench performance/fp/pipe.bench.ts --run
```

정확한 벤치마크 코드는 `benchmarks/performance/fp/pipe.bench.ts`에서 확인할 수 있어요.
