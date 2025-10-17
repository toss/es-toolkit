# spread (Lodash 兼容性)

::: warning 请使用现代展开运算符

此 `spread` 函数处理复杂的逻辑,在特定索引处将数组参数展开为单个参数,这可能会导致性能下降。

请改用更快、更现代的展开运算符(`...`)直接使用。

:::

创建一个新函数,在调用函数时将数组参数展开为单个参数。

```typescript
const spreadFunc = spread(func, argsIndex);
```

## 参考

### `spread(func, argsIndex)`

当您想通过将数组参数展开为单个参数来调用函数时,请使用 `spread`。您可以指定数组的位置,允许它与其他参数一起使用。

```typescript
import { spread } from 'es-toolkit/compat';

// 基本用法 - 第一个参数是数组
function add(a, b) {
  return a + b;
}

const spreadAdd = spread(add);
spreadAdd([1, 2]); // 3

// 当第二个参数是数组时
function greet(greeting, names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

const spreadGreet = spread(greet, 1);
spreadGreet('Hello', ['Alice', 'Bob']); // 'Hello, Alice and Bob!'

// 现代展开运算符示例(推荐)
function modernAdd(a, b) {
  return a + b;
}

const numbers = [1, 2];
modernAdd(...numbers); // 3 - 更简单、更快
```

在将数组作为函数参数传递时特别有用,但在现代 JavaScript 中,使用展开运算符更为常见。

#### 参数

- `func` (`Function`): 要转换的函数。
- `argsIndex` (`number`, 可选): 数组参数的位置。默认值为 `0`。

#### 返回值

(`Function`): 返回一个新函数,在调用时展开数组参数。
