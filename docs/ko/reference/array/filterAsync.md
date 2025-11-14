# filterAsync

배열의 각 요소를 비동기 조건 함수로 검사해서, 조건을 만족하는 요소들만 포함하는 새로운 배열을 반환해요.

```typescript
const filtered = await filterAsync(array, predicate);
```

## 레퍼런스

### `filterAsync(array, predicate, options?)`

API 호출이나 데이터베이스 조회 같은 비동기 작업으로 배열을 필터링할 때 `filterAsync`를 사용하세요. 일반 `filter`와 달리 비동기 조건 함수를 지원하고, `concurrency` 옵션으로 동시 실행 수를 제한할 수 있어요.

```typescript
import { filterAsync } from 'es-toolkit/array';

// 사용자 상태를 API로 확인해서 활성 사용자만 필터링해요.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const activeUsers = await filterAsync(users, async user => {
  return await checkUserStatus(user.id);
});
// 반환: 활성 상태인 사용자들만 포함된 배열

// 동시 실행 수를 제한해서 서버 부하를 줄일 수 있어요.
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = await filterAsync(numbers, async n => await isEvenAsync(n), { concurrency: 2 });
// 최대 2개의 작업만 동시에 실행돼요.
```

`concurrency` 옵션을 사용하면 외부 API 호출 횟수를 제한하거나 시스템 리소스를 효율적으로 관리할 수 있어요. 옵션을 지정하지 않으면 모든 작업이 동시에 실행돼요.

```typescript
import { filterAsync } from 'es-toolkit/array';

// 동시에 최대 3개의 API 호출만 실행해요.
const items = await filterAsync(largeArray, async item => await validateItem(item), { concurrency: 3 });
```

#### 파라미터

- `array` (`readonly T[]`): 필터링할 배열이에요.
- `predicate` (`(item: T, index: number, array: readonly T[]) => Promise<boolean>`): 각 요소를 검사하는 비동기 함수예요. 참으로 평가되는 값을 반환하면 해당 요소가 결과에 포함돼요.
- `options` (`FilterAsyncOptions`, 선택): 동시 실행을 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택): 동시에 실행할 수 있는 최대 작업 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

### 반환 값

(`Promise<T[]>`): 조건 함수가 참으로 평가되는 값을 반환한 요소들만 포함하는 새로운 배열의 프로미스를 반환해요.
