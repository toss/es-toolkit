# combinations

返回数组中所有长度为 `r` 的组合。

```typescript
const result = combinations(arr, r);
```

## 用法

### `combinations(arr, r)`

当您需要从数组中选取 `r` 个元素的所有不计顺序的方式时,请使用 `combinations`。元组按输入数组中元素位置的字典顺序输出。

当 `0 <= r <= n` 时,组合数为 `n! / r! / (n - r)!`;当 `r > n` 时为 `0`。

```typescript
import { combinations } from 'es-toolkit/array';

// 从 4 个字母中选 2 个。
combinations(['A', 'B', 'C', 'D'], 2);
// 返回: [['A','B'], ['A','C'], ['A','D'], ['B','C'], ['B','D'], ['C','D']]

// 从 4 个数字中选 3 个。
combinations([0, 1, 2, 3], 3);
// 返回: [[0,1,2], [0,1,3], [0,2,3], [1,2,3]]
```

元素按位置而不是按值视为不同。因此如果输入中存在重复值,可能会得到看起来相同的组合。

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 1, 2], 2);
// 返回: [[1, 1], [1, 2], [1, 2]]
```

当 `r` 为 `0` 时,返回只含一个空组合的数组。当 `r` 大于数组长度时,返回空数组。

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 2, 3], 0); // [[]]
combinations([1, 2], 5); // []
```

#### 参数

- `arr` (`readonly T[]`): 用于选取元素的数组。
- `r` (`number`): 每个组合的长度。必须是非负整数。

#### 返回值

(`T[][]`): 长度为 `r` 的组合数组。

#### 抛出错误

如果 `r` 不是非负整数,则抛出错误。

## 试一试

::: sandpack

```ts index.ts
import { combinations } from 'es-toolkit/array';

console.log(combinations(['A', 'B', 'C', 'D'], 2));
```

:::
