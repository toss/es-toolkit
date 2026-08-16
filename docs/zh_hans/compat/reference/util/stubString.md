# stubString (Lodash 兼容性)

::: warning 直接使用 `''`

这个 `stubString` 函数是一个简单返回空字符串的包装函数，是不必要的抽象。

改为使用更快、更直接的 `''`。

:::

始终返回空字符串。

```typescript
const emptyString = stubString();
```

## 用法

### `stubString()`

始终返回空字符串的函数。当需要空字符串作为默认值或在函数式编程中需要一致的返回值时使用。

```typescript
import { stubString } from 'es-toolkit/compat';

// 返回空字符串
const emptyString = stubString();
console.log(emptyString); // => ''

// 作为默认值使用
function formatMessage(message = stubString()) {
  return message || '默认消息';
}

console.log(formatMessage()); // => '默认消息'
console.log(formatMessage('你好')); // => '你好'

// 在函数式编程中使用
const createEmpty = () => stubString();
const str = createEmpty();
console.log(str.length); // => 0
```

每次返回相同的空字符串。

```typescript
import { stubString } from 'es-toolkit/compat';

const str1 = stubString();
const str2 = stubString();

console.log(str1 === str2); // => true
console.log(typeof str1); // => 'string'
console.log(str1.length); // => 0
```

#### 参数

无参数。

#### 返回值

(`string`): 始终返回空字符串。
