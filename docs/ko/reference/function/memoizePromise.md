# memoizePromise

Promise를 반환하는 함수를 메모이제이션해요. 같은 인수로 동시에 호출하면 실행 중인 동일한 Promise를 함께 사용해요. Promise가 완료되면 캐시에는 완료된 Promise 대신 해결된 값만 저장돼요.

```typescript
const memoizedFunc = memoizePromise(func, options);
```

## 사용법

### `memoizePromise(func, options?)`

같은 인수에 대한 비동기 작업의 중복 실행을 피하고 싶을 때 `memoizePromise`를 사용하세요. 예를 들어 같은 API 요청이 여러 번 발생하는 것을 막을 수 있어요. 첫 번째 요청이 진행 중일 때 호출하면 동일한 Promise를 공유하고, 요청이 완료된 후에는 캐시된 값을 사용해요.

```typescript
import { memoizePromise } from 'es-toolkit/function';

const fetchUser = async (id: number) => {
  const response = await fetch(`/users/${id}`);
  return response.json();
};

const memoizedFetchUser = memoizePromise(fetchUser);

const first = memoizedFetchUser(1);
const second = memoizedFetchUser(1);

console.log(first === second); // true (요청이 진행 중일 때)
console.log(await first); // 요청 결과
console.log(await memoizedFetchUser(1)); // 캐시된 결과
console.log(memoizedFetchUser.cache.get(1)); // Promise가 아닌 해결된 값
```

거부된 Promise는 캐시되지 않아요. 호출이 실패하면 같은 키로 다음 호출을 할 때 함수를 다시 실행해요.

```typescript
const memoizedFetch = memoizePromise(async (id: number) => {
  return fetchUser(id);
});

try {
  await memoizedFetch(1);
} catch {
  // 실패한 호출은 캐시에서 제거돼요.
}

await memoizedFetch(1); // 다시 시도해요.
```

기본 키로 사용할 수 없는 객체 인수를 위해 캐시 키를 만드는 함수를 지정할 수 있어요.

```typescript
const memoizedFetch = memoizePromise(async (user: { id: number; name: string }) => fetchUser(user.id), {
  getCacheKey: user => user.id,
});

await memoizedFetch({ id: 1, name: 'Ada' });
await memoizedFetch({ id: 1, name: 'Grace' }); // 캐시된 결과를 사용해요.
```

#### 파라미터

- `func` (`F`): 메모이제이션할 Promise 반환 함수예요. 인수를 받지 않거나 하나의 인수만 받아야 해요.
- `options` (`object`, 선택): 메모이제이션 옵션이에요.
  - `cache` (`MemoizeCache<any, Awaited<ReturnType<F>>>`, 선택): 해결된 값을 저장할 캐시예요. 기본값은 새로운 `Map`이에요.
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, 선택): 인수에서 캐시 키를 만드는 함수예요. 기본값은 인수 자체를 키로 사용해요.

#### 반환 값

(`F & { cache: MemoizeCache<any, Awaited<ReturnType<F>>> }`): 해결된 값을 포함하는 `cache` 속성이 추가된 메모이제이션 함수예요.
