# filterAsync

非同期条件関数を使用して配列をフィルタリングし、条件を満たす要素のみを含む新しい配列を返します。

```typescript
const filtered = await filterAsync(array, predicate);
```

## 参照

### `filterAsync(array, predicate, options?)`

API呼び出しやデータベースクエリなどの非同期操作で配列をフィルタリングする場合は、`filterAsync`を使用してください。通常の`filter`とは異なり、非同期条件関数をサポートし、`concurrency`オプションで並行実行数を制限できます。

```typescript
import { filterAsync } from 'es-toolkit/array';

// APIでユーザーステータスを確認して、アクティブなユーザーのみをフィルタリングします。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const activeUsers = await filterAsync(users, async (user) => {
  return await checkUserStatus(user.id);
});
// 返り値：アクティブなユーザーのみを含む配列

// 並行実行数を制限してサーバー負荷を軽減します。
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = await filterAsync(
  numbers,
  async (n) => await isEvenAsync(n),
  { concurrency: 2 }
);
// 最大2つの操作のみが同時に実行されます。
```

`concurrency`オプションは、外部API呼び出しを制限したり、システムリソースを効率的に管理したりするのに役立ちます。指定しない場合、すべての操作が同時に実行されます。

```typescript
import { filterAsync } from 'es-toolkit/array';

// 最大3つのAPI呼び出しのみを同時に実行します。
const items = await filterAsync(
  largeArray,
  async (item) => await validateItem(item),
  { concurrency: 3 }
);
```

#### パラメータ

- `array` (`readonly T[]`)：フィルタリングする配列です。
- `predicate` (`(item: T, index: number, array: readonly T[]) => Promise<boolean>`)：各要素をテストする非同期関数です。真と評価される値を返すと、その要素が結果に含まれます。
- `options` (`FilterAsyncOptions`, オプショナル)：並行実行を制御するオプションです。
  - `concurrency` (`number`, オプショナル)：同時に実行できる最大操作数です。指定しない場合、すべての操作が同時に実行されます。

### 戻り値

(`Promise<T[]>`)：条件関数が真と評価される値を返した要素のみを含む新しい配列のPromiseを返します。
