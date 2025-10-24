# zipObject (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [zipObject](../../array/zipObject.md)

此 `zipObject` 函数由于为 Lodash 兼容性进行额外处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [zipObject](../../array/zipObject.md)。

:::

使用两个数组创建一个对象。第一个数组用作属性名称,第二个数组用作相应的值。

```typescript
const result = zipObject(keys, values);
```

## 参考

### `zipObject(keys, values)`

当您想要从键数组和值数组创建单个对象时,请使用 `zipObject`。它使用第一个数组的元素作为属性名称,第二个数组的元素作为其相应的值。这在处理 API 响应或转换数据时特别有用。

```typescript
import { zipObject } from 'es-toolkit/compat';

// 基本用法
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const result = zipObject(keys, values);
// 返回: { a: 1, b: 2, c: 3 }

// 不同长度的数组
const keys2 = ['x', 'y', 'z'];
const values2 = [10, 20];
const result2 = zipObject(keys2, values2);
// 返回: { x: 10, y: 20, z: undefined }

// 提供空数组
const result3 = zipObject([], []);
// 返回: {}
```

#### 参数

- `keys` (`PropertyKey[]`): 用作属性名称的数组。
- `values` (`T[]`): 用作属性值的数组。

#### 返回值

(`Record<PropertyKey, T>`): 创建的对象。
