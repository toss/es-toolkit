# uniqBy (用于 `Iterator`)

惰性地产生迭代器中映射键此前未出现过的元素。

```typescript
const unique = uniqBy(source, getKey);
```

## 用法

### `uniqBy(source, getKey)`

当你想按派生键对元素流去重时,请使用 `uniqBy`——例如,为每个用户 ID 保留第一条事件。首次出现的顺序会被保留,键使用 SameValueZero 语义(与 `Set` 一致)进行比较,因此 `NaN` 键也能去重。去重是流式进行的:每个元素一旦被确认唯一就会立即被输出,因此在用短路辅助方法限制范围时,它也适用于无限迭代器。

```typescript
import { uniqBy } from 'es-toolkit/iterator';

// 为每个映射键保留第一个元素。
uniqBy([1.1, 1.2, 2.3, 2.4].values(), Math.floor).toArray();
// 返回: [1.1, 2.3]

// 按派生键对对象去重。
const events = [
  { userId: 1, type: 'click' },
  { userId: 1, type: 'view' },
  { userId: 2, type: 'click' },
];
uniqBy(events.values(), e => e.userId).toArray();
// 返回: [{ userId: 1, type: 'click' }, { userId: 2, type: 'click' }]
```

#### 参数

- `source` (`Iterator<T>`): 要去重的迭代器。
- `getKey` (`(value: T) => K`): 将元素映射为用于检测重复的键。

#### 返回值

(`IteratorObject<T, undefined>`): 一个惰性迭代器,产生移除重复键之后的元素。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

### 在 `pipe` 中使用 `uniqBy(getKey)`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式。它只接收键函数,并返回一个接收迭代器的函数。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, uniqBy } from 'es-toolkit/fp/iterator';

pipe([1.1, 1.2, 2.3, 2.4].values(), uniqBy(Math.floor), toArray());
// 返回: [1.1, 2.3]
```
