# result

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检索对象给定路径的值。
如果解析后的值是函数，则使用对象作为其`this`上下文进行调用。
如果值是`undefined`，则返回`defaultValue`。

## 签名

```typescript
function result<T>(
  object: unknown,
  path: string | number | symbol | ReadonlyArray<string | number | symbol>,
  defaultValue?: T | ((...args: unknown[]) => T)
): T;
```

### 参数

- `object` (`unknown`): 要查询的对象。
- `path` (`string | number | symbol | ReadonlyArray<string | number | symbol>`): 要获取的属性的路径。
- `defaultValue` (`T | ((...args: unknown[]) => T)`): 如果解析后的值是`undefined`，则返回的值。

### 返回值

(`T`): 返回解析后的值。

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
