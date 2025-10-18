# constant (Lodash 兼容性)

::: warning 请使用箭头函数

这个 `constant` 函数为简单的任务创建了额外的函数包装器，产生了不必要的开销。

请使用更简单、更直观的箭头函数。

:::

创建一个总是返回给定值的函数。

```typescript
const constantFunction = constant(value);
```

## 参考

### `constant(value)`

当您需要一个总是返回特定值的函数时，请使用 `constant`。在函数式编程中提供默认值或用作回调函数时很有用。

```typescript
import { constant } from 'es-toolkit/compat';

// 基本用法
const always42 = constant(42);
console.log(always42()); // 42

const alwaysHello = constant('hello');
console.log(alwaysHello()); // "hello"
```

与数组的 map 或其他高阶函数一起使用时很方便。

```typescript
import { constant } from 'es-toolkit/compat';

// 将所有元素填充为 0
const numbers = [1, 2, 3, 4, 5];
const zeros = numbers.map(constant(0));
console.log(zeros); // [0, 0, 0, 0, 0]

// 将所有元素替换为相同的对象
const users = ['alice', 'bob', 'charlie'];
const defaultUser = users.map(constant({ role: 'user', active: true }));
console.log(defaultUser);
// [{ role: 'user', active: true }, { role: 'user', active: true }, { role: 'user', active: true }]
```

也可以用于提供条件默认值。

```typescript
import { constant } from 'es-toolkit/compat';

function processData(data, fallback = constant('默认值')) {
  return data || fallback();
}

console.log(processData(null)); // "默认值"
console.log(processData('实际数据')); // "实际数据"
```

保持对象引用。

```typescript
import { constant } from 'es-toolkit/compat';

const obj = { a: 1 };
const getObj = constant(obj);

console.log(getObj() === obj); // true (相同的对象引用)
```

#### 参数

- `value` (`T`, 可选): 函数将返回的值。如果不提供，则返回 `undefined`。

#### 返回值

(`() => T | undefined`): 返回一个总是返回给定值的新函数。
