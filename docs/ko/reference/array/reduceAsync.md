# reduceAsync

배열을 비동기 리듀서 함수로 단일 값으로 합쳐요.

```typescript
const result = await reduceAsync(array, reducer, initialValue);
```

## 레퍼런스

### `reduceAsync(array, reducer, initialValue)`

배열의 각 요소를 순차적으로 처리해서 하나의 값으로 합칠 때 `reduceAsync`를 사용하세요. 리듀서 함수는 왼쪽에서 오른쪽으로 각 요소에 순차적으로 적용되며, 이전 호출의 누적 결과를 다음 호출로 전달해요.

```typescript
import { reduceAsync } from 'es-toolkit/array';

// 각 숫자에 대해 비동기 값을 가져와서 합산해요.
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + (await fetchValue(n)), 0);
// 반환: 모든 가져온 값의 합계

// 배열을 객체로 변환해요.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userMap = await reduceAsync(
  users,
  async (acc, user) => {
    const details = await fetchUserDetails(user.id);
    acc[user.id] = details;
    return acc;
  },
  {} as Record<number, any>
);
// 반환: { 1: {...}, 2: {...}, 3: {...} }
```

다른 비동기 배열 메서드와 달리 `reduceAsync`는 각 요소를 순차적으로 처리해야 하므로 동시 실행을 지원하지 않아요. 이전 단계의 결과가 다음 단계에 필요하기 때문이에요.

#### 파라미터

- `array` (`readonly T[]`): 합칠 배열이에요.
- `reducer` (`(accumulator: U, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<U>`): 각 요소를 처리하는 비동기 함수예요. 누적된 값과 현재 값을 받아서 새로운 누적 값을 반환해요.
- `initialValue` (`U`): 누적 값의 초기값이에요.

### 반환 값

(`Promise<U>`): 최종 누적 값의 프로미스를 반환해요.

---

### `reduceAsync(array, reducer)`

초기값 없이 배열을 합칠 때는 첫 번째 요소가 초기값으로 사용되고, 두 번째 요소부터 리듀서 함수가 적용돼요.

```typescript
import { reduceAsync } from 'es-toolkit/array';

// 초기값 없이 합계 계산해요.
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + n);
// 반환: 15 (1 + 2 + 3 + 4 + 5)

// 빈 배열은 undefined를 반환해요.
const emptyArray: number[] = [];
const result = await reduceAsync(emptyArray, async (acc, n) => acc + n);
// 반환: undefined
```

빈 배열에 초기값 없이 `reduceAsync`를 호출하면 `undefined`를 반환해요.

#### 파라미터

- `array` (`readonly T[]`): 합칠 배열이에요.
- `reducer` (`(accumulator: T, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<T>`): 각 요소를 처리하는 비동기 함수예요. 누적된 값과 현재 값을 받아서 새로운 누적 값을 반환해요.

### 반환 값

(`Promise<T | undefined>`): 최종 누적 값의 프로미스를 반환해요. 배열이 비어있으면 `undefined`를 반환해요.
