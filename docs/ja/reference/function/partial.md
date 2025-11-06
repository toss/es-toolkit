# partial

一部の引数を事前に適用した新しい関数を作成します。

```typescript
const partialFunc = partial(func, arg1, arg2);
```

## 使用法

### `partial(func, ...args)`

関数の一部の引数を事前に固定したいときに`partial`を使用してください。事前に提供された引数が関数の前方に配置され、後で渡される引数は後方に追加されます。

関数型プログラミングでよく使用されるカリー化(currying)と似た概念です。`bind`とは異なり`this`コンテキストを固定しません。

`partial.placeholder`を使用すると特定の位置の引数を後で渡すことができます。

```typescript
import { partial } from 'es-toolkit/function';

// 基本的な使用法
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
console.log(sayHello('John')); // 'Hello, John!'
console.log(sayHello('Jane')); // 'Hello, Jane!'

// 複数の引数を適用
function multiply(a: number, b: number, c: number) {
  return a * b * c;
}

const double = partial(multiply, 2);
console.log(double(3, 4)); // 24

const doubleAndTriple = partial(multiply, 2, 3);
console.log(doubleAndTriple(4)); // 24
```

プレースホルダーを使用して引数の順序を調整できます。

```typescript
import { partial } from 'es-toolkit/function';

function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

// 2番目の引数のみ固定し、1番目と3番目は後で渡す
const subtractFrom5 = partial(subtract, partial.placeholder, 5, partial.placeholder);
console.log(subtractFrom5(10, 2)); // 10 - 5 - 2 = 3

// 配列メソッドと一緒に使用
const numbers = [1, 2, 3, 4, 5];
const addTen = partial((x: number, y: number) => x + y, 10);
const result = numbers.map(addTen);
console.log(result); // [11, 12, 13, 14, 15]
```

#### パラメータ

- `func` (`F`): 引数を部分的に適用する関数です。
- `args` (`any[]`, 選択): 事前に適用する引数です。

#### 戻り値

(`(...args: any[]) => ReturnType<F>`): 一部の引数が事前に適用された新しい関数を返します。
