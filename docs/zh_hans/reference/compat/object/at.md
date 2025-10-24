# at (Lodash 兼容性)

::: warning 请使用解构赋值

这个 `at` 函数由于复杂的路径处理和各种参数类型的处理而相对较慢。

请改用解构赋值或直接属性访问。

:::

返回对象中指定路径的值作为数组。

```typescript
const result = at(object, ...paths);
```

## 参考

### `at(object, ...paths)`

当您想要一次从对象中获取多个路径的值时,请使用 `at`。它返回与每个路径对应的值作为数组。

```typescript
import { at } from 'es-toolkit/compat';

// 基本用法
const object = { a: 1, b: 2, c: 3 };
const result = at(object, 'a', 'c');
// Returns: [1, 3]

// 嵌套对象
const nested = {
  a: {
    b: {
      c: 4,
    },
  },
  x: [1, 2, 3],
};
const result2 = at(nested, 'a.b.c', 'x[1]');
// Returns: [4, 2]

// 将路径作为数组传递
const paths = ['a', 'c'];
const result3 = at(object, paths);
// Returns: [1, 3]

// 不存在的路径
const result4 = at(object, 'nonexistent', 'a');
// Returns: [undefined, 1]
```

`null` 或 `undefined` 对象返回 `undefined` 数组。

```typescript
import { at } from 'es-toolkit/compat';

at(null, 'a', 'b'); // [undefined, undefined]
at(undefined, 'a', 'b'); // [undefined, undefined]
```

#### 参数

- `object` (`T | null | undefined`): 要获取值的对象。
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): 要获取值的路径。可以作为单独的参数或数组传递。

#### 返回值

(`unknown[]`): 返回与指定路径对应的值数组。
