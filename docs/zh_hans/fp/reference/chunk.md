# chunk

创建一个数据在后的运算符,将数组拆分成指定长度的子数组。

```typescript
const result = pipe(array, chunk(size));
```

## 用法

`chunk` 将数组划分成多个子数组,每个子数组的长度为 `size`。当数组无法被均匀划分时,最后一个分块会包含剩余的元素。

```typescript
import { chunk, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], chunk(2)); // => [[1, 2], [3, 4], [5]]

// `size` 大于数组长度时只会产生一个分块。
pipe([1, 2, 3], chunk(10)); // => [[1, 2, 3]]
```

#### 参数

- `size` (`number`): 每个分块的长度。必须是正整数。

#### 返回值

(`(array: readonly T[]) => T[][]`): 一个数据在后的运算符,将 `readonly T[]` 映射为一个由分块组成的数组。

#### 异常

如果 `size` 不是正整数,则抛出错误。
