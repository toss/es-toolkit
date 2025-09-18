# findLastKey (Lodash 호환성)

::: warning `Array.findLast()`와 `Object.keys()`를 사용하세요

이 `findLastKey` 함수는 다양한 조건 타입 처리와 호환성 로직으로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `Array.findLast()`와 `Object.keys()`를 사용하세요.

:::

조건에 맞는 마지막 요소의 키를 뒤에서부터 찾아요.

```typescript
const key = findLastKey(obj, predicate);
```

## 레퍼런스

### `findLastKey(obj, predicate)`

객체에서 조건에 맞는 마지막 요소의 키를 찾을 때 `findLastKey`를 사용하세요. `findKey`와 반대로 뒤에서부터 검색해요. 함수, 객체, 배열, 문자열 등 다양한 형태의 조건을 사용할 수 있어요.

```typescript
import { findLastKey } from 'es-toolkit/compat';

// 함수 조건으로 키 찾기
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true }
};

findLastKey(users, user => user.active);
// 반환값: 'charlie' (뒤에서부터 찾은 첫 번째 active: true)

// 객체 조건으로 키 찾기
findLastKey(users, { active: true });
// 반환값: 'charlie'

// 속성 경로로 키 찾기
findLastKey(users, 'active');
// 반환값: 'charlie'

// 속성-값 배열로 키 찾기
findLastKey(users, ['active', false]);
// 반환값: 'bob'
```

조건에 맞는 요소가 없으면 `undefined`를 반환해요.

```typescript
import { findLastKey } from 'es-toolkit/compat';

findLastKey({ a: 1, b: 2 }, value => value > 5);
// 반환값: undefined
```

#### 파라미터

- `obj` (`T | null | undefined`): 검색할 객체예요.
- `predicate` (`ObjectIteratee<T>`, 선택): 각 요소에 적용할 조건이에요. 함수, 객체, 배열, 문자열이 될 수 있어요.

### 반환 값

(`string | undefined`): 조건에 맞는 마지막 요소의 키를 반환해요. 없으면 `undefined`를 반환해요.
