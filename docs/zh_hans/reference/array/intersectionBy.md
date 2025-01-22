# intersectionBy

返回基于映射函数的两个数组的交集。

该函数接受两个数组和一个映射函数。它返回一个新数组，该数组包含从第一个数组中选取的元素，这些元素在使用提供的函数进行映射后，在第二个数组中有匹配的映射元素。

它有效地过滤掉第一个数组中没有在第二个数组中具有相应映射值的元素。

## 签名

```typescript
function intersectionBy<T, U>(firstArr: T[], secondArr: U[], mapper: (item: T | U) => unknown): T[];
```

### 参数

- `firstArr` (`T[]`): 要比较的第一个数组。
- `secondArr` (`U[]`): 要比较的第二个数组。
- `mapper` (`(item: T | U) => unknown`): 用于映射两个数组元素以进行比较的函数。

### 返回值

(`T[]`) 包含第一个数组中具有第二个数组中对应映射值的元素的新数组。

## 示例

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = intersectionBy(array1, array2, mapper);
// 结果将是 [{ id: 2 }] 因为只有这个元素在两个数组中具有匹配的 id。

const array1 = [
  { id: 1, name: 'jane' },
  { id: 2, name: 'amy' },
  { id: 3, name: 'michael' },
];
const array2 = [2, 4];
const mapper = item => (typeof item === 'object' ? item.id : item);
const result = intersectionBy(array1, array2, mapper);
// 结果将是 [{ id: 2, name: 'amy' }] 因为只有这个元素具有与第二个数组元素相等的匹配 id。
```

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `intersectionBy` 以获得与 lodash 的完全兼容性。

- `intersectionBy` 可以接受多个类数组对象来查找公共元素。
- `intersectionBy` 可以将属性键作为迭代器使用。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [1.2, 2.4, 3.6];
const array2 = [2.5, 3.7];
const array3 = [2.6, 3.8];
const result = intersectionBy(array1, array2, array3, Math.floor);
// 结果是 [2.4, 3.6]，因为在应用 Math.floor 之后，公共元素是2和3。

const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
const array2 = [{ x: 2 }, { x: 3 }, { x: 4 }];
const result = intersectionBy(array1, array2, 'x');
// 结果是 [{ x: 2 }, { x: 3 }]，因为这些元素有相同的 `x` 属性。

const arrayLike1 = { 0: 'apple', 1: 'banana', 2: 'cherry', length: 3 };
const arrayLike2 = { 0: 'banana', 1: 'cherry', 2: 'date', length: 3 };
const result = intersectionBy(arrayLike1, arrayLike2);
// 结果是 ['banana', 'cherry']，因为这些元素在两个类数组对象中都存在。
```
