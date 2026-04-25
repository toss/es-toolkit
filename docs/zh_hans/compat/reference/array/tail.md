# tail (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [tail](../../array/tail.md)

这个 `tail` 函数由于处理 `null` 或 `undefined` 等原因运行较慢。

请使用更快且现代的 `es-toolkit` 的 [tail](../../array/tail.md) 代替。

:::

返回数组中除第一个元素外的所有元素。

```typescript
const result = tail(array);
```

## 用法

### `tail(array)`

当您想要创建一个包含输入数组中除第一个元素外所有元素的新数组时,使用 `tail`。如果输入数组为空或只有一个元素,则返回空数组。

```typescript
import { tail } from 'es-toolkit/compat';

// 从数字数组中删除第一个元素。
tail([1, 2, 3]);
// Returns: [2, 3]

// 从字符串数组中删除第一个元素。
tail(['a', 'b', 'c']);
// Returns: ['b', 'c']

// 只有一个元素的数组。
tail([1]);
// Returns: []

// 空数组。
tail([]);
// Returns: []
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { tail } from 'es-toolkit/compat';

tail(null); // []
tail(undefined); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要删除第一个元素的数组。

#### 返回值

(`T[]`): 返回包含除第一个元素外的所有元素的新数组。
