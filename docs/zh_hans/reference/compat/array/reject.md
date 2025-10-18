# reject (Lodash 兼容性)

::: warning 使用 `Array.filter()`

此 `reject` 函数为了与 Lodash 兼容而支持多种形式的 predicate，因此实现较为复杂。对于简单的函数 predicate，使用 `Array.filter()` 会更简单和更快。

请使用更快、更现代的 `Array.filter()`。例如，`reject(arr, func)` 可以替换为 `arr.filter(item => !func(item))`。

:::

遍历集合并返回一个由不符合条件函数的元素组成的新数组。

```typescript
const filtered = reject(collection, predicate);
```

## 参考

### `reject(collection, predicate)`

从数组、对象或字符串中选出不符合给定条件的元素，并返回一个新数组。执行与 `filter` 相反的操作。

```typescript
import { reject } from 'es-toolkit/compat';

// 过滤出不是偶数的数字
reject([1, 2, 3, 4, 5], n => n % 2 === 0);
// => [1, 3, 5]

// 过滤出不具有特定属性的对象
reject([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
// => [{ b: 1 }]

// 过滤出不具有特定属性值的对象
reject([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// => [{ a: 1 }, { a: 3 }]

// 从字符串中过滤出不是特定字符的字符
reject('abc', char => char === 'b');
// => ['a', 'c']
```

此函数支持多种形式的 predicate。

```typescript
import { reject } from 'es-toolkit/compat';

// 使用函数条件
reject(users, user => user.age < 18);

// 对象的部分匹配
reject(users, { active: false });

// 属性-值数组
reject(users, ['status', 'pending']);

// 通过属性名检查 truthy 值
reject(users, 'premium');
```

#### 参数

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 要遍历的集合。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 可选): 对每个元素执行的条件。默认值为 `identity`。

#### 返回值

(`T[]`): 返回一个由不符合 predicate 条件的元素组成的新数组。
