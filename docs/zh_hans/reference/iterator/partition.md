# partition (`Iterator`)

消费一个迭代器,并按谓词将其元素拆分为两个数组。

```typescript
const [matched, unmatched] = partition(source, predicate);
```

## 用法

### `partition(source, predicate)`

当你想在一次遍历中把惰性流水线的元素分成两组时,请使用 `partition`——例如,有效记录和无效记录。第一个数组包含 `predicate` 返回真值的元素,第二个数组包含其余元素,并且每组内部保持相对顺序。这是一个终结操作:它会拉取所有元素,因此不能用于无限迭代器。

```typescript
import { partition } from 'es-toolkit/iterator';

// 将数字分为偶数和奇数。
partition([1, 2, 3, 4].values(), x => x % 2 === 0);
// 返回: [[2, 4], [1, 3]]

// 每组内部保持顺序。
partition([3, 1, 4, 1, 5, 9, 2].values(), x => x > 3);
// 返回: [[4, 5, 9], [3, 1, 1, 2]]
```

#### 参数

- `source` (`Iterator<T>`): 要拆分的迭代器。
- `predicate` (`(value: T, index: number) => boolean`): 以每个元素及其索引调用;返回真值时将该元素放入第一个数组。

#### 返回值

(`[T[], T[]]`): 由 `[matched, unmatched]` 两个数组组成的二元组。

### 在 `pipe` 中使用 `partition(predicate)`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式,并把它用作终结步骤。

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// 返回: [[2, 4], [1, 3]]
```
