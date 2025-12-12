# eachRight (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `forEachRight`

此 `eachRight` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理、支持各种条件函数格式等原因而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [`forEachRight`](../../array/forEachRight.md)。

:::

对数组或对象的每个元素从右到左执行迭代操作。

```typescript
const result = eachRight(collection, iteratee);
```

## 用法

### `eachRight(collection, iteratee)`

从右到左遍历数组、对象或字符串的每个元素并执行给定的函数。对于数组,从最后一个索引开始逆序迭代;对于对象,以逆序遍历可枚举属性。

```typescript
import { eachRight } from 'es-toolkit/compat';

// 逆序遍历数组
eachRight([1, 2, 3], (value, index) => console.log(value, index));
// 日志: 3 2, 2 1, 1 0

// 逆序遍历对象
eachRight({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// 日志: 'b' 2, 'a' 1

// 逆序遍历字符串
eachRight('hello', (char, index) => console.log(char, index));
// 日志: 'o' 4, 'l' 3, 'l' 2, 'e' 1, 'h' 0
```

如果函数返回 `false`,则停止迭代。

```typescript
import { eachRight } from 'es-toolkit/compat';

eachRight([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // 在 2 处停止
});
// 日志: 4, 3, 2
```

#### 参数

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 要遍历的集合。
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, 可选): 对每个元素执行的函数。默认为 `identity` 函数。

#### 返回值

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 返回原始集合。
