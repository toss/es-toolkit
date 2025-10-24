# flatMap

将数组的每个元素转换为函数返回的值,然后扁平化到指定深度,返回一个新数组。

```typescript
const result = flatMap(arr, iteratee, depth);
```

## 参考

### `flatMap(arr, iteratee, depth = 1)`

当您想在转换数组的每个元素的同时进行扁平化时,请使用 `flatMap`。首先对每个元素应用函数,然后将结果数组扁平化到指定深度。

与 JavaScript 内置的 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 和 [Array#map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 组合调用 `map(iteratee).flat(depth)` 的效果相同,但速度更快。

```typescript
import { flatMap } from 'es-toolkit/array';

// 将数字数组的每个元素复制两次
const arr = [1, 2, 3];
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// 扁平化深度为 2
flatMap(arr, item => [[item, item]], 2);
// Returns: [1, 1, 2, 2, 3, 3]
```

可以使用不同的深度进行扁平化。

```typescript
import { flatMap } from 'es-toolkit/array';

const arr = [1, 2, 3];

// 使用默认深度 1 进行扁平化
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// 使用深度 3 进行扁平化
flatMap(arr, item => [[[item, item]]], 3);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### 参数

- `arr` (`T[]`): 要转换的数组。
- `iteratee` (`(item: T) => U`): 转换每个数组元素的函数。
- `depth` (`D`, 可选): 扁平化的深度。默认值为 `1`。

#### 返回值

(`Array<FlatArray<U[], D>>`): 返回每个元素被转换并扁平化到指定深度的新数组。
