# remove (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `remove`

此 `remove` 函数为了 Lodash 兼容性支持各种形式的谓词,因此实现较为复杂。主库中的 `remove` 函数仅支持简单的函数谓词,因此运行更快。

请改用更快、更现代的 `es-toolkit` 的 [remove](../../array/remove.md)。

:::

从数组中删除匹配条件的元素并返回被删除的元素。

```typescript
const removedElements = remove(array, predicate);
```

## 用法

### `remove(array, predicate)`

遍历数组并从原始数组中删除满足给定条件的元素,将删除的元素作为新数组返回。请注意,原始数组会被直接修改。

```typescript
import { remove } from 'es-toolkit/compat';

// 使用函数条件删除
const numbers = [1, 2, 3, 4, 5];
const evens = remove(numbers, n => n % 2 === 0);
console.log(numbers); // => [1, 3, 5]
console.log(evens); // => [2, 4]

// 使用部分对象匹配删除
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
const removed = remove(objects, { a: 1 });
console.log(objects); // => [{ a: 2 }, { a: 3 }]
console.log(removed); // => [{ a: 1 }]

// 使用属性-值对删除
const items = [{ name: 'apple' }, { name: 'banana' }, { name: 'cherry' }];
const cherries = remove(items, ['name', 'cherry']);
console.log(items); // => [{ name: 'apple' }, { name: 'banana' }]
console.log(cherries); // => [{ name: 'cherry' }]
```

此函数支持各种形式的谓词。

```typescript
import { remove } from 'es-toolkit/compat';

// 使用函数条件
remove(users, user => user.active === false);

// 部分对象匹配
remove(users, { status: 'inactive' });

// 属性-值数组
remove(users, ['type', 'guest']);

// 按属性名检查真值
remove(users, 'isDeleted');
```

#### 参数

- `array` (`ArrayLike<T>`): 要修改的数组。
- `predicate` (`((value: T, index: number, array: ArrayLike<T>) => boolean) | Partial<T> | [keyof T, unknown] | keyof T`, 可选): 对每个元素执行的条件。默认为 `identity`。

#### 返回值

(`T[]`): 返回由因匹配条件而被删除的元素组成的新数组。
