# pull

从数组中移除所有指定的值。

```typescript
const result = pull(arr, valuesToRemove);
```

## 参考

### `pull(arr, valuesToRemove)`

当您想从数组中移除所有特定值时,请使用 `pull`。此函数直接修改原数组,并返回修改后的数组。

```typescript
import { pull } from 'es-toolkit/array';

// 从数字数组中移除特定值
const numbers = [1, 2, 3, 4, 5, 2, 4];
pull(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]

// 从字符串数组中移除特定字符串
const fruits = ['apple', 'banana', 'cherry', 'banana', 'date'];
pull(fruits, ['banana', 'cherry']);
console.log(fruits); // ['apple', 'date']

// 从对象数组中移除引用相同的对象
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj3, obj1];
pull(objects, [obj1]);
console.log(objects); // [{ id: 2 }, { id: 3 }]
```

如果不想修改原数组而是创建新数组,请使用 `difference` 函数。

```typescript
import { pull } from 'es-toolkit/array';
import { difference } from 'es-toolkit/array';

const original = [1, 2, 3, 4, 5];

// pull 修改原数组
const arr1 = [...original];
pull(arr1, [2, 4]);
console.log(arr1); // [1, 3, 5]

// difference 返回新数组
const arr2 = difference(original, [2, 4]);
console.log(original); // [1, 2, 3, 4, 5] (未改变)
console.log(arr2); // [1, 3, 5]
```

#### 参数

- `arr` (`T[]`): 要移除值的数组。
- `valuesToRemove` (`readonly unknown[]`): 要从数组中移除的值的数组。

#### 返回值

(`T[]`): 移除了指定值的原数组。原数组被修改后返回。
