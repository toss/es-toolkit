# shuffle

返回一个元素顺序被随机打乱的新数组。

```typescript
const shuffled = shuffle(arr);
```

## 参考

### `shuffle(arr)`

当您想随机打乱数组中的元素顺序时,请使用 `shuffle`。使用 Fisher-Yates 算法保证完美的随机洗牌,使所有排列都以相同的概率出现。在纸牌游戏中洗牌、随机化测验题目顺序或播放列表随机播放时非常有用。

```typescript
import { shuffle } from 'es-toolkit/array';

// 打乱数字数组
const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);
// Returns: [3, 1, 4, 5, 2] (示例,实际是随机的)
console.log(numbers); // [1, 2, 3, 4, 5] (原数组未改变)

// 打乱字符串数组
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffledFruits = shuffle(fruits);
// Returns: ['cherry', 'apple', 'date', 'banana'] (示例,实际是随机的)
```

可以打乱各种类型的数组。

```typescript
import { shuffle } from 'es-toolkit/array';

// 打乱对象数组
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const shuffledUsers = shuffle(users);
// Returns: 用户对象以随机顺序排列的新数组

// 打乱混合类型数组
const mixed = [1, 'hello', true, { key: 'value' }];
const shuffledMixed = shuffle(mixed);
// Returns: 元素以随机顺序排列的新数组
```

#### 参数

- `arr` (`readonly T[]`): 要打乱的数组。

#### 返回值

(`T[]`): 返回元素以随机顺序排列的新数组。原数组不会被修改。
