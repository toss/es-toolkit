# uniq

返回去除数组中重复元素后的新数组。

```typescript
const uniqueArray = uniq(arr);
```

## 用法

### `uniq(arr)`

当您想去除数组中的重复值,只保留唯一值时,请使用 `uniq`。它会保持原数组中首次出现的顺序。

```typescript
import { uniq } from 'es-toolkit/array';

// 从数字数组中去除重复项。
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// 从字符串数组中去除重复项。
const words = ['apple', 'banana', 'apple', 'cherry', 'banana'];
const uniqueWords = uniq(words);
console.log(uniqueWords); // ['apple', 'banana', 'cherry']

// 从对象数组中去除引用相同的对象。
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj1, obj3, obj2];
const uniqueObjects = uniq(objects);
console.log(uniqueObjects); // [{ id: 1 }, { id: 2 }, { id: 3 }]
```

对于空数组返回空数组。

```typescript
import { uniq } from 'es-toolkit/array';

const emptyArray = uniq([]);
console.log(emptyArray); // []
```

#### 参数

- `arr` (`readonly T[]`): 要去除重复项的数组。

#### 返回值

(`T[]`): 去除重复项后的新数组。保持原数组中首次出现的顺序。
