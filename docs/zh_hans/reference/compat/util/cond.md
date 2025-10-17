# cond (Lodash 兼容性)

::: warning 请使用 if-else 语句或 switch 语句

由于复杂的 iteratee 处理、数组转换和函数验证等原因，这个 `cond` 函数运行缓慢。

请使用更快、更清晰的 if-else 语句或 switch 语句。

:::

接收条件和函数对的数组，创建一个按顺序检查条件并执行第一个为真的条件对应函数的函数。

```typescript
const conditionFunction = cond(pairs);
```

## 参考

### `cond(pairs)`

当您想要按顺序检查多个条件并执行第一个为真的条件对应的函数时，请使用 `cond`。在以函数式方式表达复杂条件逻辑时很有用。

```typescript
import { cond } from 'es-toolkit/compat';

// 基本用法
const getValue = cond([
  [x => x > 10, x => 'big'],
  [x => x > 5, x => 'medium'],
  [x => x > 0, x => 'small'],
  [() => true, () => 'zero or negative'],
]);

console.log(getValue(15)); // "big"
console.log(getValue(8)); // "medium"
console.log(getValue(3)); // "small"
console.log(getValue(-1)); // "zero or negative"
```

也可以用于对象模式匹配。

```typescript
import { cond } from 'es-toolkit/compat';

const processUser = cond([
  [user => user.role === 'admin', user => `管理员: ${user.name}`],
  [user => user.role === 'user', user => `用户: ${user.name}`],
  [user => user.role === 'guest', user => `访客: ${user.name}`],
  [() => true, () => '未知角色'],
]);

console.log(processUser({ name: '张三', role: 'admin' })); // "管理员: 张三"
console.log(processUser({ name: '李四', role: 'user' })); // "用户: 李四"
```

只执行第一个为真的条件，如果所有条件都为假，则返回 `undefined`。

```typescript
import { cond } from 'es-toolkit/compat';

const checkValue = cond([
  [x => x > 10, x => 'greater than 10'],
  [x => x < 5, x => 'less than 5'],
]);

console.log(checkValue(15)); // "greater than 10"
console.log(checkValue(3)); // "less than 5"
console.log(checkValue(7)); // undefined (不符合条件)
```

#### 参数

- `pairs` (`Array<[predicate, func]>`): 由条件函数和要执行的函数对组成的数组。

#### 返回值

(`(...args: any[]) => unknown`): 返回一个新函数，检查条件并执行第一个为真的条件对应的函数。
