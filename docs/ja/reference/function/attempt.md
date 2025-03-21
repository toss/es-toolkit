# attempt

::: info
重要: この関数は非同期関数（`Promise`を返す関数）には適していません。
非同期関数を渡すと、`[null, Promise<AttemptResult>]`を返しますが、Promiseが後で拒否された場合でもエラーをキャッチしません。

非同期関数を処理するには、代わりに`attemptAsync`関数を使用してください。
:::

関数を実行し、結果またはエラーを含むタプルを返します。

## シグネチャ

```typescript
function attempt<AttemptResult, AttemptError>(func: () => AttemptResult): [null, AttemptResult] | [AttemptError, null];
```

### パラメータ

- `func` (`() => AttemptResult`): 実行を試みる関数。

### 戻り値

(`[null, AttemptResult] | [AttemptError, null]`): 以下のようなタプルを返します:

- 成功時: `[null, AttemptResult]` - 最初の要素は`null`、2番目は結果
- エラー発生時: `[AttemptError, null]` - 最初の要素はキャッチされたエラー、2番目は`null`

## 例

```typescript
import { attempt } from 'es-toolkit/function';

// 成功時の実行
const [error, result] = attempt(() => 42);
// [null, 42]

// 失敗時の実行
const [error, result] = attempt(() => {
  throw new Error('問題が発生しました');
});
// [Error, null]

// 型パラメータを使用
const [error, names] = attempt<string[]>(() => ['Alice', 'Bob']);
// [null, ['Alice', 'Bob']]
```
