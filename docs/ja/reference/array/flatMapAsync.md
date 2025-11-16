# flatMapAsync

非同期関数を使用して配列の各要素を変換し、結果を1レベル平坦化して新しい配列を返します。

```typescript
const result = await flatMapAsync(array, callback);
```

## 参照

### `flatMapAsync(array, callback, options?)`

各要素が複数の値を返す非同期変換を実行する場合は、`flatMapAsync`を使用してください。`mapAsync`を呼び出した後に`flat()`を実行するのと同等ですが、より効率的です。

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// 各ユーザーの投稿を取得して1つの配列に結合します。
const users = [{ id: 1 }, { id: 2 }];
const allPosts = await flatMapAsync(users, async user => {
  return await fetchUserPosts(user.id);
});
// 返り値：[post1, post2, post3, ...]（すべてのユーザーの投稿が1つの配列に）

// 並行実行数を制限します。
const numbers = [1, 2, 3];
const results = await flatMapAsync(numbers, async n => await fetchRelatedItems(n), { concurrency: 2 });
// 最大2つの操作のみが同時に実行されます。
```

各コールバック関数は配列を返す必要があり、返されたすべての配列が1つの配列にマージされます。`concurrency`オプションを使用すると、並行実行を制限してサーバー負荷を管理できます。

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// 各カテゴリーの商品リストを取得して1つの配列にします。
const categories = ['electronics', 'books', 'clothing'];
const products = await flatMapAsync(categories, async category => await fetchProducts(category), { concurrency: 2 });
// 返り値：すべてのカテゴリーの商品を含む単一の配列
```

#### パラメータ

- `array` (`readonly T[]`)：変換する配列です。
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R[]>`)：各要素を配列に変換する非同期関数です。
- `options` (`FlatMapAsyncOptions`, オプショナル)：並行実行を制御するオプションです。
  - `concurrency` (`number`, オプショナル)：同時に実行できる最大操作数です。指定しない場合、すべての操作が同時に実行されます。

### 戻り値

(`Promise<R[]>`)：1レベル平坦化された変換値の配列のPromiseを返します。
