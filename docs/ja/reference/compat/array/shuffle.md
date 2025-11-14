# shuffle（Lodash 互換性）

::: warning `es-toolkit` の `shuffle` を使用してください

この `shuffle` 関数は、Lodash との互換性のために追加の処理が含まれており、遅く動作します。

より高速でモダンな `es-toolkit` の [shuffle](../../array/shuffle.md) を使用してください。

:::

配列またはオブジェクトの要素をランダムにシャッフルして新しい配列を返します。

```typescript
const result = shuffle(collection);
```

## 使用法

### `shuffle(collection)`

Fisher-Yates アルゴリズムを使用して配列またはオブジェクトの要素をランダムにシャッフルし、新しい配列を返します。元は変更されません。

```typescript
import { shuffle } from 'es-toolkit/compat';

// 数値配列をシャッフル
const numbers = [1, 2, 3, 4, 5];
const shuffled1 = shuffle(numbers);
// 戻り値：例えば [3, 1, 5, 2, 4]（毎回異なる順序）

// 文字列配列をシャッフル
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffled2 = shuffle(fruits);
// 戻り値：例えば ['cherry', 'apple', 'date', 'banana']

// オブジェクトの値をシャッフル
const obj = { a: 1, b: 2, c: 3, d: 4 };
const shuffled3 = shuffle(obj);
// 戻り値：例えば [3, 1, 4, 2]（オブジェクトの値がランダムにシャッフルされる）
```

`null` や `undefined` は空の配列として処理します。

```typescript
import { shuffle } from 'es-toolkit/compat';

shuffle(null);
// 戻り値：[]

shuffle(undefined);
// 戻り値：[]
```

#### パラメータ

- `collection` (`ArrayLike<T> | T | null | undefined`): シャッフルする配列またはオブジェクト。

#### 戻り値

(`T[]`)：要素がランダムにシャッフルされた新しい配列を返します。
