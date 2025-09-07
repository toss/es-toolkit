# after

`n`回目の呼び出しからのみ実行し、それまでの呼び出しは無視する新しい関数を作成します。

```typescript
const newFunc = after(n, func);
```

## リファレンス

### `after(n, func)`

最初から何回かの呼び出しを無視して、`n`回目から関数を呼び出したい場合、`after`関数を使用してください。

```typescript
import { after } from 'es-toolkit';

const mockFn = () => {
  console.log('実行されました');
};
const afterFn = after(3, mockFn);

// 何もログに出力しません。
afterFn();
// 何もログに出力しません。
afterFn();
// '実行されました'をログに出力します。
afterFn();
```

### パラメータ

- `n` (`number`): `func`が実行されるために必要な呼び出し回数です。
- `func` (`F`): 実行される関数です。

### 戻り値

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 新しい関数を返します。この関数は以下の機能を持ちます：

- 呼び出された回数を追跡します。
- `n`回目の呼び出しから`func`を呼び出します。
- 呼び出しが`n`回になるまで`undefined`を返します。

### エラー

`n`が負の数の場合、エラーを発生させます。
