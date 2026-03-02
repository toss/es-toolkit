# find (`Set`)

查找Set中谓词函数返回true的第一个元素。

```typescript
const element = find(set, doesMatch);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `find(set, doesMatch)`

当您想查找Set中符合特定条件的第一个元素时,请使用 `find`。提供一个测试每个元素的谓词函数,它返回第一个匹配的元素,如果未找到则返回undefined。

```typescript
import { find } from 'es-toolkit/set';

const set = new Set([
  { name: 'apple', quantity: 10 },
  { name: 'banana', quantity: 5 },
  { name: 'grape', quantity: 15 },
]);

const result = find(set, value => value.quantity > 10);
// 结果: { name: 'grape', quantity: 15 }
```

您可以根据各种标准进行搜索。

```typescript
import { find } from 'es-toolkit/set';

// 按值属性查找
const users = new Set([
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
]);

const senior = find(users, user => user.age >= 35);
// 结果: { id: 3, name: 'Charlie', age: 35 }

// 按字符串模式查找
const emails = new Set(['user@example.com', 'admin@example.com', 'info@company.com']);

const adminEmail = find(emails, email => email.startsWith('admin'));
// 结果: 'admin@example.com'
```

#### 参数

- `set` (`Set<T>`): 要搜索的Set。
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): 测试每个元素的谓词函数。

#### 返回值

(`T | undefined`): 满足谓词的第一个元素,如果未找到则返回undefined。
