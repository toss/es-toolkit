# property (Lodash 兼容性)

::: warning 请直接使用 `get` 函数

这个 `property` 函数是一个内部调用 `get` 函数的包装函数,会产生额外的函数调用开销。

请改用更快、更现代的 `get` 函数,或使用可选链(`?.`)。

:::

创建一个检索指定路径值的函数。

```typescript
const getter = property(path);
```

## 用法

### `property(path)`

当您想创建一个从特定路径检索值的函数时,请使用 `property`。创建的函数可以在多个对象中重用,便于与数组方法一起使用。

```typescript
import { property } from 'es-toolkit/compat';

// 基本用法
const getName = property('name');
const user = { name: 'John', age: 30 };
const result = getName(user);
// 结果: 'John'

// 深层路径访问
const getNestedValue = property('user.profile.name');
const data = { user: { profile: { name: 'Alice', age: 25 } } };
const nestedResult = getNestedValue(data);
// 结果: 'Alice'

// 使用数组路径
const getByArray = property(['user', 'profile', 'name']);
const arrayResult = getByArray(data);
// 结果: 'Alice'

// 与数组方法一起使用
const users = [
  { user: { profile: { name: 'John' } } },
  { user: { profile: { name: 'Jane' } } },
  { user: { profile: { name: 'Bob' } } },
];
const names = users.map(property('user.profile.name'));
// 结果: ['John', 'Jane', 'Bob']

// 数组索引访问
const getFirstItem = property('[0]');
const items = ['first', 'second', 'third'];
const firstItem = getFirstItem(items);
// 结果: 'first'

// 数字键访问
const getIndex = property(1);
const arr = ['a', 'b', 'c'];
const secondItem = getIndex(arr);
// 结果: 'b'
```

如果路径不存在,则返回 `undefined`。

```typescript
import { property } from 'es-toolkit/compat';

const getMissing = property('nonexistent.path');
const result = getMissing({ some: 'data' });
// 结果: undefined
```

#### 参数

- `path` (`PropertyPath`): 要检索值的路径。可以是字符串、数字、符号或这些类型的数组。

#### 返回值

(`(object: T) => R`): 返回一个函数,该函数从给定对象返回指定路径处的值。
