# toPairs (Lodash 호환성)

::: warning `Object.entries`를 사용하세요

이 `toPairs` 함수는 `Map`과 `Set` 처리, 배열형 객체 처리 등의 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.entries()`를 사용하세요.

:::

객체를 키-값 쌍의 배열로 변환해요.

```typescript
const pairs = toPairs(object);
```

## 레퍼런스

### `toPairs(object)`

객체의 자체 열거 가능한 속성들을 `[키, 값]` 형태의 배열로 변환하고 싶을 때 `toPairs`를 사용하세요. 상속된 속성은 포함되지 않아요.

```typescript
import { toPairs } from 'es-toolkit/compat';

// 기본 객체 변환
const object = { a: 1, b: 2, c: 3 };
toPairs(object);
// => [['a', 1], ['b', 2], ['c', 3]]

// 숫자 키를 가진 객체
const numbers = { 0: 'zero', 1: 'one', 2: 'two' };
toPairs(numbers);
// => [['0', 'zero'], ['1', 'one'], ['2', 'two']]
```

`Map`과 `Set`도 처리할 수 있어요.

```typescript
import { toPairs } from 'es-toolkit/compat';

// Map 객체 변환
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
toPairs(map);
// => [['name', 'John'], ['age', 30]]

// Set 객체 변환 (값이 키와 동일)
const set = new Set([1, 2, 3]);
toPairs(set);
// => [[1, 1], [2, 2], [3, 3]]
```

`null`이나 `undefined`를 안전하게 처리해요.

```typescript
import { toPairs } from 'es-toolkit/compat';

toPairs(null);
// => []

toPairs(undefined);
// => []
```

#### 파라미터

- `object` (`object`): 변환할 객체, Map, 또는 Set이에요.

#### 반환 값

(`Array<[string, any]>`): 키-값 쌍들의 배열을 반환해요.
