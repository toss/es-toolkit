# allKeyed

Promiseのオブジェクトを並行して解決し、同じキーと解決された値を持つオブジェクトを返します。

```typescript
await allKeyed(tasks);
```

## 使い方

### `allKeyed(tasks)`

複数のPromiseを並行して実行し、位置インデックスではなく名前で結果にアクセスしたい場合に`allKeyed`を使用します。`Promise.all`と似ていますが、配列の代わりにオブジェクトのPromiseを受け取り、結果にキーを保持します。

[TC39 `Promise.allKeyed` 提案](https://github.com/tc39/proposal-await-dictionary)に基づいています。

```typescript
import { allKeyed } from 'es-toolkit/promise';

const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

プレーンな値もPromiseと一緒にサポートされています。

```typescript
const result = await allKeyed({
  a: Promise.resolve(1),
  b: 2,
});
// { a: 1, b: 2 }
```

配列の順序を気にせずに複数のリソースを並行して取得する場合にも便利です。

```typescript
// Promise.allでは順序を入れ替えると分割代入が静かに壊れます:
// const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

// allKeyedではキーが明示的なので順序バグがありません:
const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

#### パラメータ

- `tasks` (`T`): 並行して解決するPromise(またはプレーンな値)を値として持つオブジェクトです。

#### 戻り値

(`Promise<{ [K in keyof T]: Awaited<T[K]> }>`): 同じキーと解決された値を持つオブジェクトに解決されるPromiseを返します。
