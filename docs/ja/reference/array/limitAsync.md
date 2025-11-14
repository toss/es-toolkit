# limitAsync

非同期関数の最大並行実行数を制限する新しい関数を作成します。

```typescript
const limitedFunc = limitAsync(asyncFunc, concurrency);
```

## 参照

### `limitAsync(callback, concurrency)`

複数回呼び出される非同期関数の並行実行数を制限したい場合は、`limitAsync`を使用してください。指定された数だけ同時に実行され、追加の呼び出しは実行中の操作が完了するまで待機します。

```typescript
import { limitAsync } from 'es-toolkit/array';

// 最大3つのリクエストのみを同時に実行するように制限します。
const limitedFetch = limitAsync(async url => {
  return await fetch(url);
}, 3);

const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
await Promise.all(urls.map(url => limitedFetch(url)));
// 最初の3つが先に実行され、完了すると残りが実行されます。
```

外部API呼び出しやデータベースクエリなど、リソースを大量に使用する操作の負荷を制御するのに便利です。レート制限のあるAPIを使用する場合やサーバー負荷を管理する必要がある場合に特に効果的です。

```typescript
import { limitAsync } from 'es-toolkit/array';

// 重い計算を最大2つずつ処理します。
const processItem = async item => {
  return await heavyComputation(item);
};

const limitedProcess = limitAsync(processItem, 2);
const items = [1, 2, 3, 4, 5];
await Promise.all(items.map(item => limitedProcess(item)));
// 最大2つの項目のみが同時に処理されます。
```

#### パラメータ

- `callback` (`F extends (...args: any[]) => Promise<any>`)：並行実行数を制限する非同期関数です。
- `concurrency` (`number`)：同時に実行できる最大操作数です。

### 戻り値

(`F`)：並行実行制限が適用された新しい関数を返します。元の関数と同じインターフェースを持ちます。
