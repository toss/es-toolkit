# propertyOf

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，该函数返回对象中特定路径的值。

与 `property` 不同，`property` 创建一个绑定到特定路径的函数，允许您查询不同的对象，
`propertyOf` 创建一个绑定到特定对象的函数，允许您查询该对象内的不同路径。

## 签名

```typescript
function propertyOf(object: unknown): (path: PropertyKey | PropertyKey[]) => unknown;
```

### 参数

- `object` (`unknown`): 要查询的对象。

### 返回值

(`(path: PropertyKey | PropertyKey[]) => unknown`): 返回一个新函数，该函数接受一个路径并从指定路径的对象中检索值。

## 示例

```typescript
const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue('a.b.c');
console.log(result); // => 3

const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue(['a', 'b', 'c']);
console.log(result); // => 3
```
