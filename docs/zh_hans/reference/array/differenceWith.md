# differenceWith

根据自定义相等函数计算两个数组之间的差异。

该函数接受两个数组和一个自定义比较函数作为参数。它返回一个新数组，其中包含仅存在于第一个数组中但不在第二个数组中的元素。

判断元素是否相等是使用提供的自定义函数进行的。

## 签名

```typescript
function differenceWith<T, U>(firstArr: T[], secondArr: U[], areItemsEqual: (x: T, y: U) => boolean): T[];
```

### 参数

- `firstArr` (`T[]`): 要获取差异的数组。
- `secondArr` (`U[]`): 包含要从第一个数组中排除的元素的数组。
- `areItemsEqual` (`(x: T, y: U) => boolean`): 用于确定两个项是否相等的函数。

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

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [2, 4];
const areItemsEqual = (a, b) => a.id === b;
const result = differenceWith(array1, array2, areItemsEqual);
// 结果将是 [{ id: 1 }, { id: 3 }] 因为具有 id 为 2 的元素被认为与第二个数组的元素相等，因此被排除在结果之外。
```

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `differenceWith` 以获得与 lodash 的完全兼容性。

- `differenceWith` 可以接受多个数组与第一个数组进行比较。
- `differenceWith` 可以接受类数组对象作为参数。
- `differenceWith` はカスタム比較関数を省略することができます。省略された場合、デフォルトで [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) アルゴリズムが使用されます。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 示例 1: 接受多个数组进行比较，并使用比较函数
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values1, values2, comparator);
// 结果是 [{ id: 1 }]。根据比较标准，这个元素仅存在于第一个数组中。

// 示例 2: 接受类数组对象作为参数，并使用比较函数
const array = { 0: { id: 1 }, 1: { id: 2 }, 2: { id: 3 }, length: 3 };
const values = { 0: { id: 2 }, 1: { id: 3 }, length: 2 };
const comparator = (a, b) => a.id === b.id;

const result2 = differenceWith(array, values, comparator);
// 结果是 [{ id: 1 }]。根据比较标准，这个元素仅存在于第一个类数组对象中。

// 示例 3: 省略自定义比较函数
const array = [1, 2, 3];
const values1 = [2];
const values2 = [3];

const result3 = differenceWith(array, values1, values2);
// 结果是 [1]。这个元素在所有数组中唯一存在。
```
