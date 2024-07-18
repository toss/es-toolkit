# flattenDeep

展开嵌套数组的所有深度。

此函数的工作方式与在 JavaScript 语言中调用 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 时使用 `flat(Infinity)` 相同，但速度更快。

## 签名

```typescript
// 用于递归解包嵌套数组类型，以提取最内层元素的类型。
type ExtractNestedArrayType<T> = T extends ReadonlyArray<infer U> ? ExtractNestedArrayType<U> : T;

function flattenDeep<T>(arr: T[]): Array<ExtractNestedArrayType<T>>;
```

### 参数

- `arr` (`T[]`): 要展开的数组。

### 返回值

(`Array<ExtractNestedArrayType<T>>`): 展开所有深度后的新数组。

## 示例

```typescript
const array = [1, [2, [3]], [4, [5, 6]]];

const result = flattenDeep(array);
// 返回 [1, 2, 3, 4, 5, 6]
```
