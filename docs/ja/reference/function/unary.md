# unary

関数が最初のパラメータのみを受け取るように制限する新しい関数を作成します。

```typescript
const unaryFunc = unary(func);
```

## 参照

### `unary(func)`

関数が1つのパラメータのみを受け取るように制限したい場合は `unary` を使用します。追加で渡されるパラメータはすべて無視されます。

配列の `map`、`filter`、`forEach` のようなメソッドでコールバック関数が予想以上に多くのパラメータを受け取るのを防ぐ際に便利です。

```typescript
import { unary } from 'es-toolkit/function';

// 基本的な使用法
function greet(name: string, age?: number, city?: string) {
  console.log(`こんにちは、${name}さん!`);
  if (age) console.log(`年齢: ${age}`);
  if (city) console.log(`都市: ${city}`);
}

const greetOnlyName = unary(greet);
greetOnlyName('太郎', 25, '東京'); // 'こんにちは、太郎さん!' のみ出力

// 配列メソッドと一緒に使用
const numbers = ['1', '2', '3', '4', '5'];

// parseInt は2番目のパラメータとして基数を受け取りますが、
// map のコールバックは (value, index, array) を渡します
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN] (予期しない結果)

// unary を使用して最初のパラメータのみを渡す
console.log(numbers.map(unary(parseInt))); // [1, 2, 3, 4, 5] (期待される結果)

// 別の例: 関数が複数のパラメータを受け取るが1つだけ使いたい場合
function logValue(value: any, prefix: string = 'Value:', suffix: string = '') {
  console.log(`${prefix} ${value} ${suffix}`);
}

const data = ['apple', 'banana', 'cherry'];

// prefix と suffix なしで値のみを出力したい場合
data.forEach(unary(logValue));
// Value: apple
// Value: banana
// Value: cherry
```

関数合成でも便利です。

```typescript
import { unary } from 'es-toolkit/function';

// 複数のパラメータを受け取る関数
function multiply(a: number, b: number = 1, c: number = 1) {
  return a * b * c;
}

// 最初のパラメータのみを使用するように制限
const multiplyOne = unary(multiply);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => multiplyOne(x, 2, 3)); // b と c は無視されます
console.log(doubled); // [1, 2, 3, 4, 5] (1 * 1 * 1 の結果)
```

#### パラメータ

- `func` (`F`): 最初のパラメータのみを受け取るように制限する関数です。

#### 戻り値

(`(...args: any[]) => ReturnType<F>`): 最初のパラメータのみを元の関数に渡す新しい関数を返します。
