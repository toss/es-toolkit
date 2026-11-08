---
description: es-toolkit과 다른 라이브러리의 성능 차이
---

# 성능

<BenchmarkChart />

es-toolkit은 설계할 때 성능을 우선적으로 고려하고 있어요. lodash와 같은 다른 라이브러리와 비교했을 때, 평균적으로 2배의 성능 향상을 확인할 수 있었어요. 함수에 따라서는 11배 빠른 성능을 보이기도 했죠.
현대적인 JavaScript API을 이용하여 구현했기 때문이에요.

## 성능 비교

<BenchmarkEnvironment />

<BenchmarkTable />

## 측정 방법

각 벤치마크는 [mitata](https://github.com/evanwashere/mitata)로 별도의 Node.js 프로세스에서 실행하고, 위 숫자는 5번 실행한 결과의 중앙값이에요. 직접 실행하려면 아래 명령을 사용하세요.

```bash
yarn bench omit.bench.ts
```

벤치마크 코드는 [`benchmarks/performance`](https://github.com/toss/es-toolkit/tree/main/benchmarks/performance)에서 확인할 수 있어요.
