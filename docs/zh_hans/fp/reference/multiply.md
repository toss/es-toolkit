# multiply

创建一个数据在后的运算符,将其输入乘以一个数字。

```typescript
const result = pipe(value, multiply(multiplicand));
```

## 用法

`multiply` 返回一个把其输入乘以 `multiplicand` 的函数。它是为组合而设计的:既可以转换流经 [`pipe`](/zh_hans/fp/reference/pipe) 的值,也可以作为 [`map`](/zh_hans/fp/reference/map) 等运算符的回调。

```typescript
import { map, multiply, pipe } from 'es-toolkit/fp';

// 转换管道中的值。
pipe(3, multiply(2)); // => 6

// 作为 map 的回调使用。
pipe([1, 2, 3], map(multiply(3))); // => [3, 6, 9]
```

#### 参数

- `multiplicand` (`number`): 用于与输入相乘的数字。

#### 返回值

(`(value: number) => number`): 一个数据在后的运算符,将 `value` 映射为 `value * multiplicand`。
