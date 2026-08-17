# deferAsync

スコープを抜けるときに非同期コールバックを実行する `AsyncDisposable` オブジェクトを作成します。

```typescript
await using cleanup = deferAsync(callback);
```

## 使用法

### `deferAsync(callback)`

スコープの終わりに非同期のクリーンアップコードを自動で実行したいときに `deferAsync` を使います。返されたオブジェクトを [`await using` 宣言](https://github.com/tc39/proposal-explicit-resource-management)で宣言すると、エラーでスコープを抜ける場合でも、ブロックの終了時にコールバックが実行され、完了まで待機します。

```typescript
import { deferAsync } from 'es-toolkit/util';

async function main() {
  const connection = await connect();
  await using cleanup = deferAsync(async () => {
    await connection.close();
  });

  // この関数が戻るかエラーを投げると、接続は自動的に閉じられます。
  await connection.query('SELECT 1');
}
```

`await using` 宣言を使うには、TypeScript 5.2 以上と、Explicit Resource Management をサポートするランタイム(Node.js 24 以上、最新のブラウザ)が必要です。古い環境では、構文をトランスパイルして `Symbol.asyncDispose` のポリフィルを追加すると使用できます。

::: info 同期のクリーンアップには defer を使ってください

この関数はコールバックの完了を待つため、async 関数の中でのみ使えます。クリーンアップコードが同期的な場合は、[`defer`](./defer.md) 関数を `using` と一緒に使ってください。

:::

#### パラメータ

- `callback` (`() => void | PromiseLike<void>`): オブジェクトが破棄されるときに実行するクリーンアップ関数です。返された値の完了まで待機します。

#### 戻り値

(`AsyncDisposable`): 破棄されるときに `callback` を実行して完了を待つオブジェクトを返します。
