# difference

计算两个数组之间的差异。

该函数接受两个数组，并返回一个新数组，其中包含仅存在于第一个数组中但不在第二个数组中的元素。

它有效地过滤掉第一个数组中与第二个数组中出现的元素相匹配的部分。

## 签名

```typescript
function difference<T>(firstArr: T[], secondArr: T[]): T[];
```

### 参数

- `firstArr` (`T[]`): 要计算差异的数组。这是主要的数组，从中将比较和过滤元素。
- `secondArr` (`T[]`): 包含要从第一个数组中排除的元素的数组。将检查这个数组中的每个元素是否在第一个数组中，如果找到匹配，则将其从结果中排除。

### 返回值

(`T[]`) 包含仅存在于第一个数组中但不在第二个数组中的元素的新数组。

## 示例

```typescript
import { difference } from 'es-toolkit/array';

const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const result = difference(array1, array2);
// 结果将是 [1, 3, 5]，因为 2 和 4 都在两个数组中，所以它们被排除在结果之外。
```
