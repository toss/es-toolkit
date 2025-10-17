# forEachRight (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `forEachRight`

此 `forEachRight` 函数由于处理 `null` 或 `undefined`、处理 `ArrayLike` 类型、支持各种条件函数形式等原因运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [forEachRight](../../array/forEachRight.md)。

:::

从右到左遍历数组或对象的元素，并对每个元素执行函数。

```typescript
forEachRight(collection, callback);
```

## 参考

### `forEachRight(collection, callback)`

从右到左顺序遍历数组、对象或字符串，并对每个元素执行回调函数。如果回调返回 `false`，则停止遍历。

```typescript
import { forEachRight } from 'es-toolkit/compat';

// 逆序遍历数组
forEachRight([1, 2, 3], (value, index) => {
  console.log(value, index);
});
// 输出: 3 2, 2 1, 1 0

// 逆序遍历字符串
forEachRight('abc', (char, index) => {
  console.log(char, index);
});
// 输出: 'c' 2, 'b' 1, 'a' 0

// 逆序遍历对象
forEachRight({ a: 1, b: 2, c: 3 }, (value, key) => {
  console.log(value, key);
});
// 输出: 3 'c', 2 'b', 1 'a'
```

`null` 或 `undefined` 按原样返回。

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight(null, value => console.log(value)); // null
forEachRight(undefined, value => console.log(value)); // undefined
```

如果回调返回 `false`，则停止遍历。

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight([1, 2, 3, 4], value => {
  console.log(value);
  if (value === 2) {
    return false; // 停止遍历
  }
});
// 输出: 4, 3, 2
```

#### 参数

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 要遍历的集合。可以是数组、对象、字符串或 null/undefined。
- `callback` (`(item: any, index: any, arr: any) => unknown`, 选择): 对每个元素执行的函数。返回 `false` 以停止遍历。默认值是 `identity` 函数。

#### 返回值

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 按原样返回原始集合。
