# values

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个包含`object`自身可枚举属性值的数组。

非对象值将被强制转换为对象。

## 签名

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### 参数

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): 要查询的对象。

### 返回值

(`T[]`): 属性值数组。

## 示例

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
