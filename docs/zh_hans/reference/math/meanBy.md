# meanBy

通过对每个元素应用 `getValue` 函数来计算数组的平均值。

```typescript
const average = meanBy(items, getValue);
```

## 用法

### `meanBy(items, getValue)`

当您想求对数组的每个元素应用函数后的结果的平均值时,请使用 `meanBy`。它对于计算对象数组中特定属性的平均值或在转换每个元素后求平均值很有用。如果给定空数组,则返回 `NaN`。

```typescript
import { meanBy } from 'es-toolkit/math';

// 计算对象数组中特定属性的平均值
const people = [{ age: 23 }, { age: 25 }, { age: 27 }];
const averageAge = meanBy(people, person => person.age);
// averageAge 为 25 ((23 + 25 + 27) / 3 = 75 / 3 = 25)

// 计算字符串长度的平均值
const words = ['apple', 'banana', 'cherry'];
const averageLength = meanBy(words, word => word.length);
// averageLength 约为 5.67 ((5 + 6 + 6) / 3 ≈ 5.67)

// 空数组返回 NaN
const emptyResult = meanBy([], x => x);
// emptyResult 为 NaN
```

#### 参数

- `items` (`readonly T[]`): 要计算平均值的数组。
- `getValue` (`(element: T) => number`): 从每个元素选择数值的函数。

#### 返回值

(`number`): 根据 `getValue` 函数,返回数组中所有值的平均值。如果数组为空,则返回 `NaN`。
