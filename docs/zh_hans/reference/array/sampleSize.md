# sampleSize

从数组中随机选择指定数量的元素,返回由这些元素组成的新数组。

```typescript
const sampled = sampleSize(array, size);
```

## 用法

### `sampleSize(array, size)`

当您想从数组中随机抽样多个元素时,请使用 `sampleSize`。使用 Floyd 算法高效生成无重复的随机样本。在问卷调查中抽取样本或游戏中随机选择多个道具时非常有用。

```typescript
import { sampleSize } from 'es-toolkit/array';

// 从数字数组中随机选择3个
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomNumbers = sampleSize(numbers, 3);
// Returns: [2, 7, 9] (示例,实际是随机的)

// 从字符串数组中随机选择2个
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const randomFruits = sampleSize(fruits, 2);
// Returns: ['cherry', 'apple'] (示例,实际是随机的)
```

可以按不同大小进行抽样。

```typescript
import { sampleSize } from 'es-toolkit/array';

const items = ['a', 'b', 'c', 'd', 'e'];

// 选择1个
const single = sampleSize(items, 1);
// Returns: ['c'] (示例)

// 选择与整个数组大小相同的数量(洗牌效果)
const all = sampleSize(items, 5);
// Returns: ['b', 'd', 'a', 'e', 'c'] (示例)

// 选择空数组
const none = sampleSize(items, 0);
// Returns: []
```

#### 参数

- `array` (`readonly T[]`): 要进行抽样的数组。
- `size` (`number`): 要选择的元素数量。

#### 返回值

(`T[]`): 返回由随机选择的元素组成的新数组。

#### 错误

如果 `size` 大于数组的长度,会抛出错误。
