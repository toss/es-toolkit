# overEvery (Lodash 兼容性)

::: warning 使用 `Array.every`

这个 `overEvery` 函数在转换和检查条件函数的过程中会产生额外的开销。

改为使用更快、更现代的 `Array.every` 方法。

:::

创建一个函数，该函数检查所有条件函数是否都返回真值。

```typescript
const allValidator = overEvery(predicates);
```

## 参考

### `overEvery(...predicates)`

接收多个条件函数，创建一个函数，该函数检查给定值是否满足所有条件。对复合条件检查或数据验证很有用。

```typescript
import { overEvery } from 'es-toolkit/compat';

// 检查字符串条件
const isValidString = overEvery([
  value => typeof value === 'string',
  value => value.length > 3,
  value => value.includes('o'),
]);

isValidString('hello'); // => true
isValidString('hi'); // => false (长度为3以下)
isValidString('test'); // => false (没有'o')

// 检查数字范围
const isInRange = overEvery([
  num => num >= 0,
  num => num <= 100,
  num => num % 1 === 0, // 检查是否为整数
]);

isInRange(50); // => true
isInRange(-5); // => false (小于0)
isInRange(150); // => false (超过100)
isInRange(50.5); // => false (不是整数)
```

也可以检查对象属性。

```typescript
import { overEvery } from 'es-toolkit/compat';

// 检查对象属性
const isValidUser = overEvery([
  'name', // name属性是否为真值
  { age: 30 }, // age是否为30
  ['active', true], // active是否为true
]);

isValidUser({ name: 'John', age: 30, active: true }); // => true
isValidUser({ name: '', age: 30, active: true }); // => false (name为空字符串)
isValidUser({ name: 'John', age: 25, active: true }); // => false (age不同)
```

#### 参数

- `...predicates` (`Array<Function | string | object | Array>`): 要检查的条件函数。可以是函数、属性名、对象、属性-值对等。

#### 返回值

(`(...args: any[]) => boolean`): 返回一个函数，如果满足所有条件则返回 `true`，否则返回 `false`。
