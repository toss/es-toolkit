# partition

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](mdc:../../../compatibility.md)。
:::

## 签名

```typescript
function partition<T>(
  collection: ArrayLike<T> | Record<string, T> | null | undefined,
  predicate?: ((value: T, index: number | string, collection: any) => unknown) | Object | Array<any> | string
): [T[], T[]];
```

### 参数

- `collection`: 要迭代的集合。
- `predicate`: 每次迭代调用的函数。可以是：
  - 接收 (value, index|key, collection) 的函数
  - 用于按属性值进行匹配的对象
  - 从每个元素获取值的属性路径
  - 格式为 [path, value] 的数组

### 返回值

(`[T[], T[]]`): 返回一对数组，第一个数组包含通过断言检查的元素，第二个数组包含未通过断言检查的元素。

## 示例

```typescript
import { partition } from 'es-toolkit/compat';

// 使用断言函数
partition([1, 2, 3, 4], n => n % 2 === 0);
// => [[2, 4], [1, 3]]

// 使用属性简写
const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: false },
];

// 使用 "property" 迭代器简写
partition(users, 'active');
// => [[{ 'user': 'barney', 'age': 36, 'active': true }], [{ 'user': 'fred', 'age': 40, 'active': false }, { 'user': 'pebbles', 'age': 1, 'active': false }]]

// 使用 "matches" 迭代器简写
partition(users, { age: 1, active: false });
// => [[{ 'user': 'pebbles', 'age': 1, 'active': false }], [{ 'user': 'barney', 'age': 36, 'active': true }, { 'user': 'fred', 'age': 40, 'active': false }]]

// 使用 "matchesProperty" 迭代器简写
partition(users, ['active', false]);
// => [[{ 'user': 'fred', 'age': 40, 'active': false }, { 'user': 'pebbles', 'age': 1, 'active': false }], [{ 'user': 'barney', 'age': 36, 'active': true }]]
```
