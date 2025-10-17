# without (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [without](../../array/without.md)

此 `without` 函数由于为 Lodash 兼容性进行额外处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [without](../../array/without.md)。

:::

创建一个从数组中排除指定值的新数组。

```typescript
const result = without([1, 2, 3, 4, 5], 2, 4);
// result 是 [1, 3, 5]。
```

## 参考

### `without(array, ...values)`

返回一个从数组中删除指定值的新数组。原始数组不会被修改。

```typescript
import { without } from 'es-toolkit/compat';

// 从数字数组中删除多个值
const numbers = [1, 2, 3, 4, 5, 2, 4];
const result1 = without(numbers, 2, 4);
// 返回: [1, 3, 5]

// 从字符串数组中删除值
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const result2 = without(fruits, 'banana');
// 返回: ['apple', 'cherry']

// 处理空数组
const result3 = without([], 1, 2, 3);
// 返回: []
```

#### 参数

- `array` (`T[]`): 要处理的原始数组。
- `...values` (`T[]`): 要删除的值。

#### 返回值

(`T[]`): 删除指定值的新数组。
