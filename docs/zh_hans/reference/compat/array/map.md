# map (Lodash兼容性)

::: warning 使用`Array.prototype.map`

此`map`函数由于处理`null`或`undefined`、对象遍历、属性提取等附加功能而运行缓慢。在转换数组时，JavaScript的内置`Array.prototype.map`方法更快、更简单。

请使用更快、更现代的`Array.prototype.map`。

:::

转换数组或对象的每个元素以创建一个新数组。

```typescript
const mapped = map(collection, iteratee);
```

## 用法

### `map(collection, iteratee)`

当您想要转换数组、对象或类数组对象的每个元素时使用`map`。它对每个元素执行迭代函数，并将结果作为新数组返回。

```typescript
import { map } from 'es-toolkit/compat';

// 将数组的每个元素加倍
map([1, 2, 3], x => x * 2);
// Returns: [2, 4, 6]

// 转换对象的值
const obj = { a: 1, b: 2 };
map(obj, (value, key) => `${key}:${value}`);
// Returns: ['a:1', 'b:2']

// 提取属性
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, 'name');
// Returns: ['John', 'Jane']
```

`null`或`undefined`被视为空数组。

```typescript
import { map } from 'es-toolkit/compat';

map(null, x => x); // []
map(undefined, x => x); // []
```

通过将属性路径指定为字符串，还可以提取嵌套属性。

```typescript
import { map } from 'es-toolkit/compat';

const users = [{ info: { name: 'John' } }, { info: { name: 'Jane' } }];
map(users, 'info.name');
// Returns: ['John', 'Jane']
```

传递对象时，会检查每个元素是否与该对象匹配。

```typescript
import { map } from 'es-toolkit/compat';

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, { age: 30 });
// Returns: [true, false]
```

#### 参数

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 要遍历的数组或对象。
- `iteratee` (`function | string | object`, 可选): 对每个元素执行的函数、属性路径或要匹配的对象。如果不提供，则按原样返回每个元素。
  - 当它是函数时，以`(value, key, collection)`的形式调用。
  - 当它是字符串时，提取该属性。
  - 当它是对象时，检查每个元素是否与对象匹配。

#### 返回值

(`U[]`): 返回转换后的值的新数组。
