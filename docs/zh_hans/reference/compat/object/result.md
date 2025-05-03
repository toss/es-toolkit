# result

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

从对象的给定路径获取值。

与[get](./get.md)函数的基本操作相同，但如果在查找值的过程中遇到函数，则会调用该函数并继续。

如果找到的值为`undefined`，则返回默认值，如果默认值是函数，则调用该函数。

## 签名

```typescript
function result(
  object: any,
  path: PropertyKey | PropertyKey[],
  defaultValue?: any | ((...args: any[]) => any)
): any;
```

### 参数

- `object` (`any`): 要查询的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要获取的属性的路径。
- `defaultValue` (`any`): 如果解析后的值是`undefined`，则返回的值。

### 返回值

(`any`): 返回解析后的值。

## 示例

```typescript
const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.c');
// => 3

const obj = { a: () => 5 };
result(obj, 'a');
// => 5 (calls the function `a` and returns its result)

const obj = { a: { b: null } };
result(obj, 'a.b.c', 'default');
// => 'default'

const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.d', () => 'default');
// => 'default'
```
