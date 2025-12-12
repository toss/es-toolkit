# flatten

将嵌套数组扁平化到指定深度,返回一个新数组。

```typescript
const result = flatten(arr, depth);
```

## 用法

### `flatten(arr, depth = 1)`

当您想将嵌套数组扁平化到特定深度时,请使用 `flatten`。它将数组内的数组展开到指定级别,形成平面结构。

与 JavaScript 内置的 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 效果相同,但速度更快。

```typescript
import { flatten } from 'es-toolkit/array';

// 使用默认深度 1 进行扁平化
const array = [1, [2, 3], [4, [5, 6]]];
flatten(array);
// Returns: [1, 2, 3, 4, [5, 6]]

// 使用深度 2 进行扁平化
flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

可以调整深度,只扁平化到想要的级别。

```typescript
import { flatten } from 'es-toolkit/array';

const array = [1, [2, 3], [4, [5, 6]]];

// 使用深度 1 进行扁平化(默认值)
const result1 = flatten(array, 1);
// Returns: [1, 2, 3, 4, [5, 6]]

// 使用深度 2 进行扁平化
const result2 = flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### 参数

- `arr` (`T[]`): 要扁平化的嵌套数组。
- `depth` (`D`, 可选): 扁平化的深度。默认值为 `1`。

#### 返回值

(`Array<FlatArray<T[], D>>`): 返回扁平化到指定深度的新数组。
