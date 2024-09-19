# property

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

`property` 函数创建一个新函数，用于从对象中获取指定路径的值。它利用 [`get`](./get.md) 函数来获取值。

## 签名

```typescript
function property(path: PropertyKey | readonly PropertyKey[]): (object: unknown) => any;
```

### 参数

- `path` (`string` | `number` | `symbol` | `Array<string | number | symbol>`): 要获取的属性路径。

### 返回值

- `(object: unknown) => any`: 一个函数，接收一个对象并返回指定路径的值。

## 示例

```typescript
import { property } from 'es-toolkit/compat';

const getObjectValue = property('a.b.c');
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3

const getObjectValue = property(['a', 'b', 'c']);
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3
```
