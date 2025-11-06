# delay

指定された時間だけコードの実行を遅らせます。

```typescript
await delay(ms, options?);
```

## 使用法

### `delay(ms, options?)`

コードの実行を特定の時間だけ停止したい場合に`delay`を使用します。async/awaitと一緒に使用して、一定時間後に次のコードが実行されるようにできます。必要に応じて`AbortSignal`を通じて遅延をキャンセルすることもできます。

```typescript
import { delay } from 'es-toolkit/promise';

async function example() {
  console.log('開始');
  await delay(1000); // 1秒間実行を遅らせます
  console.log('1秒後に実行されます');

  await delay(500); // さらに0.5秒遅らせます
  console.log('さらに0.5秒後に実行されます');
}

example();
```

AbortSignalを使用して遅延をキャンセルすることもできます:

```typescript
async function cancellableDelay() {
  const controller = new AbortController();
  const { signal } = controller;

  // 50ms後に遅延をキャンセルします
  setTimeout(() => controller.abort(), 50);

  try {
    await delay(1000, { signal });
    console.log('1秒が経過しました'); // このコードは実行されません
  } catch (error) {
    console.log('遅延がキャンセルされました'); // AbortErrorが発生します
  }
}
```

テストで非同期動作をシミュレートする際にも便利です。

```typescript
async function simulateNetworkRequest() {
  console.log('ネットワークリクエスト開始...');
  await delay(2000); // 2秒間ネットワーク遅延をシミュレート
  console.log('レスポンスを受信!');
  return { data: 'test' };
}
```

#### パラメータ

- `ms` (`number`): 遅延させるミリ秒単位の時間です。
- `options` (`DelayOptions`, オプション): 遅延オプションです。
  - `signal` (`AbortSignal`, オプション): 遅延をキャンセルできるAbortSignalです。

#### 戻り値

(`Promise<void>`): 指定された時間後に完了するPromiseを返します。

#### エラー

AbortSignalが有効化されると`AbortError`をスローします。
