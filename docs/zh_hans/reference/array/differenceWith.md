# differenceWith

根据自定义相等函数计算两个数组之间的差异。

该函数接受两个数组和一个自定义比较函数作为参数。它返回一个新数组，其中包含仅存在于第一个数组中但不在第二个数组中的元素。

判断元素是否相等是使用提供的自定义函数进行的。

## 签名

```typescript
function differenceWith<T>(firstArr: T[], secondArr: T[], areItemsEqual: (x: T, y: T) => boolean): T[];
```

### 参数

- `firstArr` (`T[]`): 要获取差异的数组。
- `secondArr` (`T[]`): 包含要从第一个数组中排除的元素的数组。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 用于确定两个项是否相等的函数。

### 返回值

(`T[]`) 一个新数组，包含根据自定义相等函数，第一个数组中与第二个数组中任何元素不匹配的元素。

## 示例

```typescript
import { differenceWith } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = differenceWith(array1, array2, areItemsEqual);
// 结果将是 [{ id: 1 }, { id: 3 }] 因为具有 id 为 2 的元素被认为是相等的，因此被排除在结果之外。
```
