# memoizePromise

对返回 Promise 的函数进行记忆化。同一参数的并发调用会共享同一个正在执行的 Promise。Promise 解决后,缓存中只保存解决后的值,而不是已完成的 Promise。

```typescript
const memoizedFunc = memoizePromise(func, options);
```

## 用法

### `memoizePromise(func, options?)`

当您想避免相同参数导致的重复异步操作时,请使用 `memoizePromise`,例如避免重复发送相同的 API 请求。第一次请求进行期间的调用会共享同一个 Promise,请求完成后会使用缓存的值。

```typescript
import { memoizePromise } from 'es-toolkit/function';

const fetchUser = async (id: number) => {
  const response = await fetch(`/users/${id}`);
  return response.json();
};

const memoizedFetchUser = memoizePromise(fetchUser);

const first = memoizedFetchUser(1);
const second = memoizedFetchUser(1);

console.log(first === second); // true (请求进行期间)
console.log(await first); // 请求结果
console.log(await memoizedFetchUser(1)); // 缓存的结果
console.log(memoizedFetchUser.cache.get(1)); // 已解决的值,而不是 Promise
```

被拒绝的 Promise 不会被缓存。如果调用失败,下次使用相同键调用时会再次执行函数。

```typescript
const memoizedFetch = memoizePromise(async (id: number) => {
  return fetchUser(id);
});

try {
  await memoizedFetch(1);
} catch {
  // 失败的调用会从缓存中移除。
}

await memoizedFetch(1); // 再次尝试
```

对于非原始类型的参数,可以指定用于生成缓存键的函数。

```typescript
const memoizedFetch = memoizePromise(async (user: { id: number; name: string }) => fetchUser(user.id), {
  getCacheKey: user => user.id,
});

await memoizedFetch({ id: 1, name: 'Ada' });
await memoizedFetch({ id: 1, name: 'Grace' }); // 使用缓存的结果
```

#### 参数

- `func` (`F`): 要记忆化的 Promise 返回函数。必须不接收参数或只接收一个参数。
- `options` (`object`, 可选): 记忆化选项。
  - `cache` (`MemoizeCache<any, ReturnType<F> | Awaited<ReturnType<F>>>`, 可选): 用于保存进行中的 `Promise` 和解决后值的缓存。默认为新的 `Map`。
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, 可选): 从参数生成缓存键的函数。默认使用参数本身作为键。

#### 返回值

(`F & { cache: MemoizeCache<any, ReturnType<F> | Awaited<ReturnType<F>>> }`): 返回带有 `cache` 属性的记忆化函数,其中包含进行中的 `Promise` 或解决后的值。
