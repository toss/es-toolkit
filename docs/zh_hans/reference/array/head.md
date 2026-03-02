# head

返回数组的第一个元素。

```typescript
const firstElement = head(arr);
```

## 用法

### `head(arr)`

当您想获取数组的第一个元素时,请使用 `head`。如果数组为空,则返回 `undefined`。在访问数组开头的数据时很有用。

```typescript
import { head } from 'es-toolkit/array';

// 获取数字数组的第一个元素
const numbers = [1, 2, 3, 4, 5];
head(numbers);
// Returns: 1

// 获取字符串数组的第一个元素
const strings = ['a', 'b', 'c'];
head(strings);
// Returns: 'a'

// 空数组返回 undefined
const emptyArray: number[] = [];
head(emptyArray);
// Returns: undefined
```

类型处理很安全。

```typescript
import { head } from 'es-toolkit/array';

// 非空数组的情况下类型明确
const nonEmptyArray = [1, 2, 3] as const;
head(nonEmptyArray);
// Returns: 1 (类型: 1)

// 普通数组的情况下可能为 undefined
const maybeEmptyArray = [1, 2, 3];
head(maybeEmptyArray);
// Returns: 1 | undefined (类型: number | undefined)
```

#### 参数

- `arr` (`readonly T[]`): 要获取第一个元素的数组。

#### 返回值

(`T | undefined`): 数组的第一个元素。如果数组为空,则返回 `undefined`。
