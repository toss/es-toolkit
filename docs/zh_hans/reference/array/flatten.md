# flatten

将作为参数传递的嵌套数组展开到指定的深度。

它与 JavaScript 默认提供的 [Array.prototype.flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 功能相同，并返回相同的类型。不过，其性能更优秀。

## 签名

```typescript
function flatten<T, D extends number = 1>(arr: T[], depth?: D): Array<FlatArray<T[], D>>;
```

### 参数

- `arr` (`T[]`): 要展开的数组。
- `depth` (`D`): 展开的深度，默认为 1。

### 返回值

(`Array<FlatArray<T[], D>>`) 展开后的新数组。

## 示例

```typescript
const originArr = [1, [2, 3], [4, [5, 6]]];

const array1 = flatten(originArr);
// 返回 [1, 2, 3, 4, [5, 6]]

const array2 = flatten(originArr, 1);
// 返回 [1, 2, 3, 4, [5, 6]]

const array3 = flatten(originArr, 2);
// 返回 [1, 2, 3, 4, 5, 6]
```
