# head (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [head](../../array/head.md)

此 `head` 函数由于 `ArrayLike` 对象处理和数组转换过程而运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [head](../../array/head.md)。

:::

返回数组的第一个元素。

```typescript
const firstElement = head(array);
```

## 参考

### `head(array)`

返回数组或类数组对象的第一个元素。如果数组为空或无效，则返回 `undefined`。

```typescript
import { head } from 'es-toolkit/compat';

// 数字数组的第一个元素
const numbers = [1, 2, 3, 4];
const first = head(numbers);
// first 为 1

// 字符串数组的第一个元素
const strings = ['a', 'b', 'c'];
const firstChar = head(strings);
// firstChar 为 'a'

// 类数组对象
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const firstItem = head(arrayLike);
// firstItem 为 'x'
```

空数组或无效输入返回 `undefined`。

```typescript
import { head } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const noElement = head(emptyArray);
// noElement 为 undefined

head(null); // undefined
head(undefined); // undefined
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要获取第一个元素的数组或类数组对象。

#### 返回值

(`T | undefined`): 返回数组的第一个元素，如果数组为空或无效，则返回 `undefined`。
