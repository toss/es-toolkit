# defer

スコープを抜けるときにコールバックを実行する `Disposable` オブジェクトを作成します。

```typescript
using cleanup = defer(callback);
```

## 使用法

### `defer(callback)`

スコープの終わりにクリーンアップコードを自動で実行したいときに `defer` を使います。返されたオブジェクトを [`using` 宣言](https://github.com/tc39/proposal-explicit-resource-management)で宣言すると、エラーでスコープを抜ける場合でも、ブロックの終了時にコールバックが実行されます。

```typescript
import { defer } from 'es-toolkit/util';

function processFile() {
  const file = openFile('data.txt');
  using cleanup = defer(() => file.close());

  // この関数が戻るかエラーを投げると、ファイルは自動的に閉じられます。
  return file.read();
}
```

同じスコープに複数の `using` 宣言がある場合、コールバックはスタックのように宣言の逆順で実行されます。

```typescript
import { defer } from 'es-toolkit/util';

function run() {
  using first = defer(() => console.log('first'));
  using second = defer(() => console.log('second'));
  console.log('body');
}

run();
// 'body'、'second'、'first' の順に出力されます。
```

`using` 宣言を使うには、TypeScript 5.2 以上と、Explicit Resource Management をサポートするランタイム(Node.js 24 以上、最新のブラウザ)が必要です。古い環境では、構文をトランスパイルして `Symbol.dispose` のポリフィルを追加すると使用できます。

::: info 非同期のクリーンアップには deferAsync を使ってください

この関数はコールバックを同期的に実行します。クリーンアップコードが非同期で、完了を待つ必要がある場合は、[`deferAsync`](./deferAsync.md) 関数を `await using` と一緒に使ってください。

:::

#### パラメータ

- `callback` (`() => void`): オブジェクトが破棄されるときに実行するクリーンアップ関数です。

#### 戻り値

(`Disposable`): 破棄されるときに `callback` を実行するオブジェクトを返します。
