# uniq

创建一个数据在后的运算符,用于去除数组中的重复值。

```typescript
const result = pipe(array, uniq());
```

## 用法

`uniq` 返回一个只包含唯一值的新数组,并保持首次出现的顺序。相等性遵循 `SameValueZero`(即 `Set` 的语义)。

```typescript
import { pipe, uniq } from 'es-toolkit/fp';

pipe([1, 2, 2, 3, 3, 3], uniq()); // => [1, 2, 3]

// 保持首次出现的顺序。
pipe([3, 1, 2, 1, 3], uniq()); // => [3, 1, 2]
```

#### 参数

该运算符不接收任何参数;请将其作为 `uniq()` 调用。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个数据在后的运算符,将 `readonly T[]` 映射为一个去除重复项后的新 `T[]`。
