# transform (Lodash 호환성)

::: warning `reduce`나 `Object.entries`를 사용하세요

이 `transform` 함수는 복잡한 내부 로직으로 인해 느리게 동작해요. 대부분의 경우 JavaScript의 내장 메서드로 더 간단하게 구현할 수 있어요.

대신 더 빠르고 현대적인 `reduce`나 `Object.entries`를 사용하세요.

:::

배열이나 객체를 순회하면서 누적기를 사용해 새로운 값을 만들어요.

```typescript
const result = transform(object, iteratee, accumulator);
```

## 레퍼런스

### `transform(object, iteratee, accumulator)`

배열이나 객체의 각 요소를 순회하면서 누적기에 값을 쌓아가고 싶을 때 `transform`을 사용하세요. `iteratee` 함수가 `false`를 반환하면 순회를 중단해요.

```typescript
import { transform } from 'es-toolkit/compat';

// 배열을 변환해요
const numbers = [2, 3, 4];
const doubled = transform(
  numbers,
  (acc, value) => {
    acc.push(value * 2);
  },
  []
);
// Returns: [4, 6, 8]

// 객체를 변환해요
const obj = { a: 1, b: 2, c: 1 };
const grouped = transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
);
// Returns: { '1': ['a', 'c'], '2': ['b'] }
```

누적기를 생략하면 자동으로 빈 배열이나 빈 객체를 만들어줘요.

```typescript
import { transform } from 'es-toolkit/compat';

// 배열인 경우 빈 배열이 만들어져요
const result1 = transform([1, 2, 3], (acc, value) => {
  acc.push(value * 2);
});
// Returns: [2, 4, 6]

// 객체인 경우 빈 객체가 만들어져요
const result2 = transform({ a: 1, b: 2 }, (acc, value, key) => {
  acc[key] = value * 2;
});
// Returns: { a: 2, b: 4 }
```

`iteratee` 함수에서 `false`를 반환하면 순회를 중단할 수 있어요.

```typescript
import { transform } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
const result = transform(
  numbers,
  (acc, value) => {
    if (value > 3) {
      return false; // 순회 중단
    }
    acc.push(value * 2);
  },
  []
);
// Returns: [2, 4, 6] (4와 5는 처리되지 않음)
```

`iteratee` 함수를 생략하면 빈 객체나 빈 배열을 반환해요.

```typescript
import { transform } from 'es-toolkit/compat';

const array = [1, 2, 3];
const copy1 = transform(array);
// Returns: []

const obj = { a: 1, b: 2 };
const copy2 = transform(obj);
// Returns: {}
```

#### 파라미터

- `object` (`readonly T[] | T`, 선택): 순회할 배열이나 객체예요.
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: readonly T[] | T) => unknown`, 선택): 각 요소마다 실행할 함수예요. `false`를 반환하면 순회를 중단해요. 기본값은 `identity` 함수예요.
- `accumulator` (`U`, 선택): 초기값이에요. 생략하면 배열은 빈 배열, 객체는 빈 객체가 만들어져요.

#### 반환 값

(`U | any[] | Record<string, any>`): 누적된 결과값을 반환해요.
