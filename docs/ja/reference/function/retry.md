# retry

`Promise`を返す関数が成功するまで再試行します。再試行の回数と再試行の間隔を設定できます。

## インターフェース

```typescript
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, retries: number): Promise<T>;
function retry<T>(func: () => Promise<T>, { retries, delay, signal }: RetryOptions): Promise<T>;
```

### パラメータ

- `func` (`() => Promise<T>`): `Promise`を返す関数。
- `retries`: 再試行する回数。デフォルトは `Number.POSITIVE_INFINITY` で、成功するまで再試行します。
- `delay`: 再試行の間隔。単位はミリ秒(ms)で、デフォルトは `0` です。
- `signal`: 再試行をキャンセルするための `AbortSignal`。

### 戻り値

(`Promise<T>`): `func` が返す値です。

### エラー

`retries` に達するか、`AbortSignal` によってキャンセルされた場合にエラーが発生します。

## 例

```typescript
// `fetchData`が成功するまで無限に再試行します。
const data1 = await retry(() => fetchData());
console.log(data1);

// `fetchData`が成功するまで3回だけ再試行します。
const data2 = await retry(() => fetchData(), 3);
console.log(data2);

// `fetchData`が成功するまで3回だけ再試行し、間に100msの間隔があります。
const data3 = await retry(() => fetchData(), { retries: 3, delay: 100 });
console.log(data3);

const controller = new AbortController();

// `fetchData`の再試行作業を`signal`でキャンセルできます。
const data4 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data4);
```
