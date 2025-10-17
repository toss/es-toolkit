# values (Lodash 兼容性)

::: warning 请使用 `Object.values`

此 `values` 函数只是简单调用 `Object.values`,存在不必要的开销。

请直接使用更快、更现代的 `Object.values()`。

:::

返回对象自身可枚举属性值的数组。

```typescript
const valueArray = values(object);
```

## 签名

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### 参数

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): 要查询属性值的对象。

### 返回值

(`T[]`): 属性值的数组。

## 示例

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
