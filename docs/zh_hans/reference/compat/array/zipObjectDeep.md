# zipObjectDeep

::: info
此功能在我们的[兼容性库](../../compatibility.md)中可用，`es-toolkit/compat`。
:::

给定路径和值的数组，创建一个深层嵌套的对象。

此函数接受两个数组：一个包含属性路径的数组，另一个包含相应值的数组。它返回一个新对象，其中第一个数组的路径用作键路径来设置值，并将第二个数组中的对应元素作为值。路径可以是点分隔的字符串或属性名称的数组。如果 `keys` 数组比 `values` 数组长，剩余的键的值将为 `undefined`。

## 签名

```typescript
function zipObjectDeep<P extends string | number | symbol, V>(keys: P[], values: V[]): { [K in P]: V }
```

### 参数

- `keys` (`P[]`): 属性名称的数组。
- `values` (`V[]`): 与属性名称对应的值的数组。

### 返回值

(`{ [K in P]: V }`): 由给定的属性名称和值组成的新对象。

## 示例

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// 结果将是 { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

const paths = [['a', 'b', 'c'], ['d', 'e', 'f']];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// 结果将是 { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

const paths = ['a.b[0].c', 'a.b[1].d'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// 结果将是 { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```
