# findLastIndex (Lodash 호환성)

::: warning `Array.prototype.findLastIndex`를 사용하세요

이 `findLastIndex` 함수는 `null`이나 `undefined` 처리, 부분 객체 매칭, 프로퍼티 이름 매칭 등의 추가 기능으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.findLastIndex`를 사용하세요.

:::

배열에서 조건을 만족하는 마지막 요소의 인덱스를 찾아요.

```typescript
const lastIndex = findLastIndex(array, predicate, fromIndex);
```

## 레퍼런스

### `findLastIndex(array, predicate, fromIndex)`

배열의 끝에서부터 시작해서 주어진 조건과 일치하는 첫 번째 요소의 인덱스를 찾고 싶을 때 `findLastIndex`를 사용하세요. 조건을 만족하는 요소가 없으면 `-1`을 반환해요.

이 함수는 다양한 방식으로 조건을 지정할 수 있어요. 함수를 전달하면 각 요소에 대해 함수를 실행하고, 부분 객체를 전달하면 요소가 해당 속성들을 가지고 있는지 확인해요. 배열 형태의 키-값 쌍을 전달하면 특정 프로퍼티가 주어진 값과 일치하는지 확인하고, 문자열을 전달하면 해당 프로퍼티가 참으로 평가되는 값인지 확인해요.

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false }
];

// 함수를 사용해서 조건을 지정해요.
findLastIndex(users, o => o.user === 'pebbles');
// Returns: 2

// 부분 객체를 사용해서 일치하는 요소를 찾아요.
findLastIndex(users, { user: 'barney', active: true });
// Returns: 0

// 프로퍼티-값 쌍을 사용해서 일치하는 요소를 찾아요.
findLastIndex(users, ['active', false]);
// Returns: 2

// 프로퍼티 이름을 사용해서 참으로 평가되는 값을 가진 요소를 찾아요.
findLastIndex(users, 'active');
// Returns: 0
```

검색 시작 위치를 지정할 수도 있어요. `fromIndex`가 음수면 배열의 끝에서부터 계산해요.

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// 인덱스 3부터 역방향으로 검색해요.
findLastIndex(numbers, n => n < 4, 2);
// Returns: 2

// 음수 인덱스를 사용하면 끝에서부터 계산해요.
findLastIndex(numbers, n => n > 2, -2);
// Returns: 3
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { findLastIndex } from 'es-toolkit/compat';

findLastIndex(null, n => n > 0); // -1
findLastIndex(undefined, n => n > 0); // -1
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 검색할 배열이에요.
- `predicate` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 선택): 각 요소를 테스트할 조건이에요. 함수, 부분 객체, 프로퍼티-값 쌍, 또는 프로퍼티 이름을 사용할 수 있어요. 기본값은 항등 함수예요.
- `fromIndex` (`number`, 선택): 검색을 시작할 인덱스예요. 음수면 배열의 끝에서부터 계산해요. 기본값은 `array.length - 1`이에요.

### 반환 값

(`number`): 조건을 만족하는 마지막 요소의 인덱스를 반환해요. 조건을 만족하는 요소가 없으면 `-1`을 반환해요.
