# TimeoutError

タイムアウトした操作を表すエラークラスです。

```typescript
const error = new TimeoutError(message);
```

## 使用法

### `new TimeoutError(message?)`

操作の制限時間が過ぎた時に使用するエラークラスです。[timeout](../promise/timeout.md)や[withTimeout](../promise/withTimeout.md)などの操作の制限時間が過ぎた時にスローされます。

```typescript
import { TimeoutError } from 'es-toolkit/error';

// デフォルトメッセージでエラーを作成します。
throw new TimeoutError();
// エラーメッセージ: 'The operation was timed out'

// カスタムメッセージでエラーを作成します。
throw new TimeoutError('APIリクエストがタイムアウトしました');
// エラーメッセージ: 'APIリクエストがタイムアウトしました'
```

タイムアウトと一緒に使用する例です。

```typescript
import { timeout, TimeoutError } from 'es-toolkit';

async function fetchWithTimeout(url: string) {
  try {
    const response = await timeout(() => fetch(url), 3000);
    return response;
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.log('リクエストがタイムアウトしました');
    }
    throw error;
  }
}

// 3秒以上かかると TimeoutError をスロー
await fetchWithTimeout('https://example.com/api/slow');
```

#### パラメータ

- `message` (`string`, オプション): エラーメッセージです。デフォルト値は`'The operation was timed out'`です。

### 戻り値

(`TimeoutError`): タイムアウトした操作を表すエラーインスタンスを返します。`Error`を継承しており、`name`プロパティは`'TimeoutError'`です。
