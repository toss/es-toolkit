# without

创建一个排除特定值的新数组。

```typescript
const filtered = without(arr, ...values);
```

## 用法

### `without(arr, ...values)`

当您想从数组中删除不需要的特定值时,请使用 `without`。原数组不会被修改,返回已删除指定值的新数组。

该函数还提供增强的 TypeScript 类型推断 —
当传递字面量值时,返回类型会自动使用 `Exclude<T, V>` 进行缩小。

```typescript
import { without } from 'es-toolkit/array';

// 从数字数组中删除特定值。
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]
// Type: (1 | 3 | 5)[]

// 从字符串数组中删除特定值。
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']
// Type: ('b' | 'c')[]
```

也能正确处理 `NaN` 值。

```typescript
import { without } from 'es-toolkit/array';

without([1, NaN, 3, NaN, 5], NaN);
// Returns: [1, 3, 5]
```

#### 参数

- `arr` (`readonly T[]`): 要删除值的数组。
- `values` (`...V[]`): 要从数组中删除的值。
  当使用字面量值时,返回类型会自动缩小为 `Exclude<T, V>[]`。

#### 返回值

(`Exclude<T, V>[]`): 返回已删除指定值的新数组。
如果未提供特定的字面量值,返回类型将回退为 `T[]`。
