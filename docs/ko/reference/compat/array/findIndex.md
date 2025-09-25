# findIndex (Lodash 호환성)

::: warning `Array.prototype.findIndex`를 사용하세요

이 `findIndex` 함수는 다양한 조건 형식 처리, `fromIndex` 처리 등의 추가 기능으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.findIndex`를 사용하세요.

:::

배열에서 조건에 맞는 첫 번째 요소의 인덱스를 찾아요.

```typescript
const index = findIndex(arr, doesMatch, fromIndex);
```

## 레퍼런스

### `findIndex(arr, doesMatch, fromIndex)`

배열에서 특정 조건에 맞는 첫 번째 요소의 위치를 찾고 싶을 때 `findIndex`를 사용하세요. 다양한 방식으로 조건을 지정할 수 있어요. 조건에 맞는 요소가 없으면 `-1`을 반환해요.

함수로 조건을 지정하면 각 요소에 대해 함수를 실행하고 참을 반환하는 첫 번째 요소의 인덱스를 반환해요.

```typescript
import { findIndex } from 'es-toolkit/compat';

const users = [
  { id: 1, name: 'Alice', active: false },
  { id: 2, name: 'Bob', active: true },
  { id: 3, name: 'Charlie', active: true },
];

// 함수로 조건 지정
findIndex(users, user => user.active);
// Returns: 1
```

부분 객체로 조건을 지정하면 해당 속성들이 일치하는 첫 번째 요소의 인덱스를 반환해요.

```typescript
import { findIndex } from 'es-toolkit/compat';

// 부분 객체로 조건 지정
findIndex(users, { name: 'Bob', active: true });
// Returns: 1
```

속성 이름과 값의 배열로 조건을 지정하면 해당 속성이 그 값과 일치하는 첫 번째 요소의 인덱스를 반환해요.

```typescript
import { findIndex } from 'es-toolkit/compat';

// [속성명, 값] 배열로 조건 지정
findIndex(users, ['active', true]);
// Returns: 1
```

속성 이름만 지정하면 해당 속성이 참으로 평가되는 첫 번째 요소의 인덱스를 반환해요.

```typescript
import { findIndex } from 'es-toolkit/compat';

// 속성 이름으로 조건 지정
findIndex(users, 'active');
// Returns: 1
```

`fromIndex`를 지정하면 해당 인덱스부터 검색을 시작해요. 음수 값을 사용하면 배열 끝에서부터 계산해요.

```typescript
import { findIndex } from 'es-toolkit/compat';

// 인덱스 2부터 검색 시작
findIndex(users, user => user.active, 2);
// Returns: 2

// 배열 끝에서 두 번째부터 검색
findIndex(users, user => user.active, -2);
// Returns: 1
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { findIndex } from 'es-toolkit/compat';

findIndex(null, user => user.active); // -1
findIndex(undefined, 'active'); // -1
```

#### 파라미터

- `arr` (`ArrayLike<T> | null | undefined`): 검색할 배열이에요.
- `doesMatch` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 선택): 일치 조건이에요. 함수, 부분 객체, 키-값 쌍, 또는 속성 이름이 될 수 있어요.
- `fromIndex` (`number`, 선택): 검색을 시작할 인덱스예요. 기본값은 `0`이에요.

#### 반환 값

(`number`): 조건에 맞는 첫 번째 요소의 인덱스를 반환해요. 조건에 맞는 요소가 없으면 `-1`을 반환해요.
