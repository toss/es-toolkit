# has (Lodash 兼容性)

::: warning 请使用 `Object.hasOwn` 或 `in` 运算符

由于复杂的路径解析和数组索引处理,这个 `has` 函数的运行速度较慢。

请使用更快、更现代的 `Object.hasOwn()` 或 `in` 运算符。

:::

检查对象中指定路径的属性是否存在。

```typescript
const exists = has(object, path);
```

## 参考

### `has(object, path)`

当您想检查对象是否具有特定路径的属性时,请使用 `has`。它只检查自有属性(own property),不检查继承的属性。

```typescript
import { has } from 'es-toolkit/compat';

// 简单属性检查
const object = { a: 1, b: 2 };
has(object, 'a');
// => true

// 嵌套对象检查
const nested = { a: { b: { c: 3 } } };
has(nested, 'a.b.c');
// => true
has(nested, ['a', 'b', 'c']);
// => true

// 不存在的属性
has(nested, 'a.b.d');
// => false

// 数组索引检查
const array = [1, 2, 3];
has(array, 2);
// => true
has(array, 5);
// => false
```

它在稀疏数组中也能正常工作。

```typescript
import { has } from 'es-toolkit/compat';

const sparse = [1, , 3]; // 索引 1 为空
has(sparse, 0); // true
has(sparse, 1); // false - 实际上没有值
has(sparse, 2); // true
```

#### 参数

- `object` (`any`): 要查询的对象。
- `path` (`PropertyPath`): 要检查的属性路径。可以表示为字符串、数字、符号或数组。

#### 返回值

(`boolean`): 如果路径上的属性存在则返回 `true`,否则返回 `false`。
