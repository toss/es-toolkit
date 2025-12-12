# retry

Promise を返す関数が成功するまで繰り返し実行します。

```typescript
const result = await retry(asyncFunc, options);
```

## 使用法

### `retry(func, options?)`

非同期関数が失敗したときに自動的に再試行したい場合は `retry` を使用します。API 呼び出しやネットワークリクエストのように一時的に失敗する可能性のある操作に便利です。

再試行回数、再試行間隔、キャンセルシグナルを設定できます。再試行間隔は固定値または再試行回数に応じて動的に計算する関数を使用できます。

```typescript
import { retry } from 'es-toolkit/function';

// 基本的な使用法 (無限再試行)
const data1 = await retry(async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
});

// 再試行回数の制限
const data2 = await retry(async () => {
  return await fetchData();
}, 3);

// 再試行間隔の設定 (100ms)
const data3 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 3,
    delay: 100,
  }
);

// 動的な再試行間隔 (指数バックオフ)
const data4 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 5,
    delay: attempts => Math.min(100 * Math.pow(2, attempts), 5000),
  }
);
```

AbortSignal を使用して再試行をキャンセルすることもできます。

```typescript
import { retry } from 'es-toolkit/function';

const controller = new AbortController();

// 5秒後に再試行をキャンセル
setTimeout(() => controller.abort(), 5000);

try {
  const data = await retry(
    async () => {
      return await fetchData();
    },
    {
      retries: 10,
      delay: 1000,
      signal: controller.signal,
    }
  );
  console.log(data);
} catch (error) {
  console.log('再試行がキャンセルされたか失敗しました:', error);
}
```

#### パラメータ

- `func` (`() => Promise<T>`): 再試行する非同期関数です。
- `options` (`number | RetryOptions`, オプション): 再試行回数またはオプションオブジェクトです。
  - `retries` (`number`, オプション): 再試行する回数です。デフォルトは `Infinity` で無限に再試行します。
  - `delay` (`number | (attempts: number) => number`, オプション): 再試行間隔(ミリ秒)です。数値または関数を使用できます。デフォルトは `0` です。
  - `signal` (`AbortSignal`, オプション): 再試行をキャンセルできるシグナルです。

#### 戻り値

(`Promise<T>`): 関数が正常に実行された結果の値を返します。

#### エラー

再試行回数を超えたり AbortSignal でキャンセルされたりすると、最後のエラーをスローします。
