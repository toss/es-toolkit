# sample

从数组中随机返回一个元素。

```typescript
const randomElement = sample(arr);
```

## 用法

### `sample(arr)`

当您想从数组中随机获取一个元素时,请使用 `sample`。在游戏中选择随机道具、随机获取测试数据或进行抽签时非常有用。

```typescript
import { sample } from 'es-toolkit/array';

// 从数字数组中随机选择一个
const numbers = [1, 2, 3, 4, 5];
const randomNumber = sample(numbers);
// Returns: 1, 2, 3, 4, 5 中的一个

// 从字符串数组中随机选择一个
const fruits = ['apple', 'banana', 'cherry', 'date'];
const randomFruit = sample(fruits);
// Returns: 'apple', 'banana', 'cherry', 'date' 中的一个

// 从对象数组中随机选择一个
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const randomUser = sample(users);
// Returns: 三个用户中随机选择一个
```

也可以用于各种类型的数组。

```typescript
import { sample } from 'es-toolkit/array';

// 布尔数组
const booleans = [true, false];
const randomBoolean = sample(booleans);
// Returns: true 或 false

// 混合类型数组
const mixed = [1, 'hello', { key: 'value' }, [1, 2, 3]];
const randomItem = sample(mixed);
// Returns: 数组中的任意元素
```

#### 参数

- `arr` (`readonly T[]`): 要随机选择元素的数组。

#### 返回值

(`T`): 从数组中随机选择的元素。
