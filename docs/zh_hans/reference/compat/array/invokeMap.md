# invokeMap (Lodash 兼容性)

::: warning 使用 `Array.map` 和 `Object.values(...).map`

由于需要处理 `null` 或 `undefined`、方法查找等,这个 `invokeMap` 函数运行缓慢。

请改用更快、更现代的 `Array.map` 和 `Object.values(...).map`。

例如,`invokeMap([1, 2, 3], 'toString')` 可以写成 `[1, 2, 3].map(x => x.toString())`。

:::

在数组或对象的每个元素上调用指定的方法,并返回结果数组。

```typescript
const result = invokeMap(collection, method, ...args);
```

## 参考

### `invokeMap(collection, method, ...args)`

在数组或对象的每个元素上调用指定的方法。可以将方法名作为字符串传递,也可以直接传递函数。额外的参数会传递给每次方法调用。

```typescript
import { invokeMap } from 'es-toolkit/compat';

// 在数组的每个元素上调用方法
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[5, 1, 7].sort(), [3, 2, 1].sort()]
// => [[1, 5, 7], [1, 2, 3]]

// 使用参数调用方法
invokeMap([123, 456], 'toString', 2);
// => [(123).toString(2), (456).toString(2)]
// => ['1111011', '111001000']

// 直接传递函数
invokeMap(['a', 'b', 'c'], String.prototype.toUpperCase);
// => [String.prototype.toUpperCase('a'), String.prototype.toUpperCase('b'), String.prototype.toUpperCase('c')]
// => ['A', 'B', 'C']
```

对于对象,在每个值上调用方法。

```typescript
import { invokeMap } from 'es-toolkit/compat';

const obj = { a: 1.1, b: 2.2, c: 3.3 };
invokeMap(obj, 'toFixed', 1);
// => ['1.1', '2.2', '3.3']
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { invokeMap } from 'es-toolkit/compat';

invokeMap(null, 'toString'); // []
invokeMap(undefined, 'toString'); // []
```

#### 参数

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): 要调用方法的数组或对象。
- `method` (`string | ((...args: any[]) => R)`): 要调用的方法名或函数。
- `...args` (`any[]`): 传递给每次方法调用的额外参数。

#### 返回值

(`Array<R | undefined>`): 返回包含每次方法调用结果的新数组。
