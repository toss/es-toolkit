# stubFalse (Lodash 兼容性)

::: warning 直接使用 `false`

这个 `stubFalse` 函数是一个简单返回 `false` 的包装函数，是不必要的抽象。

改为使用更快、更直接的 `false` 值。

:::

始终返回 `false`。

```typescript
const falseValue = stubFalse();
```

## 用法

### `stubFalse()`

始终返回 `false` 的函数。在函数式编程中需要一致的假值或在条件回调中作为默认值时很有用。

```typescript
import { stubFalse } from 'es-toolkit/compat';

// 返回 false
const result = stubFalse();
console.log(result); // => false

// 在数组过滤中作为默认条件使用
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(stubFalse); // 移除所有元素
console.log(evenNumbers); // => []

// 在函数式编程中使用
const isValid = condition => (condition ? someValidation : stubFalse);
const validator = isValid(false);
console.log(validator()); // => false
```

每次返回相同的 `false` 值。

```typescript
import { stubFalse } from 'es-toolkit/compat';

const result1 = stubFalse();
const result2 = stubFalse();

console.log(result1 === result2); // => true
console.log(typeof result1); // => 'boolean'
console.log(result1); // => false
```

#### 参数

无参数。

#### 返回值

(`false`): 始终返回 `false`。
