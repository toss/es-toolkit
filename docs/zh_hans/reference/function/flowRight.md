# flowRight

创建一个从右到左按顺序执行给定函数的新函数。

```typescript
const combined = flowRight(func1, func2, func3);
```

## 参考

### `flowRight(...funcs)`

当您想要从右到左按顺序执行多个函数以创建新函数时,请使用 `flowRight`。前一个函数的返回值作为下一个函数的参数传递。

这在以相反顺序组合函数创建数据转换管道时很有用。与 `flow` 的执行方向相反。

```typescript
import { flowRight } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

// 从右到左执行: double -> square -> add
const combined = flowRight(double, square, add);
console.log(combined(1, 2)); // 18
// 执行顺序: add(1, 2) = 3, square(3) = 9, double(9) = 18

// 也可以使用单个函数
const single = flowRight((x: number) => x + 1);
console.log(single(5)); // 6
```

`this` 上下文也会传递给函数。

```typescript
import { flowRight } from 'es-toolkit/function';

const context = {
  multiplier: 3,
};

function multiply(this: typeof context, x: number) {
  return x * this.multiplier;
}

const add = (x: number) => x + 10;

const combined = flowRight(multiply, add).bind(context);
console.log(combined(5)); // 45
// 执行顺序: add(5) = 15, multiply(15) = 45
```

#### 参数

- `funcs` (`(...args: any[]) => any`): 要组合的函数。

#### 返回值

(`(...args: any[]) => any`): 返回一个从右到左按顺序执行给定函数的新函数。
