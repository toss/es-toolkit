# shuffle（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 `shuffle`

此 `shuffle` 函数为了与 Lodash 兼容而包含额外的处理，运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [shuffle](../../array/shuffle.md)。

:::

随机打乱数组或对象的元素并返回新数组。

```typescript
const result = shuffle(collection);
```

## 参考

### `shuffle(collection)`

使用 Fisher-Yates 算法随机打乱数组或对象的元素并返回新数组。不会修改原数组。

```typescript
import { shuffle } from 'es-toolkit/compat';

// 打乱数字数组
const numbers = [1, 2, 3, 4, 5];
const shuffled1 = shuffle(numbers);
// 返回值：例如 [3, 1, 5, 2, 4]（每次顺序不同）

// 打乱字符串数组
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffled2 = shuffle(fruits);
// 返回值：例如 ['cherry', 'apple', 'date', 'banana']

// 打乱对象的值
const obj = { a: 1, b: 2, c: 3, d: 4 };
const shuffled3 = shuffle(obj);
// 返回值：例如 [3, 1, 4, 2]（对象值被随机打乱）
```

`null` 或 `undefined` 作为空数组处理。

```typescript
import { shuffle } from 'es-toolkit/compat';

shuffle(null);
// 返回值：[]

shuffle(undefined);
// 返回值：[]
```

#### 参数

- `collection` (`ArrayLike<T> | T | null | undefined`)：要打乱的数组或对象。

#### 返回值

(`T[]`)：返回元素被随机打乱的新数组。
