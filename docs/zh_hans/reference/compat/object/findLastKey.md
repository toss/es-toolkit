# findLastKey (Lodash 兼容性)

::: warning 请使用 `Array.findLast()` 和 `Object.keys()`

这个 `findLastKey` 函数由于需要处理各种条件类型和兼容性逻辑而变得复杂。

建议使用更快、更现代的 `Array.findLast()` 和 `Object.keys()`。

:::

从末尾开始查找符合条件的最后一个元素的键。

```typescript
const key = findLastKey(obj, predicate);
```

## 参考

### `findLastKey(obj, predicate)`

使用 `findLastKey` 在对象中查找符合条件的最后一个元素的键。与 `findKey` 相反,它从末尾开始搜索。可以使用函数、对象、数组、字符串等各种形式的条件。

```typescript
import { findLastKey } from 'es-toolkit/compat';

// 使用函数条件查找键
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

findLastKey(users, user => user.active);
// 返回值: 'charlie' (从末尾找到的第一个 active: true)

// 使用对象条件查找键
findLastKey(users, { active: true });
// 返回值: 'charlie'

// 使用属性路径查找键
findLastKey(users, 'active');
// 返回值: 'charlie'

// 使用属性-值数组查找键
findLastKey(users, ['active', false]);
// 返回值: 'bob'
```

如果没有符合条件的元素,则返回 `undefined`。

```typescript
import { findLastKey } from 'es-toolkit/compat';

findLastKey({ a: 1, b: 2 }, value => value > 5);
// 返回值: undefined
```

#### 参数

- `obj` (`T | null | undefined`): 要搜索的对象。
- `predicate` (`ObjectIteratee<T>`, 可选): 应用于每个元素的条件。可以是函数、对象、数组或字符串。

#### 返回值

(`string | undefined`): 返回符合条件的最后一个元素的键。如果没有找到则返回 `undefined`。
