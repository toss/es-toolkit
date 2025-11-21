# flatMapAsync

배열의 각 요소를 비동기 함수로 변환하고, 결과를 한 단계 평탄화해서 새로운 배열을 반환해요.

```typescript
const result = await flatMapAsync(array, callback);
```

## 레퍼런스

### `flatMapAsync(array, callback, options?)`

각 요소가 여러 값을 반환하는 비동기 변환을 수행할 때 `flatMapAsync`를 사용하세요. `mapAsync`를 호출한 후 `flat()`을 실행하는 것과 같지만, 더 효율적이에요.

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// 각 사용자의 게시글을 가져와서 하나의 배열로 합쳐요.
const users = [{ id: 1 }, { id: 2 }];
const allPosts = await flatMapAsync(users, async user => {
  return await fetchUserPosts(user.id);
});
// 반환: [post1, post2, post3, ...] (모든 사용자의 게시글이 하나의 배열로)

// 동시 실행 수를 제한할 수 있어요.
const numbers = [1, 2, 3];
const results = await flatMapAsync(numbers, async n => await fetchRelatedItems(n), { concurrency: 2 });
// 최대 2개의 작업만 동시에 실행돼요.
```

각 콜백 함수는 배열을 반환해야 하고, 반환된 모든 배열이 하나의 배열로 합쳐져요. `concurrency` 옵션으로 동시 실행 수를 제한해서 서버 부하를 관리할 수 있어요.

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// 각 카테고리의 상품 목록을 가져와서 하나의 배열로 만들어요.
const categories = ['electronics', 'books', 'clothing'];
const products = await flatMapAsync(categories, async category => await fetchProducts(category), { concurrency: 2 });
// 반환: 모든 카테고리의 상품이 담긴 하나의 배열
```

#### 파라미터

- `array` (`readonly T[]`): 변환할 배열이에요.
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R[]>`): 각 요소를 배열로 변환하는 비동기 함수예요.
- `options` (`FlatMapAsyncOptions`, 선택): 동시 실행을 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택): 동시에 실행할 수 있는 최대 작업 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

#### 반환 값

(`Promise<R[]>`): 변환된 값들이 한 단계 평탄화된 배열의 프로미스를 반환해요.
