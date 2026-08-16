# flatten (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `flatten`

此 `flatten` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理等原因运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [flatten](../../../reference/array/flatten.md)。

:::

将数组展平一层。

```typescript
const result = flatten(array);
```

## 用法

### `flatten(array)`

将嵌套数组展平一层。

```typescript
import { flatten } from 'es-toolkit/compat';

// 基本展平(一层)
flatten([1, [2, [3, [4]], 5]]);
// 结果: [1, 2, [3, [4]], 5]

// 支持 Arguments 对象
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// 结果: [1, 2, 3, [4]]

// 支持具有 Symbol.isConcatSpreadable 的对象
const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// 结果: [1, 'a', 'b', 3]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要展平的数组。

#### 返回值

(`T[]`): 返回新的展平数组。
