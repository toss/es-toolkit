# sampleSize (Lodash 호환성)

::: warning `es-toolkit`의 `sampleSize`를 사용하세요

이 `sampleSize` 함수는 `null`이나 `undefined` 처리, 객체 지원, 기본값 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [sampleSize](../../array/sampleSize.md)를 사용하세요.

:::

배열이나 객체에서 지정된 개수만큼 무작위로 요소를 선택해요.

```typescript
const sampled = sampleSize(collection, size);
```

## 레퍼런스

### `sampleSize(collection, size?)`

배열이나 객체에서 무작위로 요소를 선택할 때 `sampleSize`를 사용하세요. Floyd 알고리즘을 사용해서 중복 없이 효율적으로 샘플링해요.

```typescript
import { sampleSize } from 'es-toolkit/compat';

// 배열에서 3개의 요소를 무작위로 선택해요.
sampleSize([1, 2, 3, 4, 5], 3);
// Returns: [2, 4, 5] (실제 결과는 달라질 수 있어요)

// 객체에서 2개의 값을 무작위로 선택해요.
sampleSize({ a: 1, b: 2, c: 3, d: 4 }, 2);
// Returns: [2, 4] (실제 결과는 달라질 수 있어요)
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { sampleSize } from 'es-toolkit/compat';

sampleSize(null, 2);
// Returns: []

sampleSize(undefined, 2);
// Returns: []
```

#### 파라미터

- `collection` (`Record<string, T> | Record<number, T> | T | null | undefined`): 샘플링할 배열이나 객체예요.
- `size` (`number`, 선택): 선택할 요소의 개수예요. 기본값은 `1`이에요.

### 반환 값

(`T[]`): 무작위로 선택된 요소들로 구성된 새로운 배열을 반환해요.
