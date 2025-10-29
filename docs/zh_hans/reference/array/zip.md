# zip

将多个数组转换为每个数组相同索引元素组成的元组数组。

```typescript
const zipped = zip(...arrs);
```

## 参考

### `zip(...arrs)`

当您想将多个数组中相同位置的元素绑定在一起时,请使用 `zip`。返回一个将每个数组相同索引的元素组成元组的新数组。

```typescript
import { zip } from 'es-toolkit/array';

// 绑定两个数组。
zip([1, 2, 3], ['a', 'b', 'c']);
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

// 绑定三个数组。
zip([1, 2], ['a', 'b', 'c'], [true, false]);
// Returns: [[1, 'a', true], [2, 'b', false], [undefined, 'c', undefined]]
```

如果数组长度不同,会按最长数组的长度对齐。较短数组的空位会用 `undefined` 填充。

```typescript
import { zip } from 'es-toolkit/array';

zip([1, 2], ['a', 'b', 'c', 'd']);
// Returns: [[1, 'a'], [2, 'b'], [undefined, 'c'], [undefined, 'd']]
```

#### 参数

- `arrs` (`Array<readonly T[]>`): 要绑定的数组。

#### 返回值

(`T[][]`): 返回将每个输入数组对应索引元素组成元组的新数组。
