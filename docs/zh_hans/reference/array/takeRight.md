# takeRight

从数组的末尾获取指定数量的元素,创建一个新数组。

```typescript
const taken = takeRight(arr, count);
```

## 参考

### `takeRight(arr, count?)`

当您只需要数组末尾的几个元素时,请使用 `takeRight`。如果请求的数量大于数组长度,则返回整个数组。

```typescript
import { takeRight } from 'es-toolkit/array';

// 获取最后2个元素。
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// 获取最后2个元素。
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']
```

如果请求的数量多于数组的元素,则返回整个数组。

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

如果省略 `count`,则只获取最后一个元素。

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3]);
// Returns: [3]
```

#### 参数

- `arr` (`T[]`): 要获取元素的数组。
- `count` (`number`, 可选): 要获取的元素数量。默认值为 `1`。

#### 返回值

(`T[]`): 返回包含从数组末尾开始的 `count` 个元素的新数组。
