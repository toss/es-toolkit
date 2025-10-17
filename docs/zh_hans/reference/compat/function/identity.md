# identity (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `identity`
这个 `identity` 函数在 `es-toolkit` 的主库中也有相同功能的函数。它只是简单地返回输入值。

建议使用更快、更现代的 `es-toolkit` 的 [identity](../../function/identity.md)。
:::

返回接收到的值。

```typescript
const result = identity(value);
```

## 参考

### `identity(value)`

当您想要原样返回接收到的值时,请使用 `identity`。它主要用作默认值或占位符函数,在函数式编程中经常使用。

```typescript
import { identity } from 'es-toolkit/compat';

// 基本用法
console.log(identity(5)); // 5
console.log(identity('hello')); // 'hello'
console.log(identity({ key: 'value' })); // { key: 'value' }

// 与数组的 map 一起使用（值复制）
const numbers = [1, 2, 3, 4, 5];
const copied = numbers.map(identity);
console.log(copied); // [1, 2, 3, 4, 5]

// 在过滤中用作默认值
const values = [1, 0, '', 'hello', null, undefined, false, true];
const filtered = values.filter(identity); // 只保留真值
console.log(filtered); // [1, 'hello', true]

// 用作默认转换函数
function processData(data, transform = identity) {
  return transform(data);
}

console.log(processData('hello')); // 'hello'
console.log(processData('hello', x => x.toUpperCase())); // 'HELLO'
```

在大多数情况下,可以用更简单的箭头函数 `x => x` 替代:

```typescript
// 使用箭头函数而不是 identity（推荐）
const copied = numbers.map(x => x);
const filtered = values.filter(x => x);
```

#### 参数

- `value` (`T`): 要返回的值。

#### 返回值

(`T`): 原样返回接收到的值。
