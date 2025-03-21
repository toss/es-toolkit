# retry

`Promise`を返す関数が成功するまで再試行します。再試行の回数と再試行の間隔を設定できます。

## インターフェース

```typescript
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, retries: number): Promise<T>;
function retry<T>(func: () => Promise<T>, { retries, delay, signal }: RetryOptions): Promise<T>;
```

### パラメータ

- `func` (`() => Promise<T>`): `Promise`を返す関数です。
- `retries`: 再試行回数。デフォルトは `Number.POSITIVE_INFINITY`で、成功するまで再試行します。
- `retryMinDelay`: 再試行間隔の最小値（ms）。デフォルトは `0` です。
- `retryMaxDelay`: 再試行間隔の最大値（ms）。デフォルトは `Infinity` です。
- `factor`: 再試行間隔を調整する係数。デフォルトは `1` です。
- `randomize`: 再試行間隔に`factor`に基づくランダム要素を加えるかどうか。デフォルトは `false` です。
- `signal`: 再試行をキャンセルするための `AbortSignal` です。

### 戻り値

(`Promise<T>`): `func` が返す値です。

### エラー

`retries` に達するか、`AbortSignal` によってキャンセルされた場合にエラーが発生します。

## 例

```typescript
// `fetchData` が成功するまで無限に再試行します。
const data1 = await retry(() => fetchData());
console.log(data1);

// `fetchData` が成功するまで最大3回再試行します。
const data2 = await retry(() => fetchData(), 3);
console.log(data2);

// `fetchData` が成功するまで最大3回再試行し、再試行間隔を固定で100msに設定します。
const data3 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100 });
console.log(data3);

// 再試行間の間隔が2倍ずつ増加します (100ms, 200ms, 400ms)。
const data4 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, factor: 2 });
console.log(data4);

// 指数バックオフとランダム化された再試行間隔 (100〜200ms) の間で再試行します。
// 各再試行の間隔は以下のように計算されます:
// 1. 基本間隔は `retryMinDelay * factor^attempt` によって増加します。
// 2. 計算された間隔は `retryMaxDelay` によって制限されます。
// 3. `randomize` が true の場合、間隔が 1〜2倍の範囲でランダム化されます。
//
// 例:
// - 最初の再試行: 100〜200ms の範囲
// - 2回目の再試行: 200〜400ms の範囲
// - 3回目の再試行: 400〜800ms の範囲
const data5 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, retryMaxDelay: 1000, randomize: true });
console.log(data5);

const controller = new AbortController();

// `signal` を使用して再試行を中止することができます。
const data6 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data6);

```
