# forEach

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

从右到左迭代 `arr` 数组的每个元素，并对每个元素调用 `callback` 函数。

如果 `callback` 函数返回 `false`，则停止迭代。

此函数是 [forEach](./forEach.md) 的别名。

### 参数

```ts
function forEach<T extends object>(object: T, callback: (value: T[keyof T], key: keyof T, object: T) => void): T;
```

### 参数

- `object` (`T`): 要迭代的对象。
- `callback` (`(value: T[keyof T], key: keyof T, object: T)`): 每次迭代调用的函数。
  - `value`: 当前正在处理的对象属性的值。
  - `key`: 当前正在处理的对象属性的键。
  - `object`: 调用 `forEach` 的对象。

### 返回值

(`T`): 调用 `forEach` 的对象。

## 示例

```ts
import { forEach } from 'es-toolkit/compat';

const object = { a: 1, b: 2 };
forEach(object, (value, key, object) => console.log(value, key));
// Output:
// 1 'a'
// 2 'b'
```
