# pullAll (Lodash 兼容性)

从数组中删除包含在指定值数组中的所有值。

```typescript
const result = pullAll(array, valuesToRemove);
```

## 用法

### `pullAll(array, valuesToRemove)`

从数组中删除 `valuesToRemove` 数组中包含的所有值并修改原始数组。类似于 `pull` 函数,但将要删除的值作为数组接收。

```typescript
import { pullAll } from 'es-toolkit/compat';

// 从数字数组中删除特定值
const numbers = [1, 2, 3, 2, 4, 2, 5];
pullAll(numbers, [2, 3]);
console.log(numbers); // [1, 4, 5]

// 从字符串数组中删除特定值
const fruits = ['apple', 'banana', 'apple', 'cherry', 'banana'];
pullAll(fruits, ['apple', 'banana']);
console.log(fruits); // ['cherry']
```

如果传入空数组、`null` 或 `undefined`,则不会删除任何内容。

```typescript
import { pullAll } from 'es-toolkit/compat';

const numbers = [1, 2, 3];
pullAll(numbers, []);
console.log(numbers); // [1, 2, 3]

pullAll(numbers, null);
console.log(numbers); // [1, 2, 3]
```

#### 参数

- `array` (`T[]`): 要修改的数组。
- `valuesToRemove` (`ArrayLike<T>`, 可选): 包含要从数组中删除的值的数组。默认为 `[]`。

#### 返回值

(`T[]`): 返回修改后的原始数组。
