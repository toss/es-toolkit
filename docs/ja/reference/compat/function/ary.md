# ary (Lodash 互換性)

::: warning `es-toolkit` の [`ary`](../../function/ary.md) を使用してください

この `ary` 関数は、複雑なパラメータ検証により動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [ary](../../function/ary.md) を使用してください。

:::

関数が受け取ることができる引数の数を制限する関数を作成します。

```typescript
const cappedFunction = ary(func, n);
```

## 参照

### `ary(func, n)`

関数が受け取る引数の数を制限したい場合は、`ary` を使用してください。あまりにも多くの引数を受け取る関数を安全に使用したり、コールバック関数で不要な引数を無視する際に便利です。

```typescript
import { ary } from 'es-toolkit/compat';

// 基本的な使用法
function greet(name, age, city) {
  return `こんにちは、${name}さん! ${age}歳、${city}からいらっしゃいました。`;
}

const limitedGreet = ary(greet, 2);
console.log(limitedGreet('田中', 30, '東京', '追加引数'));
// "こんにちは、田中さん! 30歳、undefinedからいらっしゃいました。"
// 3番目の引数以降は無視される
```

配列メソッドと一緒に使用する際、コールバック関数に不要な引数が渡されないようにできます。

```typescript
import { ary } from 'es-toolkit/compat';

// parseIntは第2引数(基数)を受け取るが、mapのコールバックは3つの引数を渡す
const numbers = ['1', '2', '3', '4', '5'];

// 誤った使用法 - parseIntがインデックスを基数として受け取る
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN]

// aryを使用して最初の引数のみ渡す
console.log(numbers.map(ary(parseInt, 1))); // [1, 2, 3, 4, 5]
```

関数が希望するパラメータ引数の数だけを受け取るように制限できます。

```typescript
import { ary } from 'es-toolkit/compat';

function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}

const sum0 = ary(sum, 0);
const sum1 = ary(sum, 1);
const sum2 = ary(sum, 2);
const sum3 = ary(sum, 3);

console.log(sum0(1, 2, 3, 4, 5)); // 0 (引数なし)
console.log(sum1(1, 2, 3, 4, 5)); // 1 (最初の引数のみ)
console.log(sum2(1, 2, 3, 4, 5)); // 3 (最初の2つの引数のみ)
console.log(sum3(1, 2, 3, 4, 5)); // 6 (最初の3つの引数のみ)
```

負の数や `NaN` を渡すと、0として扱われ、すべての引数が無視されます。

```typescript
import { ary } from 'es-toolkit/compat';

const func = (a, b, c) => [a, b, c];

console.log(ary(func, -1)(1, 2, 3)); // [] (負数は0として扱われる)
console.log(ary(func, NaN)(1, 2, 3)); // [] (NaNは0として扱われる)
```

#### パラメータ

- `func` (`Function`): 引数の数を制限する関数です。
- `n` (`number`, オプション): 許可する最大引数数です。省略した場合、関数の `length` プロパティを使用します。

#### 戻り値

(`Function`): 最大 `n` 個の引数のみを受け取る新しい関数を返します。
