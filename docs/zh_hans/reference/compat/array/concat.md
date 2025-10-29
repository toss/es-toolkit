# concat（Lodash 兼容性）

::: warning 使用展开运算符或 [`Array#concat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

此 `concat` 函数由于 Lodash 数组连接方式复杂而效率低下。

请使用更直观、更现代的展开运算符 `[...arr1, ...arr2]` 或使用 `Array#concat` 的 `arr1.concat(arr2)`。

:::

将多个数组和值合并为一个数组。

```typescript
const result = concat(...values);
```

## 参考

### `concat(...values)`

当你想要按顺序连接多个值和数组来创建一个新数组时,使用 `concat`。数组会被展开,单个值会直接添加。

```typescript
import { concat } from 'es-toolkit/compat';

// 连接单个值
concat(1, 2, 3);
// Returns: [1, 2, 3]

// 连接数组
concat([1, 2], [3, 4]);
// Returns: [1, 2, 3, 4]

// 连接值和数组
concat(1, [2, 3], 4);
// Returns: [1, 2, 3, 4]
```

嵌套数组只展开一层。

```typescript
import { concat } from 'es-toolkit/compat';

// 嵌套数组只展开一层
concat([1, [2, 3]], 4);
// Returns: [1, [2, 3], 4]

// 更深层嵌套的数组
concat([1, [2, [3, 4]]], 5);
// Returns: [1, [2, [3, 4]], 5]
```

也可以处理空数组和空值。

```typescript
import { concat } from 'es-toolkit/compat';

// 与空数组一起
concat([], [1, 2], [], [3]);
// Returns: [1, 2, 3]

// 没有值的情况
concat();
// Returns: []
```

#### 参数

- `values` (`...(T | readonly T[])`): 要连接的值和数组。每个数组都会展开一层。

#### 返回值

(`T[]`): 返回按顺序连接所有值和数组元素的新数组。
