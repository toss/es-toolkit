# intersection

返回一个由两个数组共同包含的元素组成的新数组。

```typescript
const result = intersection(firstArr, secondArr);
```

## 用法

### `intersection(firstArr, secondArr)`

当您想只查找两个数组的共同元素时,请使用 `intersection`。它从第一个数组的元素中,只返回第二个数组中也存在的元素组成的新数组。在求两个数据集的交集时很有用。

```typescript
import { intersection } from 'es-toolkit/array';

// 求数字数组的交集
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
intersection(numbers1, numbers2);
// Returns: [3, 4, 5]

// 求字符串数组的交集
const strings1 = ['apple', 'banana', 'cherry'];
const strings2 = ['banana', 'cherry', 'date'];
intersection(strings1, strings2);
// Returns: ['banana', 'cherry']
```

也能处理没有交集或特殊情况。

```typescript
import { intersection } from 'es-toolkit/array';

// 没有交集时返回空数组
const noCommon1 = [1, 2, 3];
const noCommon2 = [4, 5, 6];
intersection(noCommon1, noCommon2);
// Returns: []

// 一方为空数组时也返回空数组
const numbers = [1, 2, 3];
const empty: number[] = [];
intersection(numbers, empty);
// Returns: []
```

#### 参数

- `firstArr` (`readonly T[]`): 要比较的第一个数组。
- `secondArr` (`readonly T[]`): 要比较的第二个数组。

#### 返回值

(`T[]`): 返回由两个数组共同包含的元素组成的新数组。
