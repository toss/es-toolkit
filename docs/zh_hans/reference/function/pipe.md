# pipe

从基础值开始运行指定的函数管道,返回最终结果。

```typescript
const result = pipe(value, func1, func2);
```

## 用法

### `pipe(value, ...funcs)`

当您想将多个函数链接到管道中并立即在基础值上运行时,请使用 `pipe`。基础值是第一个函数的输入,每个函数的返回值成为下一个函数的输入。这对于在不嵌套函数调用或使用多个临时变量的情况下转换数据非常有用。

```typescript
const double = (n: number) => n * 2;
const square = (n: number) => n * n;
const half = (n: number) => n / 2;
const numToStr = (n: number) => String(n);

// 首先 double(5) = 10
// 然后 square(10) = 100
// 接着 half(100) = 50
// 最后 numToStr(50) -> '50'
const result = pipe(5, double, square, half, numToStr);
// 返回值: '50'
```

#### 参数

- `value` (`any`): 基础值。
- `funcs` (`Array<(result: any) => any>`): 按顺序执行的函数。

#### 返回值

(`any`): `funcs` 中最后一个函数的返回值。如果没有传递函数,则直接返回 `value`。
