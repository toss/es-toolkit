---
description: es-toolkit이 가지는 작은 번들 사이즈
---

# 번들 사이즈

![es-toolkit과 lodash의 번들 사이즈를 비교하는 그래프. es-toolkit이 최대 97% 작은 번들 사이즈를 가진다.](/assets/bundle-size.png)

es-toolkit은 현대적인 구현을 가지고 있기 때문에, 다른 라이브러리에 비해서 매우 작은 번들 사이즈를 가져요. [lodash](https://lodash.com)와 비교했을 때, 함수에 따라서는 최대 97% 작은 크기를 가져요.

이런 측면에서, es-toolkit은 번들 사이즈를 줄이는 데에 가장 효율적인 선택이에요. 어떤 유틸리티 함수는 100바이트보다 작은 크기를 가져요.

## 번들 사이즈 비교

|                                               | es-toolkit@0.0.1 | lodash-es@4.17.21 | 차이   |
| --------------------------------------------- | ---------------- | ----------------- | ------ |
| [sample](./reference/array/sample.md)         | 88 bytes         | 2000 bytes        | -95.6% |
| [difference](./reference/array/difference.md) | 91 bytes         | 3190 bytes        | -97.2% |
| [sum](./reference/math/sum.md)                | 152 bytes        | 413 bytes         | -63.2% |
| [debounce](./reference/function/debounce.md)  | 144 bytes        | 1400 bytes        | -89.7% |
| [throttle](./reference/function/throttle.md)  | 110 bytes        | 1460 bytes        | -92.5% |
| [pick](./reference/object/pick.md)            | 657 bytes        | 3860 bytes        | -83.0% |
| [zip](./reference/array/zip.md)               | 797 bytes        | 1790 bytes        | -55.5% |

## 번들 사이즈 측정 방법

[esbuild 0.23.0](https://esbuild.github.io)로 번들 사이즈를 측정하고 있어요. 아래와 같은 코드를 사용해요.

```tsx
import { chunk } from 'es-toolkit';
// 또는 import { chunk } from 'lodash-es';

console.log(chunk);
```

[번들 사이즈 측정 벤치마크 코드](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)를 참고하세요.
