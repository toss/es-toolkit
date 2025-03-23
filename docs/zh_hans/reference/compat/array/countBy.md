# countBy

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个对象，该对象由通过 `iteratee` 运行 `collection` 的每个元素生成的键组成。每个键对应的值是键被返回的次数。

## 签名

```typescript
function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
function countBy<T, K extends PropertyKey>(
  collection: ArrayLike<T> | Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
```

### 返回值

(`undefined`): undefined

## 示例

```typescript
countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
countBy(['one', 'two', 'three'], 'length'); // => { '3': 2, '5': 1 }
countBy({ a: 'apple', b: 'banana' }, v => v[0]); // => { 'a': 1, 'b': 1 }
```
