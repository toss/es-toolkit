# negate (Lodash 互換性)

::: warning 論理否定演算子を使用してください

この `negate` 関数は単に関数の結果を否定するだけです。ほとんどの場合、論理否定演算子(`!`)を直接使用する方が簡単で高速です。

代わりに、より高速で現代的な `!predicate(...args)` または `(...args) => !predicate(...args)` を使用してください。

:::

与えられた関数の結果を否定する新しい関数を作成します。

```typescript
const negatedFunc = negate(predicate);
```

## 参照

### `negate(predicate)`

関数の結果を否定する新しい関数を作成したい場合は、`negate` を使用してください。フィルタリングや条件文で反対の条件をチェックする際に便利です。

```typescript
import { negate } from 'es-toolkit/compat';

// 基本的な使用法
function isEven(n) {
  return n % 2 === 0;
}

const isOdd = negate(isEven);
console.log(isOdd(3)); // true
console.log(isOdd(4)); // false

// 配列フィルタリングでの使用
const numbers = [1, 2, 3, 4, 5, 6];
const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]

// 現代的な代替案(推奨)
const modernOddNumbers = numbers.filter(n => !isEven(n));
// または
const isOddModern = n => !isEven(n);
const modernOddNumbers2 = numbers.filter(isOddModern);

// 複雑な例
function isEmpty(str) {
  return str.trim().length === 0;
}

const hasContent = negate(isEmpty);
const messages = ['', ' ', 'hello', '  ', 'world'];
const validMessages = messages.filter(hasContent);
console.log(validMessages); // ['hello', 'world']
```

主に配列フィルタリングや条件ロジックで使用されますが、ほとんどの場合、論理否定演算子を直接使用する方が直感的です。

#### パラメータ

- `predicate` (`Function`): 結果を否定する関数です。必ずブール値を返す必要があります。

#### 戻り値

(`Function`): 元の関数の結果を否定した値を返す新しい関数を返します。
