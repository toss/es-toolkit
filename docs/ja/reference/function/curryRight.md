# curryRight

関数を右から左にカリー化して一度に一つの引数で呼び出せるようにします。

```typescript
const curriedFunc = curryRight(func);
```

## 参照

### `curryRight(func)`

関数を右から左に部分適用したいときに`curryRight`を使用してください。通常の`curry`とは異なり、最後の引数から受け取ります。

```typescript
import { curryRight } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curryRight(sum);

// 引数`c`に値`10`を提供します
const add10 = curriedSum(10);

// 引数`b`に値`15`を提供します
const add25 = add10(15);

// 引数`a`に値`5`を提供します
// すべての引数を受け取ったので値を返します
const result = add25(5);
// Returns: 30
```

右から左に引数を適用する方がより自然な場合に便利です。

```typescript
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const curriedGreet = curryRight(greet);
const greetJohn = curriedGreet('John');

greetJohn('Hello'); // Returns: 'Hello, John!'
greetJohn('Hi'); // Returns: 'Hi, John!'
```

#### パラメータ

- `func` (`(...args: any[]) => any`): カリー化する関数です。

#### 戻り値

(`(...args: any[]) => any`): 右から左に一度に一つの引数で呼び出せるカリー化された関数です。
