# initial (Lodash 호환성)

::: warning `es-toolkit`의 [initial](../../array/initial.md)을 사용하세요

이 `initial` 함수는 `ArrayLike` 객체 처리와 배열 변환 과정으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [initial](../../array/initial.md)을 사용하세요.

:::

배열에서 마지막 요소를 제외한 모든 요소를 새 배열로 반환해요.

```typescript
const result = initial(array);
```

## 레퍼런스

### `initial(array)`

배열이나 배열 형태 객체에서 마지막 요소를 제외한 모든 요소를 포함하는 새 배열을 반환해요. 배열이 비어있거나 요소가 하나뿐이면 빈 배열을 반환해요.

```typescript
import { initial } from 'es-toolkit/compat';

// 숫자 배열에서 마지막 요소 제외
const numbers = [1, 2, 3, 4];
const result = initial(numbers);
// result는 [1, 2, 3]

// 문자열 배열에서 마지막 요소 제외
const strings = ['a', 'b', 'c', 'd'];
const withoutLast = initial(strings);
// withoutLast는 ['a', 'b', 'c']

// 배열 형태 객체
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const items = initial(arrayLike);
// items는 ['x', 'y']
```

빈 배열이나 유효하지 않은 입력은 빈 배열을 반환해요.

```typescript
import { initial } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const result = initial(emptyArray);
// result는 []

const singleItem = [42];
const onlyOne = initial(singleItem);
// onlyOne은 []

initial(null); // []
initial(undefined); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 마지막 요소를 제외할 배열이나 배열 형태 객체예요.

#### 반환 값

(`T[]`): 마지막 요소를 제외한 새 배열을 반환해요.
