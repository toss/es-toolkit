# sample (Lodash 호환성)

::: warning `es-toolkit`의 [sample](../../array/sample.md)을 사용하세요

이 `sample` 함수는 `null`이나 `undefined` 처리, 객체 값 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [sample](../../array/sample.md)을 사용하세요.

:::

배열이나 객체에서 랜덤한 요소 하나를 가져와요.

```typescript
const randomItem = sample(collection);
```

## 사용법

### `sample(collection)`

배열이나 객체에서 랜덤한 요소를 하나 선택할 때 `sample`을 사용하세요. 배열에서는 랜덤한 요소를 반환하고, 객체에서는 랜덤한 값을 반환해요.

```typescript
import { sample } from 'es-toolkit/compat';

// 배열에서 랜덤한 요소 가져오기
sample([1, 2, 3, 4, 5]);
// 1부터 5까지 중 랜덤한 숫자 하나를 반환해요

// 객체에서 랜덤한 값 가져오기
sample({ a: 1, b: 2, c: 3 });
// 1, 2, 3 중 랜덤한 값 하나를 반환해요

// 문자열도 처리해요
sample('hello');
// 'h', 'e', 'l', 'l', 'o' 중 랜덤한 문자 하나를 반환해요
```

`null`이나 `undefined`는 `undefined`를 반환해요.

```typescript
import { sample } from 'es-toolkit/compat';

sample(null); // undefined
sample(undefined); // undefined
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): 샘플링할 배열이나 객체예요.

#### 반환 값

(`T | string | undefined`): 배열이나 객체에서 랜덤하게 선택된 요소를 반환해요. 컬렉션이 비어있거나 `null`, `undefined`면 `undefined`를 반환해요.
