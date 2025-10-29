# curry

对函数进行柯里化,使其可以一次接收一个参数进行调用。

```typescript
const curriedFunc = curry(func);
```

## 参考

### `curry(func)`

当您想要部分应用函数时,请使用 `curry`。柯里化后的函数会在收到所有必需参数之前返回新函数。一旦提供了所有参数,就会执行原始函数。

```typescript
import { curry } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// 为参数 `a` 提供值 `10`
const sum10 = curriedSum(10);

// 为参数 `b` 提供值 `15`
const sum25 = sum10(15);

// 为参数 `c` 提供值 `5`
// 已收到所有参数,现在返回值
const result = sum25(5);
// Returns: 30
```

这在创建可重用函数时很有用。

```typescript
function multiply(a: number, b: number) {
  return a * b;
}

const curriedMultiply = curry(multiply);
const double = curriedMultiply(2);
const triple = curriedMultiply(3);

double(5); // Returns: 10
triple(5); // Returns: 15
```

#### 参数

- `func` (`(...args: any[]) => any`): 要柯里化的函数。

#### 返回值

(`(...args: any[]) => any`): 可以一次接收一个参数进行调用的柯里化函数。
