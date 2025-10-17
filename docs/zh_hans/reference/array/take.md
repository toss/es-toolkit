# take

从数组的开头获取指定数量的元素,创建一个新数组。

```typescript
const taken = take(arr, count);
```

## 参考

### `take(arr, count?)`

当您只需要数组前面的几个元素时,请使用 `take`。如果请求的数量大于数组长度,则返回整个数组。

```typescript
import { take } from 'es-toolkit/array';

// 获取前3个元素。
take([1, 2, 3, 4, 5], 3);
// Returns: [1, 2, 3]

// 获取前2个元素。
take(['a', 'b', 'c'], 2);
// Returns: ['a', 'b']
```

如果请求的数量多于数组的元素,则返回整个数组。

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

如果省略 `count`,则只获取第一个元素。

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3]);
// Returns: [1]
```

#### 参数

- `arr` (`T[]`): 要获取元素的数组。
- `count` (`number`, 可选): 要获取的元素数量。默认值为 `1`。

#### 返回值

(`T[]`): 返回包含从数组开头开始的 `count` 个元素的新数组。
