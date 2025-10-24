# AbortError

中断またはキャンセルされた操作を表すエラークラスです。

```typescript
const error = new AbortError(message);
```

## 参照

### `new AbortError(message?)`

操作が中断またはキャンセルされた時に使用するエラークラスです。[debounce](../function/debounce.md)や[delay](../promise/delay.md)などの操作が`AbortSignal`でキャンセルされた時にスローされます。

```typescript
import { AbortError } from 'es-toolkit/error';

// デフォルトメッセージでエラーを作成します。
throw new AbortError();
// エラーメッセージ: 'The operation was aborted'

// カスタムメッセージでエラーを作成します。
throw new AbortError('ファイルアップロードがキャンセルされました');
// エラーメッセージ: 'ファイルアップロードがキャンセルされました'
```

AbortSignalと一緒に使用する例です。

```typescript
import { AbortError, delay } from 'es-toolkit';

async function fetchData(signal: AbortSignal) {
  try {
    await delay(1000, { signal });
    return 'データ読み込み完了';
  } catch (error) {
    if (error instanceof AbortError) {
      console.log('操作がキャンセルされました');
    }
    throw error;
  }
}

const controller = new AbortController();
controller.abort(); // 操作をキャンセル
await fetchData(controller.signal); // AbortErrorをスロー
```

#### パラメータ

- `message` (`string`, オプション): エラーメッセージです。デフォルト値は`'The operation was aborted'`です。

### 戻り値

(`AbortError`): 中断された操作を表すエラーインスタンスを返します。`Error`を継承しており、`name`プロパティは`'AbortError'`です。
