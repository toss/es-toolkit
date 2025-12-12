# flattenDeep

完全扁平化嵌套数组的所有深度,返回一个新数组。

```typescript
const result = flattenDeep(arr);
```

## 用法

### `flattenDeep(arr)`

当您想完全扁平化嵌套数组,无论嵌套多深时,请使用 `flattenDeep`。它将数组内的所有嵌套数组展开,形成一个平面结构。

与 JavaScript 内置的 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 调用 `flat(Infinity)` 的效果相同,但速度更快。

```typescript
import { flattenDeep } from 'es-toolkit/array';

// 扁平化所有嵌套级别
const array = [1, [2, [3]], [4, [5, 6]]];
const result = flattenDeep(array);
// Returns: [1, 2, 3, 4, 5, 6]
```

无论多复杂的嵌套结构都会完全扁平化。

```typescript
import { flattenDeep } from 'es-toolkit/array';

const complexArray = [1, [2, [3, [4, [5]]]], 6];
const result = flattenDeep(complexArray);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### 参数

- `arr` (`T[]`): 要扁平化的嵌套数组。

#### 返回值

(`Array<ExtractNestedArrayType<T>>`): 返回完全扁平化所有深度的新数组。
