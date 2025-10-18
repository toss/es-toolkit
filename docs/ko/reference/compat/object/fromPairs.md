# fromPairs (Lodash 호환성)

::: warning `Object.fromEntries`를 사용하세요

이 `fromPairs` 함수는 배열 유사 객체 체크와 반복 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.fromEntries`를 사용하세요.

:::

키-값 쌍의 배열을 객체로 변환해요.

```typescript
const result = fromPairs(pairs);
```

## 레퍼런스

### `fromPairs(pairs)`

키-값 쌍으로 이루어진 배열을 받아서 객체로 변환해요. 각 키-값 쌍은 2개 요소를 가진 배열이어야 해요. 첫 번째 요소는 키가 되고, 두 번째 요소는 값이 돼요. 데이터를 정리하거나 변환할 때 유용해요.

```typescript
import { fromPairs } from 'es-toolkit/compat';

// 기본 키-값 쌍 변환
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// 결과: { a: 1, b: 2, c: 3 }

// 다양한 값 타입 처리
const mixedPairs = [
  ['name', 'John'],
  ['age', 30],
  ['active', true],
];
const user = fromPairs(mixedPairs);
// 결과: { name: 'John', age: 30, active: true }

// Map에서 변환
const map = new Map([
  ['x', 10],
  ['y', 20],
]);
const coords = fromPairs(map);
// 결과: { x: 10, y: 20 }
```

`null`이나 `undefined`, 배열 유사 객체가 아닌 값은 빈 객체로 처리해요.

```typescript
import { fromPairs } from 'es-toolkit/compat';

fromPairs(null); // {}
fromPairs(undefined); // {}
fromPairs('invalid'); // {}
```

#### 파라미터

- `pairs` (`ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined`): 객체로 변환할 키-값 쌍의 배열이에요.

#### 반환 값

(`Record<string, any> | Record<string, T>`): 키-값 쌍으로부터 생성된 객체를 반환해요.
