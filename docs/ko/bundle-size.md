---
description: es-toolkit이 가지는 작은 번들 사이즈
---

# 번들 사이즈

<BundleSizeChart />

es-toolkit은 현대적인 구현을 가지고 있기 때문에, 다른 라이브러리에 비해서 매우 작은 번들 사이즈를 가져요. [lodash](https://lodash.com)와 비교했을 때, 함수에 따라서는 최대 97% 작은 크기를 가져요.

이런 측면에서, es-toolkit은 번들 사이즈를 줄이는 데에 가장 효율적인 선택이에요. 어떤 유틸리티 함수는 100바이트보다 작은 크기를 가져요.

## 번들 사이즈 비교

<BundleSizeTable />

## 번들 사이즈 측정 방법

[esbuild 0.23.0](https://esbuild.github.io)로 번들 사이즈를 측정하고 있어요. 아래와 같은 코드를 사용해요.

```tsx
import { chunk } from 'es-toolkit';

// 또는 import { chunk } from 'lodash-es';

console.log(chunk);
```

[번들 사이즈 측정 벤치마크 코드](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)를 참고하세요.
