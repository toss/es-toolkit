# uniq (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [uniq](../../array/uniq.md)

此 `uniq` 函数由于为 Lodash 兼容性进行额外处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [uniq](../../array/uniq.md)。

:::

通过从数组中去除重复项来创建一个仅包含唯一元素的新数组。

```typescript
const result = uniq([1, 2, 2, 3, 3, 4]);
// result 是 [1, 2, 3, 4]。
```

## 参考

### `uniq(array)`

通过从数组中去除重复项返回一个仅包含唯一元素的新数组。仅保留每个元素的第一次出现,并保留顺序。

```typescript
import { uniq } from 'es-toolkit/compat';

// 从数字数组中去除重复项
const numbers = [1, 2, 2, 3, 3, 4, 1];
const result1 = uniq(numbers);
// 返回: [1, 2, 3, 4]

// 从字符串数组中去除重复项
const strings = ['a', 'b', 'b', 'c', 'a'];
const result2 = uniq(strings);
// 返回: ['a', 'b', 'c']

// 从对象数组中去除重复项(引用值比较)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const objects = [obj1, obj2, obj1];
const result3 = uniq(objects);
// 返回: [{ id: 1 }, { id: 2 }]
```

#### 参数

- `array` (`T[]`): 要处理的数组。

#### 返回值

(`T[]`): 去除重复项的新数组。
