# union (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [union](../../array/union.md)

此 `union` 函数由于复杂的数组处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [union](../../array/union.md)。

:::

从多个数组中创建一个仅包含唯一值的新数组。

```typescript
const result = union(...arrays);
```

## 用法

### `union(...arrays)`

当您想要合并多个数组并去除重复项以创建仅包含唯一值的新数组时，请使用 `union`。保留每个值首次出现的顺序。

```typescript
import { union } from 'es-toolkit/compat';

// 合并数字数组
union([2], [1, 2]);
// 返回: [2, 1]

// 合并多个数组
union([2], [1, 2], [2, 3]);
// 返回: [2, 1, 3]

// 嵌套数组不会被展平
union([1, 3, 2], [1, [5]], [2, [4]]);
// 返回: [1, 3, 2, [5], [4]]

// 非数组值会被忽略
union([0], 3, { '0': 1 }, null, [2, 1]);
// 返回: [0, 2, 1]

// 类数组对象也会被处理
union([0], { 0: 'a', length: 1 }, [2, 1]);
// 返回: [0, 'a', 2, 1]
```

`null` 或 `undefined` 会被忽略。

```typescript
import { union } from 'es-toolkit/compat';

union([1, 2], null, undefined, [3, 4]);
// 返回: [1, 2, 3, 4]
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 要合并的数组。非数组值会被忽略。

#### 返回值

(`T[]`): 返回一个包含所有数组唯一值的新数组。
