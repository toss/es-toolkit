# nthArg (Lodash 兼容性)

::: warning 使用箭头函数

这个 `nthArg` 函数只是创建一个返回特定索引参数的包装函数。使用箭头函数可以更简洁清晰地实现相同的功能。

建议使用更快且更现代的箭头函数。

:::

创建一个返回指定索引参数的函数。

```typescript
const getNthArg = nthArg(n);
```

## 参考

### `nthArg(n)`

当您只需要函数特定位置的参数时,使用 `nthArg`。如果使用负索引,则从末尾开始计数。

```typescript
import { nthArg } from 'es-toolkit/compat';

// 创建一个获取第二个参数的函数
const getSecondArg = nthArg(1);
getSecondArg('a', 'b', 'c', 'd');
// Returns: 'b'

// 创建一个获取倒数第二个参数的函数
const getPenultimateArg = nthArg(-2);
getPenultimateArg('a', 'b', 'c', 'd');
// Returns: 'c'

// 创建一个获取第一个参数的函数(默认)
const getFirstArg = nthArg();
getFirstArg('a', 'b', 'c');
// Returns: 'a'
```

与数组方法一起使用时很有用。

```typescript
import { nthArg } from 'es-toolkit/compat';

// 从每个数组中只提取第二个元素
const arrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
arrays.map(nthArg(1));
// Returns: [2, 5, 8]
```

负索引从末尾开始计数。

```typescript
import { nthArg } from 'es-toolkit/compat';

// 获取最后一个参数的函数
const getLastArg = nthArg(-1);
getLastArg('first', 'middle', 'last');
// Returns: 'last'
```

#### 参数

- `n` (`number`, 可选): 要返回的参数的索引。负值从末尾开始计数。默认值为 `0`。

#### 返回值

(`(...args: any[]) => any`): 返回一个新函数,该函数返回指定索引处的参数。
