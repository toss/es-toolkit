# findLast (Lodash 호환성)

::: warning `Array.prototype.findLast`를 사용하세요

이 `findLast` 함수는 다양한 타입과 특수한 조건 처리로 인해 복잡하고 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.findLast`를 사용하세요.

:::

배열이나 객체에서 조건을 만족하는 마지막 요소를 찾아요.

```typescript
const lastEven = findLast(array, predicate);
```

## 레퍼런스

### `findLast(collection, predicate?, fromIndex?)`

배열이나 객체에서 주어진 조건을 만족하는 마지막 요소를 찾아요. 배열의 끝에서부터 역순으로 검색하며, 조건을 만족하는 첫 번째 요소를 반환해요.

```typescript
import { findLast } from 'es-toolkit/compat';

// 함수로 조건 지정
const users = [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }, { user: 'pebbles', age: 18 }];
findLast(users, o => o.age < 40);
// => { user: 'pebbles', age: 18 }

// 객체로 조건 지정
findLast(users, { age: 36 });
// => { user: 'barney', age: 36 }

// 키-값 쌍으로 조건 지정
findLast(users, ['age', 18]);
// => { user: 'pebbles', age: 18 }

// 속성 이름으로 조건 지정 (참으로 평가되는 값을 가진 마지막 요소)
findLast(users, 'age');
// => { user: 'fred', age: 40 }
```

검색 시작 인덱스를 지정할 수도 있어요.

```typescript
import { findLast } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
findLast(numbers, n => n > 3, 6);  // 인덱스 6부터 역순 검색
// => 4
```

`null`이나 `undefined`는 빈 결과를 반환해요.

```typescript
import { findLast } from 'es-toolkit/compat';

findLast(null, x => x > 0); // undefined
findLast(undefined, x => x > 0); // undefined
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): 검색할 배열이나 객체예요.
- `predicate` (`ListIterateeCustom<T, boolean>`, 선택): 각 요소에 적용할 조건이에요. 함수, 객체, 키-값 쌍, 또는 속성 이름을 사용할 수 있어요. 기본값은 `identity` 함수예요.
- `fromIndex` (`number`, 선택): 검색을 시작할 인덱스예요. 음수인 경우 끝에서부터 계산해요. 기본값은 배열의 마지막 인덱스예요.

### 반환 값

(`T | undefined`): 조건을 만족하는 마지막 요소를 반환해요. 조건을 만족하는 요소가 없으면 `undefined`를 반환해요.
