# spread

パラメータ配列を展開して関数の個別のパラメータとして渡す新しい関数を作成します。

```typescript
const spreadFunc = spread(func);
```

## 使用法

### `spread(func)`

配列形式のパラメータを個別のパラメータとして展開して関数に渡したい場合は `spread` を使用します。

JavaScript のスプレッド演算子(`...`)と似た役割を果たしますが、関数を変換して配列を受け取るようにする方式です。`apply` メソッドを頻繁に使用する状況で便利です。

```typescript
import { spread } from 'es-toolkit/function';

// 基本的な使用法
function add(a: number, b: number) {
  return a + b;
}

const spreadAdd = spread(add);
console.log(spreadAdd([5, 3])); // 8

// 複数のパラメータがある関数
function greet(greeting: string, name: string, punctuation: string) {
  return `${greeting}, ${name}${punctuation}`;
}

const spreadGreet = spread(greet);
console.log(spreadGreet(['Hello', 'World', '!'])); // 'Hello, World!'

// Math 関数と一緒に使用
const numbers = [1, 2, 3, 4, 5];
const spreadMax = spread(Math.max);
console.log(spreadMax(numbers)); // 5

const spreadMin = spread(Math.min);
console.log(spreadMin(numbers)); // 1
```

`this` コンテキストも保持されます。

```typescript
import { spread } from 'es-toolkit/function';

const calculator = {
  multiply: function (a: number, b: number, c: number) {
    return a * b * c;
  },
};

const spreadMultiply = spread(calculator.multiply);
console.log(spreadMultiply.call(calculator, [2, 3, 4])); // 24
```

#### パラメータ

- `func` (`F`): 配列を個別のパラメータとして展開して受け取る関数です。

#### 戻り値

(`(args: Parameters<F>) => ReturnType<F>`): パラメータ配列を受け取って展開された形式で元の関数に渡す新しい関数を返します。

## Lodash との互換性

`es-toolkit/compat` から `spread` をインポートすると lodash と互換性があります。

- `spread` は `argsIndex` という数値引数を追加で受け取ります。この引数は展開する引数配列が与えられたインデックスを表します。
  - `argsIndex` が負の値または `NaN` の場合、デフォルト値 `0` として扱われます。小数の場合は、最も近い整数に切り捨てられます。

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // Returns [1, 2]
spread(fn, NaN)([1, 2]); // Returns [1, 2]
spread(fn, 'a')([1, 2]); // Returns [1, 2]
spread(fn, 1.6)(1, [2, 3]); // Returns [1, 2, 3]
```
