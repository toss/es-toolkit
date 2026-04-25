# findKey (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `findKey`

由于需要处理各种条件类型和兼容性逻辑,此 `findKey` 函数的行为较为复杂。

建议使用更快、更现代的 `es-toolkit` 的 [findKey](../../object/findKey.md)。

:::

查找满足条件的第一个元素的键。

```typescript
const key = findKey(obj, predicate);
```

## 用法

### `findKey(obj, predicate)`

使用 `findKey` 在对象中查找满足条件的第一个元素的键。可以使用函数、对象、数组、字符串等各种形式的条件。

```typescript
import { findKey } from 'es-toolkit/compat';

// 使用函数条件查找键
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

findKey(users, user => user.age > 30);
// 返回值: 'charlie'

// 使用对象条件查找键
findKey(users, { active: false });
// 返回值: 'bob'

// 使用属性路径查找键
findKey(users, 'active');
// 返回值: 'alice'
```

如果没有匹配的元素,则返回 `undefined`。

```typescript
import { findKey } from 'es-toolkit/compat';

findKey({ a: 1, b: 2 }, value => value > 5);
// 返回值: undefined
```

#### 参数

- `obj` (`T | null | undefined`): 要搜索的对象。
- `predicate` (`ObjectIteratee<T>`, 可选): 应用于每个元素的条件。可以是函数、对象、数组或字符串。

#### 返回值

(`string | undefined`): 返回满足条件的第一个元素的键。如果没有找到匹配项,则返回 `undefined`。
