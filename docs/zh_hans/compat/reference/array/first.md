# first (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `head`

此 `first` 函数由于处理 `null` 或 `undefined` 和类数组对象转换而运行较慢。`es-toolkit` 的 `head` 函数没有这些额外处理,运行更快、更简单。

请改用更快、更现代的 `es-toolkit` 的 [head](../../array/head.md)。

:::

返回数组的第一个元素。

```typescript
const firstElement = first(array);
```

## 用法

### `first(array)`

当您想要获取数组的第一个元素时使用 `first`。如果数组为空或为 `null` 或 `undefined`,则返回 `undefined`。

```typescript
import { first } from 'es-toolkit/compat';

// 从常规数组获取第一个元素
first([1, 2, 3]);
// Returns: 1

// 从字符串数组获取第一个元素
first(['a', 'b', 'c']);
// Returns: 'a'

// 空数组
first([]);
// Returns: undefined
```

`null` 或 `undefined` 返回 `undefined`。

```typescript
import { first } from 'es-toolkit/compat';

first(null); // undefined
first(undefined); // undefined
```

可用于类数组对象。

```typescript
import { first } from 'es-toolkit/compat';

const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
first(arrayLike);
// Returns: 'a'

// 字符串也被视为数组
first('hello');
// Returns: 'h'
```

对于类型保证的元组,返回确切的类型。

```typescript
import { first } from 'es-toolkit/compat';

const tuple = [1, 'two', true] as const;
first(tuple);
// Returns: 1 (类型推断为 1)
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要获取第一个元素的数组。

#### 返回值

(`T | undefined`): 返回数组的第一个元素。如果数组为空或无效,则返回 `undefined`。
