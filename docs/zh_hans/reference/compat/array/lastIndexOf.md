# lastIndexOf (Lodash兼容性)

::: warning 使用`Array.lastIndexOf`

此`lastIndexOf`函数由于处理`null`或`undefined`、搜索`NaN`值等原因运行缓慢。

请使用更快、更现代的`Array.lastIndexOf`。

:::

查找数组中指定元素最后出现的索引。

```typescript
const index = lastIndexOf(array, searchElement, fromIndex);
```

## 用法

### `lastIndexOf(array, searchElement, fromIndex)`

返回数组中指定元素最后出现的索引。与原生`Array.lastIndexOf`类似，但也可以找到`NaN`值。

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

// 基本用法
lastIndexOf([1, 2, 1, 2], 2);
// => 3

// 指定起始索引
lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1

// 查找NaN值（原生lastIndexOf无法找到NaN）
lastIndexOf([1, 2, NaN, 4, NaN], NaN);
// => 4

// 使用负索引
lastIndexOf([1, 2, 3, 4], 3, -2);
// => 2
```

`null`或`undefined`被视为空数组。

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

lastIndexOf(null, 1); // -1
lastIndexOf(undefined, 1); // -1
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要搜索的数组。
- `searchElement` (`T`): 要查找的元素。
- `fromIndex` (`true | number`, 可选): 开始搜索的索引。传递`true`从数组末尾开始搜索。默认值为`array.length - 1`。

#### 返回值

(`number`): 返回最后一个匹配元素的索引。如果找不到则返回`-1`。
