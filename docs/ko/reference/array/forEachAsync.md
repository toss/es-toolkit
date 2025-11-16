# forEachAsync

배열의 각 요소에 대해 비동기 함수를 실행해요.

```typescript
await forEachAsync(array, callback);
```

## 레퍼런스

### `forEachAsync(array, callback, options?)`

배열의 각 요소에 대해 부수 효과를 일으키는 비동기 작업을 수행할 때 `forEachAsync`를 사용하세요. 일반 `forEach`와 달리 모든 비동기 작업이 완료될 때까지 기다리는 프로미스를 반환해요.

```typescript
import { forEachAsync } from 'es-toolkit/array';

// 모든 사용자 정보를 업데이트해요.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
await forEachAsync(users, async user => {
  await updateUser(user.id);
});
// 모든 사용자 업데이트가 완료되었어요.

// 동시 실행 수를 제한할 수 있어요.
const items = [1, 2, 3, 4, 5];
await forEachAsync(items, async item => await processItem(item), { concurrency: 2 });
// 최대 2개의 항목만 동시에 처리돼요.
```

`concurrency` 옵션으로 동시 실행 수를 제한해서 서버나 데이터베이스에 가해지는 부하를 조절할 수 있어요. 로그 기록, 파일 업로드, 데이터베이스 업데이트처럼 값을 반환하지 않는 작업에 유용해요.

```typescript
import { forEachAsync } from 'es-toolkit/array';

// 파일을 순차적으로 업로드해요.
const files = ['file1.txt', 'file2.txt', 'file3.txt'];
await forEachAsync(files, async file => await uploadFile(file), { concurrency: 1 });
// 한 번에 하나씩만 업로드돼요.
```

#### 파라미터

- `array` (`readonly T[]`): 반복할 배열이에요.
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<void>`): 각 요소에 대해 실행할 비동기 함수예요.
- `options` (`ForEachAsyncOptions`, 선택): 동시 실행을 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택): 동시에 실행할 수 있는 최대 작업 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

### 반환 값

(`Promise<void>`): 모든 작업이 완료되면 이행되는 프로미스를 반환해요.
