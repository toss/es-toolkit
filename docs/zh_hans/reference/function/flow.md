# flow

创建一个按顺序执行多个函数的新函数。

```typescript
const combinedFunc = flow(func1, func2, func3);
```

## 用法

### `flow(...funcs)`

当您想要连接函数以创建管道时,请使用 `flow`。前一个函数的结果成为下一个函数的输入。这在通过多个步骤转换数据时很有用。

```typescript
import { flow } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

const combined = flow(add, square, double);

// 首先 add(1, 2) = 3
// 然后 square(3) = 9
// 最后 double(9) = 18
combined(1, 2);
// Returns: 18
```

这在创建数据转换管道时特别有用。

```typescript
const processData = flow(
  (text: string) => text.trim(),
  (text: string) => text.toLowerCase(),
  (text: string) => text.split(' '),
  (words: string[]) => words.filter(word => word.length > 3)
);

processData('  Hello World JavaScript  ');
// Returns: ['hello', 'world', 'javascript']
```

#### 参数

- `funcs` (`Array<(...args: any[]) => any>`): 要按顺序执行的函数。

#### 返回值

(`(...args: any[]) => any`): 按顺序执行给定函数的新函数。第一个函数可以接收多个参数,其余函数接收前一个函数的结果。
