# retry

この関数は再試行間隔と再試行回数を設定し、再試行の最大回数に達するとエラーをスローします。

## インターフェース

```typescript
function retry<T>(func: () => Promise<T>, options: RetryOptions): T;
```

### パラメータ

- `func` (`F`): 再試行する関数。
- `options` (`RetryOptions`): オプション オブジェクト。
  - `intervalMs`: 間隔遅延のミリ秒数。
  - `retries`: 再試行の回数。

### 戻り値

(`Awaited<ReturnType<F>>`): 関数の戻り値

### Error

再試行回数が `retries` に達するとエラーが発生します

## 例

```typescript
async function getNumber() {
  return Promise.resolve(3);
}
async function getError() {
  return Promise.reject(new Error('MyFailed'));
}
// 結果は3になります
await retry(getNumber, {
  intervalMs: 1000,
  retries: 2,
});
// 2回実行すると例外がスローされます
await retry(getError, {
  intervalMs: 1000,
  retries: 2,
});
```
