# mapAsync

非同期関数を使用して配列の各要素を変換し、新しい配列を返します。

```typescript
const transformed = await mapAsync(array, callback);
```

## 参照

### `mapAsync(array, callback, options?)`

配列の各要素に対して非同期変換操作を実行する場合は、`mapAsync`を使用してください。API呼び出しやデータベースクエリなど、各要素を非同期的に処理する必要がある場合に便利です。

```typescript
import { mapAsync } from 'es-toolkit/array';

// 各ユーザーの詳細情報を取得します。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userDetails = await mapAsync(users, async (user) => {
  return await fetchUserDetails(user.id);
});
// 返り値：[{ id: 1, name: '...' }, { id: 2, name: '...' }, { id: 3, name: '...' }]

// 並行実行数を制限します。
const numbers = [1, 2, 3, 4, 5];
const results = await mapAsync(
  numbers,
  async (n) => await slowOperation(n),
  { concurrency: 2 }
);
// 最大2つの操作のみが同時に実行されます。
```

`concurrency`オプションを使用すると、並行実行を制限してサーバー負荷を制御したり、APIレート制限を守ったりできます。指定しない場合、すべての操作が同時に実行されます。

```typescript
import { mapAsync } from 'es-toolkit/array';

// 大量の画像を変換しますが、サーバー負荷を考慮して並行処理数を制限します。
const imageUrls = [...]; // 多くの画像URL
const processedImages = await mapAsync(
  imageUrls,
  async (url) => await processImage(url),
  { concurrency: 5 }
);
// 一度に最大5つの画像のみが処理されます。
```

#### パラメータ

- `array` (`readonly T[]`)：変換する配列です。
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R>`)：各要素を変換する非同期関数です。
- `options` (`MapAsyncOptions`, オプショナル)：並行実行を制御するオプションです。
  - `concurrency` (`number`, オプショナル)：同時に実行できる最大操作数です。指定しない場合、すべての操作が同時に実行されます。

### 戻り値

(`Promise<R[]>`)：変換された値で構成される新しい配列のPromiseを返します。
