# intersection

返回两个数组的交集。

该函数接受两个数组并返回一个新数组，该数组包含同时存在于两个数组中的元素。

它有效地过滤掉第一个数组中不在第二个数组中的元素。

## 签名

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### 参数

- `firstArr` (`T[]`): 要比较的第一个数组。
- `secondArr` (`T[]`): 要比较的第二个数组。

### 返回值

(`T[]`) 包含同时存在于两个数组中的元素的新数组。

## 示例

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// 结果将是 [3, 4, 5] 因为这些元素在两个数组中都存在。
```

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `intersection` 以获得与 lodash 的完全兼容性。

- `intersection` 可以接受多个类数组对象来查找公共元素。
- `intersection` 仅返回唯一元素。

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3, 4, 4, 5];
const array2 = [2, 4];
const array3 = [4, 6];
const result = intersection(array1, array2, array3);
// 结果是 [4]，因为这个唯一的元素在每个数组中都存在。

const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, length: 2 };
const result2 = intersection(arrayLike1, arrayLike2);
// 结果2是 [2, 3]，因为这些元素在两个类数组对象中都存在。
```
