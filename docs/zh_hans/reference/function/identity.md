# identity

原样返回接收到的值。

```typescript
const result = identity(value);
```

## 用法

### `identity(value)`

当您想要原样返回某个值而不进行任何更改时,请使用 `identity`。

这在作为函数参数的默认值时很有用。在数组的 `map` 或 `filter` 中返回值本身,或在函数式编程中作为占位符使用。

```typescript
import { identity } from 'es-toolkit/function';

// 原样返回数字
const num = identity(5);
console.log(num); // 5

// 原样返回字符串
const str = identity('hello');
console.log(str); // 'hello'

// 原样返回对象
const obj = identity({ key: 'value' });
console.log(obj); // { key: 'value' }

// 在数组中使用的示例
const numbers = [1, 2, 3, 4, 5];
const same = numbers.map(identity);
console.log(same); // [1, 2, 3, 4, 5]
```

#### 参数

- `value` (`T`): 要返回的值。

#### 返回值

(`T`): 原样返回接收到的值。
