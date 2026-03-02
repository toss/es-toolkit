# pull (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [pull](../../array/pull.md)

此 `pull` 函数用于 Lodash 兼容性,由于更复杂的类型处理和重载而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [pull](../../array/pull.md)。

:::

从数组中删除所有指定的值。

```typescript
const result = pull(array, ...valuesToRemove);
```

## 用法

### `pull(array, ...valuesToRemove)`

从数组中删除所有指定的值并修改原始数组。通过直接修改原始数组而不是复制它可以节省内存。

```typescript
import { pull } from 'es-toolkit/compat';

// 从数字数组中删除特定值
const numbers = [1, 2, 3, 2, 4, 2, 5];
pull(numbers, 2, 3);
console.log(numbers); // [1, 4, 5]

// 从字符串数组中删除特定值
const fruits = ['apple', 'banana', 'apple', 'cherry'];
pull(fruits, 'apple');
console.log(fruits); // ['banana', 'cherry']
```

#### 参数

- `array` (`T[]`): 要修改的数组。
- `...valuesToRemove` (`T[]`): 要从数组中删除的值。

#### 返回值

(`T[]`): 返回修改后的原始数组。
