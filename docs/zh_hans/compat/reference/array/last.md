# last (Lodash兼容性)

::: warning 使用`es-toolkit`的[last](../../array/last.md)

此`last`函数由于处理`null`或`undefined`而变得复杂。

请使用更快、更现代的`es-toolkit`的[last](../../array/last.md)。

:::

返回数组的最后一个元素。

```typescript
const lastElement = last(array);
```

## 用法

### `last(array)`

当您想获取数组的最后一个元素时使用`last`。如果数组为空，则返回`undefined`。

```typescript
import { last } from 'es-toolkit/compat';

// 数字数组的最后一个元素
last([1, 2, 3, 4, 5]);
// Returns: 5

// 字符串数组的最后一个元素
last(['a', 'b', 'c']);
// Returns: 'c'

// 对象数组的最后一个元素
const users = [{ name: 'Alice' }, { name: 'Bob' }];
last(users);
// Returns: { name: 'Bob' }
```

空数组或`null`、`undefined`返回`undefined`。

```typescript
import { last } from 'es-toolkit/compat';

// 空数组
last([]);
// Returns: undefined

// null数组
last(null);
// Returns: undefined

// undefined数组
last(undefined);
// Returns: undefined
```

也支持类数组对象。

```typescript
import { last } from 'es-toolkit/compat';

// 类数组对象
const arrayLike = { 0: 'first', 1: 'second', length: 2 };
last(arrayLike);
// Returns: 'second'

// 字符串也是类数组对象
last('hello');
// Returns: 'o'
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要获取最后一个元素的数组。

#### 返回值

(`T | undefined`): 返回数组的最后一个元素，如果数组为空、`null`或`undefined`，则返回`undefined`。
