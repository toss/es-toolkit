# allKeyed

Promiseのオブジェクトを並行して解決し、同じキーと解決された値を持つオブジェクトを返します。

`Promise.all`と似ていますが、配列の代わりにオブジェクトのPromiseを受け取り、結果にキーを保持します。位置インデックスに頼らずに、名前で解決された値を分割代入できます。

[TC39 `Promise.allKeyed` 提案](https://github.com/tc39/proposal-await-dictionary)に基づいています。

## インターフェース

```typescript
function allKeyed<T extends Record<string, unknown>>(
  tasks: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>;
```

### パラメータ

- `tasks` (`T`): 並行して解決するPromise(またはプレーンな値)を値として持つオブジェクトです。

### 戻り値

(`Promise<{ [K in keyof T]: Awaited<T[K]> }>`): 同じキーと解決された値を持つオブジェクトに解決されるPromiseを返します。

## 例

```typescript
import { allKeyed } from 'es-toolkit/promise';

const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});

// プレーンな値もサポートされています
const result = await allKeyed({
  a: Promise.resolve(1),
  b: 2,
});
// { a: 1, b: 2 }
```
