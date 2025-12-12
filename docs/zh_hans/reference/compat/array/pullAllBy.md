# pullAllBy (Lodash 兼容性)

根据迭代器转换后的值从数组中删除指定的值。

```typescript
const modified = pullAllBy(array, valuesToRemove, iteratee);
```

## 用法

### `pullAllBy(array, values, iteratee)`

根据通过提供的iteratee函数转换后的值从数组中删除指定的值。原始数组会被修改,并返回修改后的数组。

```typescript
import { pullAllBy } from 'es-toolkit/compat';

// 通过比较属性值来删除
const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x');
console.log(array); // [{ x: 2 }]

// 通过函数转换值来比较
const numbers = [1, 2, 3, 4, 5];
pullAllBy(numbers, [2, 4], n => n % 2);
console.log(numbers); // [1, 3, 5] (只剩奇数)
```

如果数组为空、`null` 或 `undefined`,则原样返回原始数组。

```typescript
import { pullAllBy } from 'es-toolkit/compat';

pullAllBy([], [1, 2], x => x); // []
pullAllBy(null as any, [1, 2], x => x); // null
```

#### 参数

- `array` (`T[]`): 要修改的数组。
- `values` (`ArrayLike<T>`, 可选): 要删除的值的数组。
- `iteratee` (`ValueIteratee<T>`, 可选): 应用于每个元素的iteratee函数。可以使用属性名、部分对象或函数。

#### 返回值

(`T[]`): 返回删除了指定值的原始数组。
