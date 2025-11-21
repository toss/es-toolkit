# after

`n` 回目の呼び出しから関数を実行する新しい関数を作成します。

```typescript
const afterFunc = after(n, func);
```

## 使用法

### `after(n, func)`

最初の数回の呼び出しを無視し、`n` 回目から関数を実行したい場合は `after` を使用してください。イベントや非同期操作で特定の回数の後にのみ動作を実行する必要がある場合に便利です。

```typescript
import { after } from 'es-toolkit/function';

const afterFn = after(3, () => {
  console.log('executed');
});

// 何もログに記録しません
afterFn();
// 何もログに記録しません
afterFn();
// 'executed'をログに記録します
afterFn();
// 'executed'をログに記録します
afterFn();
```

#### パラメータ

- `n` (`number`): `func` が実行されるために必要な呼び出し回数です。
- `func` (`F`): 実行される関数です。

#### 戻り値

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 呼び出し回数を追跡し、`n` 回目の呼び出しから `func` を実行する新しい関数です。`n` 回目より前の呼び出しでは `undefined` を返します。

#### エラー

`n` が整数でないか負の数の場合、エラーをスローします。
