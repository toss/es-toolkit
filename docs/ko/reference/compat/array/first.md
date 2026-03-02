# first (Lodash 호환성)

::: warning `es-toolkit`의 `head`를 사용하세요

이 `first` 함수는 `null`이나 `undefined` 처리와 배열 형태의 객체 변환으로 인해 느리게 동작해요. `es-toolkit`의 `head` 함수는 이러한 추가 처리 없이 더 빠르고 간단하게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [head](../../array/head.md)를 사용하세요.

:::

배열의 첫 번째 요소를 반환해요.

```typescript
const firstElement = first(array);
```

## 사용법

### `first(array)`

배열의 첫 번째 요소를 가져오고 싶을 때 `first`를 사용하세요. 배열이 비어있거나 `null`, `undefined`인 경우 `undefined`를 반환해요.

```typescript
import { first } from 'es-toolkit/compat';

// 일반 배열에서 첫 번째 요소 가져오기
first([1, 2, 3]);
// Returns: 1

// 문자열 배열에서 첫 번째 요소 가져오기
first(['a', 'b', 'c']);
// Returns: 'a'

// 빈 배열
first([]);
// Returns: undefined
```

`null`이나 `undefined`는 `undefined`를 반환해요.

```typescript
import { first } from 'es-toolkit/compat';

first(null); // undefined
first(undefined); // undefined
```

배열 형태의 객체에서도 사용할 수 있어요.

```typescript
import { first } from 'es-toolkit/compat';

const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
first(arrayLike);
// Returns: 'a'

// 문자열도 배열처럼 처리됨
first('hello');
// Returns: 'h'
```

타입이 보장된 튜플에서는 정확한 타입을 반환해요.

```typescript
import { first } from 'es-toolkit/compat';

const tuple = [1, 'two', true] as const;
first(tuple);
// Returns: 1 (타입이 1로 추론됨)
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 첫 번째 요소를 가져올 배열이에요.

#### 반환 값

(`T | undefined`): 배열의 첫 번째 요소를 반환해요. 배열이 비어있거나 유효하지 않으면 `undefined`를 반환해요.
