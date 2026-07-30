# memoizePromise

Promise を返す関数をメモ化します。同じ引数で同時に呼び出された場合は、実行中の同じ Promise を共有します。Promise が解決されると、キャッシュには完了した Promise ではなく解決された値だけが保存されます。

```typescript
const memoizedFunc = memoizePromise(func, options);
```

## 使用法

### `memoizePromise(func, options?)`

同じ引数に対する非同期処理の重複実行を避けたい場合は `memoizePromise` を使用します。たとえば、同じ API リクエストが何度も発生するのを防げます。最初のリクエストが実行中の場合は同じ Promise を共有し、解決後はキャッシュされた値を使用します。

```typescript
import { memoizePromise } from 'es-toolkit/function';

const fetchUser = async (id: number) => {
  const response = await fetch(`/users/${id}`);
  return response.json();
};

const memoizedFetchUser = memoizePromise(fetchUser);

const first = memoizedFetchUser(1);
const second = memoizedFetchUser(1);

console.log(first === second); // true (リクエストの実行中)
console.log(await first); // リクエストの結果
console.log(await memoizedFetchUser(1)); // キャッシュされた結果
console.log(memoizedFetchUser.cache.get(1)); // Promise ではなく解決された値
```

拒否された Promise はキャッシュされません。呼び出しが失敗した場合、同じキーで次に呼び出すと関数が再度実行されます。

```typescript
const memoizedFetch = memoizePromise(async (id: number) => {
  return fetchUser(id);
});

try {
  await memoizedFetch(1);
} catch {
  // 失敗した呼び出しはキャッシュから削除されます。
}

await memoizedFetch(1); // 再試行します
```

プリミティブではない引数に対しては、キャッシュキーを生成する関数を指定できます。

```typescript
const memoizedFetch = memoizePromise(async (user: { id: number; name: string }) => fetchUser(user.id), {
  getCacheKey: user => user.id,
});

await memoizedFetch({ id: 1, name: 'Ada' });
await memoizedFetch({ id: 1, name: 'Grace' }); // キャッシュされた結果を使用します
```

#### パラメータ

- `func` (`F`): メモ化する Promise を返す関数です。引数を取らないか、1つの引数だけを取る必要があります。
- `options` (`object`, オプション): メモ化のオプションです。
  - `cache` (`MemoizeCache<any, Awaited<ReturnType<F>>>`, オプション): 解決された値を保存するキャッシュです。デフォルトは新しい `Map` です。
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, オプション): 引数からキャッシュキーを生成する関数です。デフォルトでは引数自体をキーとして使用します。

#### 戻り値

(`F & { cache: MemoizeCache<any, Awaited<ReturnType<F>>> }`): 解決された値を保持する `cache` プロパティが追加されたメモ化関数です。
