# attempt

関数を実行し、結果またはエラーをタプルとして返します。

```typescript
const [error, result] = attempt(func);
```

## 参照

### `attempt(func)`

関数を安全に実行したい場合は `attempt` を使用してください。try-catch ブロックでラップせずにエラーを処理できます。

```typescript
import { attempt } from 'es-toolkit/util';

// 成功する場合
const [error, result] = attempt(() => 42);
// error は null、result は 42

// エラーが発生する場合
const [error, result] = attempt(() => {
  throw new Error('問題が発生しました');
});
// error は Error オブジェクト、result は null

// 型を明示することもできます
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// names は string[] 型として推論されます
```

::: warning 非同期関数には使用しないでください

この関数は非同期関数(`Promise` を返す関数)には適していません。非同期関数を渡すと `[null, Promise<T>]` が返されますが、Promise が後で拒否(reject)されてもエラーをキャッチできません。

非同期関数を処理するには、代わりに [`attemptAsync`](./attemptAsync.md) 関数を使用してください。

```typescript
// 誤った使用法
const [error, promise] = attempt(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});

// 正しい使用法
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
```

:::

#### パラメータ

- `func` (`() => T`):実行する関数です。

#### 戻り値

(`[null, T] | [E, null]`):成功した場合は `[null, 結果値]`、エラーが発生した場合は `[エラー, null]` タプルを返します。
