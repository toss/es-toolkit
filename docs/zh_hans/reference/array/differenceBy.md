# differenceBy

计算经过提供的函数映射后的两个数组之间的差异。

该函数接受两个数组和一个映射函数作为参数。它返回一个新数组，其中包含仅存在于第一个数组中但不在第二个数组中的元素，基于映射函数计算的标识。

本质上，它过滤掉第一个数组中任何映射后与第二个数组中映射版本的元素匹配的部分。

## 签名

```typescript
function differenceBy<T, U>(firstArr: T[], secondArr: T[], mapper: (value: T) => U): T[];
```

### 参数

- `firstArr` (`T[]`): 主要的数组，从中计算差异。
- `secondArr` (`T[]`): 包含要从第一个数组中排除的元素的数组。
- `mapper` (`(value: T) => U`): 用于映射两个数组元素的函数。该函数应用于两个数组中的每个元素，并基于映射后的值进行比较。

### 返回值

(`T[]`) 包含第一个数组中没有对应映射标识的元素的新数组。

## 示例

```typescript
import { differenceBy } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = differenceBy(array1, array2, mapper);
// 结果将是 [{ id: 1 }, { id: 3 }, { id: 5 }] 因为具有 id 为 2 的元素在两个数组中都存在，所以它们被排除在结果之外。
```
