# flatMap

将嵌套数组的每个元素映射到给定的迭代函数，然后将其展平到所需的深度。

其工作方式与在 JavaScript 语言中调用 [Array#flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 和 [Array#map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 时相同，即 `map(iteratee).flat(depth)`，但速度更快。

## 签名

```typescript
function flatMap<T, U, D extends number = 1>(arr: T[], iteratee: (item: T) => U, depth?: D): Array<FlatArray<U[], D>>;
```

### 参数

- `arr` (`T[]`): 要展平的数组。
- `iteratee` (`T[]`): 映射每个数组元素的函数。
- `depth` (`D`): 要展平的深度，默认为 1。

### 返回值

(`Array<FlatArray<U[], D>>`): 一个新数组，其中每个元素都已映射并展平到所需的深度。

## 示例

```typescript
const array = [1, 2, 3];

const result1 = flatMap(array, item => [item, item], 1);
// 返回 [1, 1, 2, 2, 3, 3]

const result2 = flatMap(array, item => [[item, item]], 2);
// 返回 [1, 1, 2, 2, 3, 3]

const result3 = flatMap(array, item => [[[item, item]]], 3);
// 返回 [1, 1, 2, 2, 3, 3]
```
