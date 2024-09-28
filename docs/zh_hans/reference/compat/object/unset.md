# unset

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

删除对象中指定路径的属性。

## 签名

```typescript
function unset(obj: unknown, path: PropertyKey | PropertyKey[]): boolean;
```

### 参数

- `obj` (`unknown`): 要修改的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要取消设置的属性路径。

### 返回值

(`boolean`): 如果属性被删除则返回true，否则返回false。

## 示例

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
