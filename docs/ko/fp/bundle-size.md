# 번들 사이즈

<FpBundleSizeChart />

`es-toolkit/fp`는 현대적인 구현을 가지고 있기 때문에, 다른 라이브러리에 비해서 매우 작은 번들 사이즈를 가져요. [remeda](https://remedajs.com/)와 비교했을 때, 1.5배에서 최대 10배 이상 작은 번들 사이즈를 가져요.

이런 측면에서, `es-toolkit/fp`는 번들 사이즈를 줄이는 데에 가장 효율적인 선택이에요. 어떤 유틸리티 함수는 100바이트보다 작은 크기를 가져요. 트리 셰이킹도 당연히 지원해요.

## 번들 사이즈 비교

<FpBundleSizeTable />

## 측정 방법

esbuild 0.28.0으로 아래처럼 구체적인 JavaScript import를 번들링해서 측정해요.

```typescript
import { filter } from 'es-toolkit/fp';

console.log(filter);
```

```typescript
import { filter } from 'remeda';

console.log(filter);
```

정확한 측정 스크립트는 `benchmarks/bundle-size/fp/`에서 확인할 수 있어요.
