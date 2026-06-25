# 번들 사이즈

`es-toolkit/fp`는 함수형 헬퍼를 작게 유지하면서도 트리 쉐이킹을 지원해요. 아래 표는 함수를 하나씩 가져올 때의 minified 번들 사이즈예요.

## 번들 사이즈 비교

| 함수       | es-toolkit/fp | lodash/fp direct import | remeda      |
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

## 측정 방법

esbuild 0.28.0으로 아래처럼 구체적인 JavaScript import를 번들링해서 측정해요.

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

정확한 측정 스크립트는 `benchmarks/bundle-size/fp/`에서 확인할 수 있어요.
