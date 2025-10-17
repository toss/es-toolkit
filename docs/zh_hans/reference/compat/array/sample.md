# sample（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 [sample](../../array/sample.md)

此 `sample` 函数由于 `null` 或 `undefined` 处理、对象值处理等原因运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [sample](../../array/sample.md)。

:::

从数组或对象中获取一个随机元素。

```typescript
const randomItem = sample(collection);
```

## 参考

### `sample(collection)`

当需要从数组或对象中选择一个随机元素时，使用 `sample`。对于数组，返回一个随机元素，对于对象，返回一个随机值。

```typescript
import { sample } from 'es-toolkit/compat';

// 从数组中获取随机元素
sample([1, 2, 3, 4, 5]);
// 返回1到5之间的随机数字

// 从对象中获取随机值
sample({ a: 1, b: 2, c: 3 });
// 返回1、2、3中的随机值

// 也可以处理字符串
sample('hello');
// 返回 'h'、'e'、'l'、'l'、'o' 中的随机字符
```

`null` 或 `undefined` 返回 `undefined`。

```typescript
import { sample } from 'es-toolkit/compat';

sample(null); // undefined
sample(undefined); // undefined
```

#### 参数

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`)：要采样的数组或对象。

#### 返回值

(`T | string | undefined`)：返回从数组或对象中随机选择的元素。如果集合为空或为 `null`、`undefined`，则返回 `undefined`。
