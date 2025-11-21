# mapAsync

배열의 각 요소를 비동기 함수로 변환해서 새로운 배열을 반환해요.

```typescript
const transformed = await mapAsync(array, callback);
```

## 레퍼런스

### `mapAsync(array, callback, options?)`

배열의 각 요소에 대해 비동기 변환 작업을 수행할 때 `mapAsync`를 사용하세요. API 호출이나 데이터베이스 조회처럼 각 요소를 비동기적으로 처리해야 할 때 유용해요.

```typescript
import { mapAsync } from 'es-toolkit/array';

// 각 사용자의 상세 정보를 가져와요.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userDetails = await mapAsync(users, async user => {
  return await fetchUserDetails(user.id);
});
// 반환: [{ id: 1, name: '...' }, { id: 2, name: '...' }, { id: 3, name: '...' }]

// 동시 실행 수를 제한할 수 있어요.
const numbers = [1, 2, 3, 4, 5];
const results = await mapAsync(numbers, async n => await slowOperation(n), { concurrency: 2 });
// 최대 2개의 작업만 동시에 실행돼요.
```

`concurrency` 옵션으로 동시 실행 수를 제한해서 서버 부하를 조절하거나 API 속도 제한을 지킬 수 있어요. 옵션을 지정하지 않으면 모든 작업이 동시에 실행돼요.

```typescript
import { mapAsync } from 'es-toolkit/array';

// 대량의 이미지를 변환하되, 서버 부하를 고려해서 동시 처리 수를 제한해요.
const imageUrls = [...]; // 많은 이미지 URL들
const processedImages = await mapAsync(
  imageUrls,
  async (url) => await processImage(url),
  { concurrency: 5 }
);
// 한 번에 최대 5개의 이미지만 처리돼요.
```

#### 파라미터

- `array` (`readonly T[]`): 변환할 배열이에요.
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R>`): 각 요소를 변환하는 비동기 함수예요.
- `options` (`MapAsyncOptions`, 선택): 동시 실행을 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택): 동시에 실행할 수 있는 최대 작업 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

#### 반환 값

(`Promise<R[]>`): 변환된 값들로 이루어진 새로운 배열의 프로미스를 반환해요.
