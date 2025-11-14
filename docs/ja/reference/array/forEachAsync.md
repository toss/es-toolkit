# forEachAsync

配列の各要素に対して非同期関数を実行します。

```typescript
await forEachAsync(array, callback);
```

## 参照

### `forEachAsync(array, callback, options?)`

配列の各要素に対して副作用を伴う非同期操作を実行する場合は、`forEachAsync`を使用してください。通常の`forEach`とは異なり、すべての非同期操作が完了したときに解決されるPromiseを返します。

```typescript
import { forEachAsync } from 'es-toolkit/array';

// すべてのユーザー情報を更新します。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
await forEachAsync(users, async (user) => {
  await updateUser(user.id);
});
// すべてのユーザー更新が完了しました。

// 並行実行数を制限します。
const items = [1, 2, 3, 4, 5];
await forEachAsync(
  items,
  async (item) => await processItem(item),
  { concurrency: 2 }
);
// 最大2つの項目のみが同時に処理されます。
```

`concurrency`オプションを使用すると、並行実行を制限してサーバーやデータベースへの負荷を制御できます。ログ記録、ファイルアップロード、データベース更新など、値を返さない操作に便利です。

```typescript
import { forEachAsync } from 'es-toolkit/array';

// ファイルを順次アップロードします。
const files = ['file1.txt', 'file2.txt', 'file3.txt'];
await forEachAsync(
  files,
  async (file) => await uploadFile(file),
  { concurrency: 1 }
);
// 一度に1つずつアップロードされます。
```

#### パラメータ

- `array` (`readonly T[]`)：反復処理する配列です。
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<void>`)：各要素に対して実行する非同期関数です。
- `options` (`ForEachAsyncOptions`, オプショナル)：並行実行を制御するオプションです。
  - `concurrency` (`number`, オプショナル)：同時に実行できる最大操作数です。指定しない場合、すべての操作が同時に実行されます。

### 戻り値

(`Promise<void>`)：すべての操作が完了したときに解決されるPromiseを返します。
