# negate (Lodash 兼容性)

::: warning 使用逻辑非运算符

这个 `negate` 函数只是对函数的结果进行取反。在大多数情况下,直接使用逻辑非运算符(`!`)更简单且更快。

建议使用更快且更现代的 `!predicate(...args)` 或 `(...args) => !predicate(...args)`。

:::

创建一个对给定函数的结果进行取反的新函数。

```typescript
const negatedFunc = negate(predicate);
```

## 用法

### `negate(predicate)`

当您想创建一个对函数结果进行取反的新函数时,使用 `negate`。在过滤或条件语句中检查相反条件时很有用。

```typescript
import { negate } from 'es-toolkit/compat';

// 基本用法
function isEven(n) {
  return n % 2 === 0;
}

const isOdd = negate(isEven);
console.log(isOdd(3)); // true
console.log(isOdd(4)); // false

// 在数组过滤中使用
const numbers = [1, 2, 3, 4, 5, 6];
const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]

// 现代替代方案(推荐)
const modernOddNumbers = numbers.filter(n => !isEven(n));
// 或
const isOddModern = n => !isEven(n);
const modernOddNumbers2 = numbers.filter(isOddModern);

// 复杂示例
function isEmpty(str) {
  return str.trim().length === 0;
}

const hasContent = negate(isEmpty);
const messages = ['', ' ', 'hello', '  ', 'world'];
const validMessages = messages.filter(hasContent);
console.log(validMessages); // ['hello', 'world']
```

主要用于数组过滤或条件逻辑,但在大多数情况下,直接使用逻辑非运算符更直观。

#### 参数

- `predicate` (`Function`): 要对其结果进行取反的函数。必须返回布尔值。

#### 返回值

(`Function`): 返回一个新函数,该函数返回原函数结果的取反值。
