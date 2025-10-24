# reverse（Lodash 兼容性）

::: warning 使用 `Array.prototype.reverse()`

此 `reverse` 函数为了与 Lodash 兼容而包含 `null` 和 `undefined` 处理。如果只需要简单的数组反转，原生 JavaScript 的 `Array.prototype.reverse()` 方法更直观、更快。

请使用更快、更现代的 `Array.prototype.reverse()`。

:::

就地反转数组元素。

```typescript
const reversed = reverse(array);
```

## 参考

### `reverse(array)`

反转数组的顺序，使第一个元素成为最后一个，最后一个元素成为第一个。它直接修改原始数组并返回修改后的数组。

```typescript
import { reverse } from 'es-toolkit/compat';

// 反转数字数组
const numbers = [1, 2, 3, 4, 5];
const reversed = reverse(numbers);
console.log(numbers); // => [5, 4, 3, 2, 1]
console.log(reversed); // => [5, 4, 3, 2, 1]

// 反转字符串数组
const words = ['apple', 'banana', 'cherry'];
reverse(words);
console.log(words); // => ['cherry', 'banana', 'apple']

// 空数组或 null/undefined 原样返回
reverse([]); // => []
reverse(null); // => null
reverse(undefined); // => undefined
```

请注意，此函数会直接修改原始数组。

```typescript
import { reverse } from 'es-toolkit/compat';

const original = [1, 2, 3];
const result = reverse(original);

console.log(original === result); // => true（同一个数组对象）
console.log(original); // => [3, 2, 1]（原数组被修改）
```

#### 参数

- `array` (`T[] | null | undefined`)：要反转的数组。如果是 `null` 或 `undefined`，则原样返回。

#### 返回值

(`T[] | null | undefined`)：返回反转后的数组。如果输入是 `null` 或 `undefined`，则原样返回该值。
