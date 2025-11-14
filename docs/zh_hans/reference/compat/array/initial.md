# initial (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [initial](../../array/initial.md)

此 `initial` 函数由于 `ArrayLike` 对象处理和数组转换过程而运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [initial](../../array/initial.md)。

:::

返回一个新数组，其中包含数组中除最后一个元素外的所有元素。

```typescript
const result = initial(array);
```

## 用法

### `initial(array)`

返回一个新数组，其中包含数组或类数组对象中除最后一个元素外的所有元素。如果数组为空或只有一个元素，则返回空数组。

```typescript
import { initial } from 'es-toolkit/compat';

// 从数字数组中排除最后一个元素
const numbers = [1, 2, 3, 4];
const result = initial(numbers);
// result 为 [1, 2, 3]

// 从字符串数组中排除最后一个元素
const strings = ['a', 'b', 'c', 'd'];
const withoutLast = initial(strings);
// withoutLast 为 ['a', 'b', 'c']

// 类数组对象
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const items = initial(arrayLike);
// items 为 ['x', 'y']
```

空数组或无效输入返回空数组。

```typescript
import { initial } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const result = initial(emptyArray);
// result 为 []

const singleItem = [42];
const onlyOne = initial(singleItem);
// onlyOne 为 []

initial(null); // []
initial(undefined); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要排除最后一个元素的数组或类数组对象。

#### 返回值

(`T[]`): 返回排除最后一个元素的新数组。
