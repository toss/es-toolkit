# flatMapDeep

将数组的每个元素转换为函数返回的值,然后完全扁平化所有深度,返回一个新数组。

```typescript
const result = flatMapDeep(arr, iteratee);
```

## 用法

### `flatMapDeep(arr, iteratee)`

当您想在转换数组的每个元素的同时完全扁平化所有嵌套数组时,请使用 `flatMapDeep`。首先对每个元素应用函数,然后将结果数组扁平化到所有深度。

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// 将每个元素复制两次后完全扁平化
const result1 = flatMapDeep([1, 2, 3], item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]
```

无论嵌套多深的数组都会完全扁平化。

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// 嵌套数组也会完全扁平化
const result = flatMapDeep([1, 2, 3], item => [[item, item]]);
// Returns: [1, 1, 2, 2, 3, 3]

// 多层嵌套也会全部扁平化
const result2 = flatMapDeep([1, 2, 3], item => [[[item, item]]]);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### 参数

- `arr` (`T[]`): 要转换的数组。
- `iteratee` (`(item: T) => U`): 转换每个数组元素的函数。

#### 返回值

(`Array<ExtractNestedArrayType<U>>`): 返回每个元素被转换并完全扁平化所有深度的新数组。
