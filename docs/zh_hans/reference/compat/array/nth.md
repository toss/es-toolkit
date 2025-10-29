# nth (Lodash 兼容性)

::: warning 使用数组索引访问

由于需要处理 `null` 或 `undefined` 和整数转换,这个 `nth` 函数运行缓慢。

请改用更快、更现代的数组索引访问 (`array[index]` 或 `array.at(index)`)。

:::

获取数组指定索引处的元素。

```typescript
const element = nth(array, index);
```

## 参考

### `nth(array, index)`

返回数组指定索引处的元素。如果索引为负数,则从数组末尾开始计算。如果索引超出范围,则返回 `undefined`。

```typescript
import { nth } from 'es-toolkit/compat';

const array = [1, 2, 3, 4, 5];

// 正索引
nth(array, 1);
// => 2

// 负索引 (从末尾开始)
nth(array, -1);
// => 5

nth(array, -2);
// => 4

// 超出范围的索引
nth(array, 10);
// => undefined

nth(array, -10);
// => undefined
```

`null` 或 `undefined` 被视为 `undefined`。

```typescript
import { nth } from 'es-toolkit/compat';

nth(null, 0); // undefined
nth(undefined, 0); // undefined
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要获取元素的数组。
- `index` (`number`, 可选): 要获取的元素的索引。如果为负数,则从末尾开始计算。默认为 `0`。

#### 返回值

(`T | undefined`): 返回指定索引处的元素。如果索引超出范围,则返回 `undefined`。
