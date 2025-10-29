# each (Lodash 兼容性)

::: warning 请使用 `Array.prototype.forEach`

此 `each` 函数由于复杂的类型处理和对各种集合类型的支持而运行缓慢。

请改用更快、更现代的 `Array.prototype.forEach`。

:::

对数组或对象的每个元素执行迭代操作。

```typescript
const result = each(collection, iteratee);
```

## 参考

### `each(collection, iteratee)`

遍历数组、对象或字符串的每个元素并执行给定的函数。对于数组,按索引顺序迭代;对于对象,遍历可枚举属性。

```typescript
import { each } from 'es-toolkit/compat';

// 遍历数组
each([1, 2, 3], (value, index) => console.log(value, index));
// 日志: 1 0, 2 1, 3 2

// 遍历对象
each({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// 日志: 'a' 1, 'b' 2

// 遍历字符串
each('hello', (char, index) => console.log(char, index));
// 日志: 'h' 0, 'e' 1, 'l' 2, 'l' 3, 'o' 4
```

如果函数返回 `false`,则停止迭代。

```typescript
import { each } from 'es-toolkit/compat';

each([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // 在 2 处停止
});
// 日志: 1, 2
```

#### 参数

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 要遍历的集合。
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, 可选): 对每个元素执行的函数。默认为 `identity` 函数。

#### 返回值

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 返回原始集合。
