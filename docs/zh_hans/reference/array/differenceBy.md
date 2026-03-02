# differenceBy

将两个数组的元素通过转换函数转换后求差集,返回一个新数组。

```typescript
const result = differenceBy(firstArr, secondArr, mapper);
```

## 用法

### `differenceBy(firstArr, secondArr, mapper)`

当您想根据特定标准比较两个数组的元素并求差集时,请使用 `differenceBy`。根据转换函数转换每个元素后的值进行比较,返回只在第一个数组中存在的元素。

```typescript
import { differenceBy } from 'es-toolkit/array';

// 根据 id 对对象数组求差集。
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
differenceBy(array1, array2, item => item.id);
// 返回: [{ id: 1 }, { id: 3 }]
// id 为 2 的元素在两个数组中都存在,所以被排除。

// 也可以比较不同类型的数组。
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
differenceBy(objects, numbers, item => (typeof item === 'object' ? item.id : item));
// 返回: [{ id: 1 }, { id: 3 }]
```

也可以根据字符串长度求差集。

```typescript
import { differenceBy } from 'es-toolkit/array';

const words1 = ['apple', 'banana', 'cherry'];
const words2 = ['grape', 'lemon'];
differenceBy(words1, words2, word => word.length);
// 返回: ['banana', 'cherry']
// 'apple' 与 'grape' 或 'lemon' 长度相同,所以被排除。
```

#### 参数

- `firstArr` (`T[]`): 作为差集基准的数组。
- `secondArr` (`U[]`): 包含要从第一个数组中排除的元素的数组。
- `mapper` (`(value: T | U) => unknown`): 映射两个数组元素的函数。根据此函数返回的值比较元素。

#### 返回值

(`T[]`): 根据转换后的值,包含只在第一个数组中存在的元素的新数组。
