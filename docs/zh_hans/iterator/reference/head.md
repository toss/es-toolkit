# head (用于 `Iterator`)

返回迭代器的第一个元素;如果迭代器为空,则返回 `undefined`。

```typescript
const first = head(source);
```

## 用法

### `head(source)`

当你只需要惰性流水线产生的第一个元素时,请使用 `head`。它只拉取一个元素就停止,因此在无限迭代器上使用也是安全的。

`head` 会消费迭代器,而不是只窥视它:读取第一个元素之后,源会通过它的 `return` 方法被关闭——与原生的 `Iterator.prototype.find` 行为一致——因此无法再继续迭代。

```typescript
import { head } from 'es-toolkit/iterator';

// 读取第一个元素。
head([1, 2, 3].values());
// 返回: 1

// 空迭代器得到 undefined。
head([].values());
// 返回: undefined

// 惰性链只会计算开头的元素。
head([1, 2, 3, 4].values().filter(x => x % 2 === 0));
// 返回: 2
```

#### 参数

- `source` (`Iterator<T>`): 要读取第一个元素的迭代器。

#### 返回值

(`T | undefined`): 第一个元素;当迭代器不产生任何值时为 `undefined`。

### 在 `pipe` 中使用 `head()`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式,并把它用作终结步骤。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// 返回: 2
```
