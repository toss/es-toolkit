# has

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查给定路径在对象中是否存在。

您可以提供路径作为单个属性键、属性键数组，或表示深层路径的字符串。

如果路径是索引，且对象是数组或参数对象，函数将验证索引是否有效，并且在数组或参数对象的范围内，
即使数组或参数对象是稀疏的（即，并非所有索引都被定义）。

## 签名

function has(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;

### 参数

- `object` (`unknown`): 要查询的对象。
- `path` (`string` 或 `number` 或 `symbol` 或 `Array<string | number | symbol>`): 要检查的路径。这可以是单个属性键、属性键数组或表示深层路径的字符串。

### 返回值

(`boolean`): 如果路径在对象中存在，则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

has(obj, 'a'); // true
has(obj, ['a', 'b']); // true
has(obj, ['a', 'b', 'c']); // true
has(obj, 'a.b.c'); // true
has(obj, 'a.b.d'); // false
has(obj, ['a', 'b', 'c', 'd']); // false
has([], 0); // false
has([1, 2, 3], 2); // true
has([1, 2, 3], 5); // false
```

## 演示

::: sandpack

```ts index.ts
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

console.log(has(obj, 'a.b.c'));
```

:::
