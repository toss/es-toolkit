# map

创建一个数据在后的运算符,用于转换数组中的每个元素,等价于 `Array.prototype.map`。

```typescript
const result = pipe(array, map(callbackfn));
```

## 用法

`map` 通过对每个元素调用 `callbackfn` 来构建一个新数组。它**支持惰性求值**:在 [`pipe`](/zh_hans/fp/reference/pipe) 中,它会与相邻的惰性运算符融合,因此位于末尾的 `take` 可以提前结束工作。

```typescript
import { map, pipe } from 'es-toolkit/fp';

// 转换每个元素。
pipe(
  [1, 2, 3],
  map(x => x * 2)
); // => [2, 4, 6]

// 索引作为第二个参数提供。
pipe(
  [10, 20, 30],
  map((value, index) => value + index)
); // => [10, 21, 32]

// 元素的类型可以改变。
pipe(
  [1, 2, 3],
  map(x => `#${x}`)
); // => ['#1', '#2', '#3']
```

#### 参数

- `callbackfn` (`(value: T, index: number, array: readonly T[]) => U`): 对每个元素调用的函数;其返回值会成为输出数组中对应的元素。在惰性求值期间,`array` 只包含到目前为止已遍历的元素。

#### 返回值

(`(array: readonly T[]) => U[]`): 一个数据在后的运算符,将 `readonly T[]` 映射为一个新的 `U[]`。
