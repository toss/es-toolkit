# reverse (Lodash 호환성)

::: warning `Array.prototype.reverse()`를 사용하세요

이 `reverse` 함수는 Lodash와의 호환성을 위해 `null`이나 `undefined` 처리를 포함하고 있어요. 간단한 배열 역순 정렬만 필요하다면 네이티브 JavaScript의 `Array.prototype.reverse()` 메서드가 더 직관적이고 빠르게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.reverse()`를 사용하세요.

:::

배열의 요소들을 제자리에서 반전시켜요.

```typescript
const reversed = reverse(array);
```

## 레퍼런스

### `reverse(array)`

배열의 순서를 뒤바꿔서 첫 번째 요소가 마지막이 되고, 마지막 요소가 첫 번째가 되도록 해요. 원본 배열을 직접 수정하며 수정된 배열을 반환해요.

```typescript
import { reverse } from 'es-toolkit/compat';

// 숫자 배열을 반전시켜요
const numbers = [1, 2, 3, 4, 5];
const reversed = reverse(numbers);
console.log(numbers); // => [5, 4, 3, 2, 1]
console.log(reversed); // => [5, 4, 3, 2, 1]

// 문자열 배열을 반전시켜요
const words = ['apple', 'banana', 'cherry'];
reverse(words);
console.log(words); // => ['cherry', 'banana', 'apple']

// 빈 배열이나 null/undefined는 그대로 반환해요
reverse([]); // => []
reverse(null); // => null
reverse(undefined); // => undefined
```

이 함수는 원본 배열을 직접 수정한다는 점에 주의해야 해요.

```typescript
import { reverse } from 'es-toolkit/compat';

const original = [1, 2, 3];
const result = reverse(original);

console.log(original === result); // => true (같은 배열 객체)
console.log(original); // => [3, 2, 1] (원본이 수정됨)
```

#### 파라미터

- `array` (`T[] | null | undefined`): 반전할 배열이에요. `null`이나 `undefined`인 경우 그대로 반환해요.

### 반환 값

(`T[] | null | undefined`): 반전된 배열을 반환해요. 입력이 `null`이나 `undefined`인 경우 그 값을 그대로 반환해요.
