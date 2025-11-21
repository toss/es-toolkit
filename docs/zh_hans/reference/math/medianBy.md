# medianBy

通过对每个元素应用 `getValue` 函数来计算数组的中位数。

```typescript
const middle = medianBy(items, getValue);
```

## 用法

### `medianBy(items, getValue)`

当您想求对数组的每个元素应用函数后的结果的中位数时,请使用 `medianBy`。它对于计算对象数组中特定属性的中位数或在转换每个元素后求中位数很有用。对于具有奇数个元素的数组,返回正中间的值,对于具有偶数个元素的数组,返回中间两个值的平均值。如果给定空数组,则返回 `NaN`。

```typescript
import { medianBy } from 'es-toolkit/math';

// 计算对象数组中特定属性的中位数(奇数个)
const people = [{ age: 23 }, { age: 25 }, { age: 27 }, { age: 29 }, { age: 31 }];
const medianAge = medianBy(people, person => person.age);
// medianAge 为 27 (排序后的ages [23, 25, 27, 29, 31] 中的中间值)

// 计算对象数组中特定属性的中位数(偶数个)
const scores = [{ score: 80 }, { score: 90 }, { score: 85 }, { score: 95 }];
const medianScore = medianBy(scores, item => item.score);
// medianScore 为 87.5 (排序后的scores [80, 85, 90, 95] 中 (85 + 90) / 2)

// 计算字符串长度的中位数
const words = ['cat', 'elephant', 'dog', 'butterfly', 'ant'];
const medianLength = medianBy(words, word => word.length);
// medianLength 为 3 (长度 [3, 8, 3, 9, 3] 排序后为 [3, 3, 3, 8, 9] 中的中间值)

// 空数组返回 NaN
const emptyResult = medianBy([], x => x);
// emptyResult 为 NaN
```

#### 参数

- `items` (`readonly T[]`): 要计算中位数的数组。
- `getValue` (`(element: T) => number`): 从每个元素选择数值的函数。

#### 返回值

(`number`): 根据 `getValue` 函数,返回数组中所有值的中位数。如果数组为空,则返回 `NaN`。
