# reduceRight (Lodash 兼容性)

::: warning 使用 `Array.prototype.reduceRight` 或 `Object.values` 与 `reduceRight`

此 `reduceRight` 函数由于复杂的类型处理和支持各种输入格式而运行较慢。

请改用更快、更现代的 `Array.prototype.reduceRight` 方法,或对于对象,将 `reduceRight` 与 `Object.values` 一起使用。

:::

通过从右到左迭代将数组或对象归约为单个值。

```typescript
const result = reduceRight(collection, iteratee, initialValue);
```

## 用法

### `reduceRight(collection, iteratee, initialValue)`

从右到左遍历数组或对象的所有元素以计算累积值。如果提供初始值,则从该值开始;否则从最后一个元素开始。

```typescript
import { reduceRight } from 'es-toolkit/compat';

// 将数组连接成字符串(从右侧)
const letters = ['a', 'b', 'c', 'd'];
const result = reduceRight(letters, (acc, value) => acc + value, '');
console.log(result); // 'dcba'

// 对象值的乘法(键顺序的逆序)
const numbers = { x: 2, y: 3, z: 4 };
const product = reduceRight(numbers, (acc, value) => acc * value, 1);
console.log(product); // 24 (1 * 4 * 3 * 2)
```

如果不提供初始值,最后一个元素将成为初始值,并从倒数第二个元素开始迭代。

```typescript
import { reduceRight } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4];
const sum = reduceRight(numbers, (acc, value) => acc + value);
console.log(sum); // 10 (4 + 3 + 2 + 1)

// 空数组返回 undefined
const empty = [];
const result = reduceRight(empty, (acc, value) => acc + value);
console.log(result); // undefined
```

#### 参数

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 要迭代的数组或对象。
- `iteratee` (`(accumulator: any, value: any, index: PropertyKey, collection: any) => any`): 对每个元素调用的函数。它接收累积值、当前值、索引/键和原始数组/对象。
- `initialValue` (`any`, 可选): 累加器的初始值。如果未提供,最后一个元素将成为初始值。

#### 返回值

(`any`): 返回处理所有元素后的最终累积值。
