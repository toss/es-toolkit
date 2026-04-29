# overSome (Lodash 兼容性)

::: warning 使用 `Array.some`

这个 `overSome` 函数在转换和检查条件函数的过程中会产生额外的开销。

改为使用更快、更现代的 `Array.some` 方法。

:::

创建一个函数，该函数检查条件函数中是否有任意一个返回真值。

```typescript
const anyValidator = overSome(predicates);
```

## 用法

### `overSome(...predicates)`

接收多个条件函数，创建一个函数，该函数检查给定值是否满足任意一个条件。对灵活的条件检查或替代验证很有用。

```typescript
import { overSome } from 'es-toolkit/compat';

// 检查是否为字符串或数字
const isStringOrNumber = overSome([value => typeof value === 'string', value => typeof value === 'number']);

isStringOrNumber('hello'); // => true
isStringOrNumber(42); // => true
isStringOrNumber(true); // => false

// 检查多个条件中是否有任意一个满足
const hasValidProperty = overSome([
  obj => obj.name && obj.name.length > 0,
  obj => obj.email && obj.email.includes('@'),
  obj => obj.phone && obj.phone.length >= 10,
]);

hasValidProperty({ name: 'John' }); // => true
hasValidProperty({ email: 'john@example.com' }); // => true
hasValidProperty({ phone: '1234567890' }); // => true
hasValidProperty({ age: 30 }); // => false
```

也可以检查对象属性。

```typescript
import { overSome } from 'es-toolkit/compat';

// 检查多个条件中是否有任意一个匹配
const matchesAnyCondition = overSome([
  'isActive', // isActive属性是否为真值
  { role: 'admin' }, // role是否为'admin'
  ['status', 'vip'], // status是否为'vip'
]);

matchesAnyCondition({ isActive: true }); // => true
matchesAnyCondition({ role: 'admin' }); // => true
matchesAnyCondition({ status: 'vip' }); // => true
matchesAnyCondition({ role: 'user', status: 'normal' }); // => false
```

#### 参数

- `...predicates` (`Array<Function | string | object | Array>`): 要检查的条件函数。可以是函数、属性名、对象、属性-值对等。

#### 返回值

(`(...args: any[]) => boolean`): 返回一个函数，如果任意一个条件满足则返回 `true`，否则全部不满足则返回 `false`。
