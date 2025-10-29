# invoke (Lodash 兼容性)

::: warning 请直接调用方法

由于路径解析、对象遍历、`get` 函数调用等复杂处理，这个 `invoke` 函数运行缓慢。

请使用更快、更现代的直接方法调用。

:::

使用给定的参数调用对象路径上的方法。

```typescript
const result = invoke(object, path, args);
```

## 参考

### `invoke(object, path, args)`

当您想要用参数调用对象特定路径上的方法时，请使用 `invoke`。路径可以指定为点表示法字符串或属性键数组。

```typescript
import { invoke } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// 使用点表示法指定路径
invoke(object, 'a.b', [1, 2]);
// Returns: 3

// 使用数组指定路径
invoke(object, ['a', 'b'], [1, 2]);
// Returns: 3

// 不存在的路径
invoke(object, 'a.c.d', [1, 2]);
// Returns: undefined

// 各种类型的参数
const obj = {
  calculate: {
    sum: function (...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    },
    multiply: function (a, b) {
      return a * b;
    },
  },
};

invoke(obj, 'calculate.sum', [1, 2, 3, 4]);
// Returns: 10

invoke(obj, ['calculate', 'multiply'], [5, 6]);
// Returns: 30
```

#### 参数

- `object` (`unknown`): 要调用方法的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要调用的方法的路径。可以是字符串、符号、数字或它们的数组。
- `args` (`any[]`): 调用方法时使用的参数数组。

#### 返回值

(`any`): 返回被调用方法的结果。如果方法不存在则返回 `undefined`。
