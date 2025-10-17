# pullAt (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [pullAt](../../array/pullAt.md)

由于复杂的类型处理和重载，这个 `pullAt` 函数运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [pullAt](../../array/pullAt.md)。

:::

从数组中删除指定索引处的元素并返回已删除的元素。

```typescript
const removed = pullAt(array, ...indexes);
```

## 参考

### `pullAt(array, ...indexes)`

从数组中删除指定索引处的元素并返回已删除元素的数组。原始数组会被修改。

```typescript
import { pullAt } from 'es-toolkit/compat';

// 通过单个索引删除
const array = [1, 2, 3, 4, 5];
const removed = pullAt(array, 1, 3);
console.log(array); // [1, 3, 5]
console.log(removed); // [2, 4]

// 通过索引数组删除
const colors = ['red', 'green', 'blue', 'yellow'];
const removedColors = pullAt(colors, [0, 2]);
console.log(colors); // ['green', 'yellow']
console.log(removedColors); // ['red', 'blue']
```

不存在的索引被视为 `undefined`。

```typescript
import { pullAt } from 'es-toolkit/compat';

const numbers = [10, 20, 30];
const removed = pullAt(numbers, 1, 5);
console.log(numbers); // [10, 30]
console.log(removed); // [20, undefined]
```

#### 参数

- `array` (`ArrayLike<T>`): 要修改的数组。
- `...indexes` (`Array<number | number[]>`): 要删除的元素的索引。可以传递单个数字或数字数组。

#### 返回值

(`ArrayLike<T>`): 返回已删除元素的数组。
