# add

创建一个数据在后的运算符,将一个数字加到其输入上。

```typescript
const result = pipe(value, add(addend));
```

## 用法

`add` 返回一个把 `addend` 加到其输入上的函数。它是为组合而设计的:既可以转换流经 [`pipe`](/zh_hans/fp/reference/pipe) 的值,也可以作为 [`map`](/zh_hans/fp/reference/map) 等运算符的回调。

```typescript
import { add, map, pipe } from 'es-toolkit/fp';

// 转换管道中的值。
pipe(3, add(2)); // => 5

// 作为 map 的回调使用。
pipe([1, 2, 3], map(add(10))); // => [11, 12, 13]
```

#### 参数

- `addend` (`number`): 用于加到输入上的数字。

#### 返回值

(`(value: number) => number`): 一个数据在后的运算符,将 `value` 映射为 `value + addend`。
