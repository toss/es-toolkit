# before

指定された関数（`func`）の呼び出し回数を制限する新しい関数を生成します。

## インターフェース

```typescript
function before<F extends (...args: any[]) => any>(
  n: number,
  func: F
): (...args: Parameters<F>) => ReturnType<F> | undefined;
```

### パラメータ

- `n` (`number`): 返される関数が `func` を呼び出すまでに許可される呼び出し回数です。
  - `n` が 0 の場合、`func` は呼び出されません。
  - `n` が正の整数の場合、`func` は最大 `n-1` 回呼び出されます。
- `func` (`F`): 呼び出し回数制限が適用される関数です。

### 戻り値

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 新しい関数を返します。この関数は以下の機能を持ちます：

- 呼び出し回数を追跡します。
- `n-1` 回目の呼び出しまで `func` を呼び出します。
- 呼び出し回数が `n` に達するか超えると、`undefined` を返して関数呼び出しを停止します。

### エラー

`n` が負の数の場合、エラーが発生します。

## 例

```typescript
import { after } from 'es-toolkit/function';

const mockFn = () => {
  console.log('実行されました');
};
const afterFn = after(3, mockFn);

// 何もログに出力されません
afterFn();
// 何もログに出力されません
afterFn();
// '実行されました' がログに出力されます
afterFn();
```
