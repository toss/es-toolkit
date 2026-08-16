# rangeRight

指定された範囲とステップで逆順の数値配列を生成します。

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end, step?);
```

## 使用法

### `rangeRight(end)`

終了値から0まで逆順の連続した数値配列が必要な場合は `rangeRight` を使用してください。`range` と同じですが、結果が後ろから出てきます。

```typescript
import { rangeRight } from 'es-toolkit/math';

// 3から0まで逆順の配列を作成します。
const numbers1 = rangeRight(4);
console.log(numbers1); // [3, 2, 1, 0]

// 配列の逆順インデックス
const items = ['a', 'b', 'c', 'd', 'e'];
const reverseIndices = rangeRight(items.length);
reverseIndices.forEach(i => {
  console.log(items[i]); // 'e', 'd', 'c', 'b', 'a' の順に出力
});
```

#### パラメータ

- `end` (`number`): 終了値(含まない)です。0から始まります。

#### 戻り値

(`number[]`): 終了値から0まで生成された逆順の数値配列を返します。

### `rangeRight(start, end, step?)`

指定された開始値、終了値、ステップで逆順の連続した数値配列が必要な場合は `rangeRight` を使用してください。`range` と同じですが、結果が後ろから出てきます。

```typescript
import { rangeRight } from 'es-toolkit/math';

// 4から1まで逆順の配列を作成します。
const numbers2 = rangeRight(1, 5);
console.log(numbers2); // [4, 3, 2, 1]

// 15から0まで5ずつ減少する配列を作成します。
const numbers3 = rangeRight(0, 20, 5);
console.log(numbers3); // [15, 10, 5, 0]

// 負の方向にも作成できます。
const numbers4 = rangeRight(-5, 0, 1);
console.log(numbers4); // [-1, -2, -3, -4, -5]

// 小さい数から大きい数へも可能です。
const numbers5 = rangeRight(5, 0, -1);
console.log(numbers5); // [1, 2, 3, 4, 5]
```

カウントダウンやページネーションで逆順が必要な場合に便利です。

```typescript
import { rangeRight } from 'es-toolkit/math';

// カウントダウンを作成
const countdown = rangeRight(0, 11);
console.log(countdown); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

// ページネーションで最後のページから最初のページへ
const pageNumbers = rangeRight(1, 11);
console.log(pageNumbers); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

#### パラメータ

- `start` (`number`): 開始値です。結果配列に含まれます。
- `end` (`number`): 終了値です。結果配列に含まれません。
- `step` (`number`, 選択): 各数値間の増分です。ゼロ以外の整数である必要があり、デフォルト値は `1` です。

#### 戻り値

(`number[]`): 指定された範囲とステップで生成された逆順の数値配列を返します。

#### エラー

- `step` が0または整数でない場合、エラーをスローします。
