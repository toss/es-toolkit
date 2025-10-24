# without

创建一个排除特定值的新数组。

```typescript
const filtered = without(arr, ...values);
```

## 参考

### `without(arr, ...values)`

当您想从数组中删除不需要的特定值时,请使用 `without`。原数组不会被修改,返回已删除指定值的新数组。

```typescript
import { without } from 'es-toolkit/array';

// 从数字数组中删除特定值。
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]

// 从字符串数组中删除特定值。
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']
```

也能正确处理 `NaN` 值。

```typescript
import { without } from 'es-toolkit/array';

without([1, NaN, 3, NaN, 5], NaN);
// Returns: [1, 3, 5]
```

#### 参数

- `arr` (`readonly T[]`): 要删除值的数组。
- `values` (`...T[]`): 要从数组中删除的值。

#### 返回值

(`T[]`): 返回已删除指定值的新数组。
