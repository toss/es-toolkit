# fromPairs

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将一个二维数组转或Map类型数据转换成对象。

## 签名

```typescript
function fromPairs<T extends string | number | symbol, U>(data: Array<[T, U]> | Map<T, U>): { [key in T]: U };
```

### 参数

- `data` (`Array<[T, U]> | Map<T, U>`): 需要转换的二维数组或Map类型数据。二维数组的每个子数组应该有两个元素，第一个元素作为键，第二个元素作为值。

### 返回值

(`{ [key in T]: U }`): 转换后的对象，具有与输入参数相同的键和值。

## 示例

```typescript
const data = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(data);
// result 将会是 { a: 1, b: 2, c: 3 }
```
