# intersection (Lodash 호환성)

::: warning `es-toolkit`의 [intersection](../../array/intersection.md)을 사용하세요

이 `intersection` 함수는 `null`이나 `undefined` 처리, 다중 배열 지원, 중복 제거 과정으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [intersection](../../array/intersection.md)을 사용하세요.

:::

여러 배열의 교집합을 구해요.

```typescript
const result = intersection(...arrays);
```

## 사용법

### `intersection(...arrays)`

여러 배열에서 공통으로 존재하는 요소들을 찾아서 새 배열로 반환해요. 결과는 중복이 제거되고 첫 번째 배열의 순서를 유지해요.

```typescript
import { intersection } from 'es-toolkit/compat';

// 두 배열의 교집합
const array1 = [1, 2, 3, 4];
const array2 = [2, 3, 5, 6];
const result = intersection(array1, array2);
// result는 [2, 3]

// 세 개 배열의 교집합
const array3 = [3, 4, 7, 8];
const multiResult = intersection(array1, array2, array3);
// multiResult는 [3]

// 문자열 배열
const strings1 = ['a', 'b', 'c'];
const strings2 = ['b', 'c', 'd'];
const stringResult = intersection(strings1, strings2);
// stringResult는 ['b', 'c']

// 배열 형태 객체
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, 2: 4, length: 3 };
const likeResult = intersection(arrayLike1, arrayLike2);
// likeResult는 [2, 3]
```

`null`이나 `undefined` 배열은 빈 배열로 처리해요.

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3];
const result1 = intersection(array1, null);
// result1는 []

const result2 = intersection(null, undefined);
// result2는 []
```

중복된 요소가 있어도 결과에서는 제거돼요.

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 1, 2, 3];
const array2 = [1, 2, 2, 4];
const result = intersection(array1, array2);
// result는 [1, 2] (중복 제거됨)
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 교집합을 구할 배열들이에요. 배열 형태 객체나 null/undefined도 허용해요.

#### 반환 값

(`T[]`): 모든 배열에 공통으로 존재하는 요소들의 새 배열을 반환해요. 중복은 제거되고 첫 번째 배열의 순서를 따라요.
