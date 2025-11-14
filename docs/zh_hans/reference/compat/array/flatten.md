# flatten (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `flatten`

此 `flatten` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理、支持各种条件函数格式等而运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [flatten](../../array/flatten.md)。

:::

将数组展平一层。

```typescript
const result = flatten(array, depth);
```

## 用法

### `flatten(value, depth)`

按指定深度展平嵌套数组。默认情况下只展平一层,并且还支持 Arguments 对象和具有 Symbol.isConcatSpreadable 的对象。

```typescript
import { flatten } from 'es-toolkit/compat';

// 基本展平(一层)
flatten([1, [2, [3, [4]], 5]]);
// 结果: [1, 2, [3, [4]], 5]

// 指定深度
flatten([1, [2, [3, [4]], 5]], 2);
// 结果: [1, 2, 3, [4], 5]

// 支持 Arguments 对象
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// 结果: [1, 2, 3, [4]]
```

空数组、null 或 undefined 返回空数组。

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

具有 Symbol.isConcatSpreadable 的对象也像数组一样被展平。

```typescript
import { flatten } from 'es-toolkit/compat';

const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// 结果: [1, 'a', 'b', 3]
```

#### 参数

- `value` (`ArrayLike<T> | null | undefined`): 要展平的数组。
- `depth` (`number`, 可选): 要展平的最大深度。默认为 `1`。

#### 返回值

(`T[]`): 返回新的展平数组。
