# range

指定された範囲とステップで数値配列を生成します。

```typescript
const numbers = range(end);
const numbers = range(start, end, step);
```

## 使用法

### `range(end)`

0から指定された終了値までの連続した数値配列が必要な場合は `range` を使用してください。ループで便利です。

```typescript
import { range } from 'es-toolkit/math';

// 0から3までの配列を作成します。
const numbers1 = range(4);
console.log(numbers1); // [0, 1, 2, 3]

// 10個の要素を持つ配列のインデックス
const indices = range(10);
console.log(indices); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// forEachの代わりに使用できます。
range(5).forEach(i => {
  console.log(`反復 ${i}`); // 反復 0, 反復 1, 反復 2, 反復 3, 反復 4
});
```

#### パラメータ

- `end` (`number`): 終了値(含まない)です。0から始まります。

#### 戻り値

(`number[]`): 0から終了値まで生成された数値配列を返します。

### `range(start, end, step?)`

指定された開始値、終了値、ステップで連続した数値配列が必要な場合は `range` を使用してください。ループで便利です。

```typescript
import { range } from 'es-toolkit/math';

// 1から4までの配列を作成します。
const numbers2 = range(1, 5);
console.log(numbers2); // [1, 2, 3, 4]

// 0から20まで5ずつ増加する配列を作成します。
const numbers3 = range(0, 20, 5);
console.log(numbers3); // [0, 5, 10, 15]

// 負の方向にも作成できます。
const numbers4 = range(0, -5, -1);
console.log(numbers4); // [0, -1, -2, -3, -4]

// 大きい数から小さい数へも可能です。
const numbers5 = range(5, 0, -1);
console.log(numbers5); // [5, 4, 3, 2, 1]

// 特定範囲のページ番号を作成
const pageNumbers = range(1, 11);
console.log(pageNumbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### パラメータ

- `start` (`number`): 開始値です。結果配列に含まれます。
- `end` (`number`): 終了値です。結果配列に含まれません。
- `step` (`number`, 選択): 各数値間の増分です。ゼロ以外の整数である必要があり、デフォルト値は `1` です。

#### 戻り値

(`number[]`): 指定された範囲とステップで生成された数値配列を返します。

#### エラー

- `step` が0または整数でない場合、エラーをスローします。
