# once

提供された関数 `func` を一度だけ呼び出すように制限する関数を生成します。
関数を繰り返し呼び出すと、最初の呼び出しの値を返します。

## インターフェース

```typescript
function once<F extends (...args: any[]) => any>(func: F): () => ReturnType<F>;
```

### パラメータ

- `func` (`F extends (...args: any[]) => any`): 一度だけ呼び出すように制限する関数です。

### 戻り値

(`() => ReturnType<F>`): `func` が一度呼び出されると結果をキャッシュして返す新しい関数です。

## 例

```typescript
const initialize = once(() => {
  console.log('初期化');
  return true;
});

initialize(); // '初期化'をログに出力し、trueを返します
initialize(); // ログ出力なしでtrueを返します
```
