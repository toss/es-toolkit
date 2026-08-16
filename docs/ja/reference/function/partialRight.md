# partialRight

一部のパラメータを後方から事前に適用した新しい関数を作成します。

```typescript
const partialRightFunc = partialRight(func, arg1, arg2);
```

## 使用法

### `partialRight(func, ...args)`

関数の一部のパラメータを後方から固定したいときに`partialRight`を使用してください。`partial`とは逆に、事前に提供されたパラメータが関数の後方に配置され、後で渡されるパラメータは前方に追加されます。

関数の最後のパラメータを固定し、前方のパラメータのみを動的に変更したいときに便利です。

`partialRight.placeholder`を使用すると特定の位置のパラメータを後で渡すことができます。

```typescript
import { partialRight } from 'es-toolkit/function';

// 基本的な使用法
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const greetJohn = partialRight(greet, 'John');
console.log(greetJohn('Hello')); // 'Hello, John!'
console.log(greetJohn('Hi')); // 'Hi, John!'

// 複数のパラメータを適用
function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

const subtractFrom10And5 = partialRight(subtract, 5, 2);
console.log(subtractFrom10And5(10)); // 10 - 5 - 2 = 3

// 数学演算で定数を適用
function divide(dividend: number, divisor: number) {
  return dividend / divisor;
}

const divideBy2 = partialRight(divide, 2);
console.log(divideBy2(10)); // 10 / 2 = 5
console.log(divideBy2(20)); // 20 / 2 = 10
```

プレースホルダーを使用してパラメータの順序を調整できます。

```typescript
import { partialRight } from 'es-toolkit/function';

function formatMessage(level: string, message: string, timestamp: string) {
  return `[${level}] ${message} at ${timestamp}`;
}

// 最後のパラメータのみ固定し、残りは後で渡す
const logWithTime = partialRight(formatMessage, partialRight.placeholder, '2023-01-01');
console.log(logWithTime('INFO', 'Application started'));
// '[INFO] Application started at 2023-01-01'

// 配列と一緒に使用
const numbers = [1, 2, 3, 4, 5];
const appendSuffix = partialRight((num: number, suffix: string) => `${num}${suffix}`, 'th');
const result = numbers.map(appendSuffix);
console.log(result); // ['1th', '2th', '3th', '4th', '5th']
```

#### パラメータ

- `func` (`F`): パラメータを部分的に適用する関数です。
- `args` (`any[]`, 選択): 後方から事前に適用するパラメータです。

#### 戻り値

(`(...args: any[]) => ReturnType<F>`): 一部のパラメータが後方から事前に適用された新しい関数を返します。
