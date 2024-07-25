# property

::: info
此函数与 lodash 完全兼容。您可以在我们的[兼容性库](../../../compatibility.md)中找到它，`es-toolkit/compat`。
:::

`property` 函数创建一个新函数，用于从对象中获取指定路径的值。它利用 [`get`](./get.md) 函数来获取值。

## 签名

```typescript
function property(path: PropertyKey | readonly PropertyKey[]): (object: unknown) => any
```

### 参数

- `path` (`string` | `number` | `symbol` | `Array<string | number | symbol>`): 要获取的属性路径。

### 返回值

- `(object: unknown) => any`: 一个函数，接收一个对象并返回指定路径的值。

### 示例

```typescript
import { property } from 'es-toolkit/compat';

const getObjectValue = property('a.b.c');
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3

const getObjectValue = property(['a', 'b', 'c']);
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3
```