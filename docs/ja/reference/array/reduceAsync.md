# reduceAsync

非同期リデューサー関数を使用して配列を単一の値に縮約します。

```typescript
const result = await reduceAsync(array, reducer, initialValue);
```

## 参照

### `reduceAsync(array, reducer, initialValue)`

各要素を順次処理して配列を1つの値に縮約する場合は、`reduceAsync`を使用してください。リデューサー関数は左から右へ各要素に順次適用され、前の呼び出しの累積結果を次の呼び出しに渡します。

```typescript
import { reduceAsync } from 'es-toolkit/array';

// 各数値の非同期値を取得して合計します。
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + (await fetchValue(n)), 0);
// 返り値：すべての取得値の合計

// 配列をオブジェクトに変換します。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userMap = await reduceAsync(
  users,
  async (acc, user) => {
    const details = await fetchUserDetails(user.id);
    acc[user.id] = details;
    return acc;
  },
  {} as Record<number, any>
);
// 返り値：{ 1: {...}, 2: {...}, 3: {...} }
```

他の非同期配列メソッドとは異なり、`reduceAsync`は各要素を順次処理する必要があるため、並行実行をサポートしていません。前のステップの結果が次のステップに必要だからです。

#### パラメータ

- `array` (`readonly T[]`)：縮約する配列です。
- `reducer` (`(accumulator: U, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<U>`)：各要素を処理する非同期関数です。累積値と現在の値を受け取り、新しい累積値を返します。
- `initialValue` (`U`)：アキュムレーターの初期値です。

### 戻り値

(`Promise<U>`)：最終的な累積値のPromiseを返します。

---

### `reduceAsync(array, reducer)`

初期値なしで配列を縮約する場合、最初の要素が初期値として使用され、2番目の要素からリデューサー関数が適用されます。

```typescript
import { reduceAsync } from 'es-toolkit/array';

// 初期値なしで合計を計算します。
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + n);
// 返り値：15 (1 + 2 + 3 + 4 + 5)

// 空の配列はundefinedを返します。
const emptyArray: number[] = [];
const result = await reduceAsync(emptyArray, async (acc, n) => acc + n);
// 返り値：undefined
```

初期値なしで空の配列に対して`reduceAsync`を呼び出すと、`undefined`を返します。

#### パラメータ

- `array` (`readonly T[]`)：縮約する配列です。
- `reducer` (`(accumulator: T, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<T>`)：各要素を処理する非同期関数です。累積値と現在の値を受け取り、新しい累積値を返します。

### 戻り値

(`Promise<T | undefined>`)：最終的な累積値のPromiseを返します。配列が空の場合は`undefined`を返します。
