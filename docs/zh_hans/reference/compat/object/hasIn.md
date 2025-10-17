# hasIn (Lodash 兼容性)

::: warning 请使用 `in` 运算符

由于复杂的路径解析和原型链检查,这个 `hasIn` 函数的性能较慢。

请使用更快、更现代的 `in` 运算符或 `Object.hasOwn()` 函数。

:::

检查对象中指定路径的属性是否存在,包括继承的属性。

```typescript
const exists = hasIn(object, path);
```

## 参考

### `hasIn(object, path)`

当您想检查对象在特定路径是否有属性时,使用 `hasIn`。与 `has` 不同,它也会检查继承的属性(原型链中的属性)。

```typescript
import { hasIn } from 'es-toolkit/compat';

// 检查自有属性
const object = { a: 1, b: 2 };
hasIn(object, 'a');
// => true

// 检查嵌套对象
const nested = { a: { b: { c: 3 } } };
hasIn(nested, 'a.b.c');
// => true
hasIn(nested, ['a', 'b', 'c']);
// => true

// 不存在的属性
hasIn(nested, 'a.b.d');
// => false

// 检查数组索引
const array = [1, 2, 3];
hasIn(array, 2);
// => true
hasIn(array, 5);
// => false
```

它也会检查继承的属性。

```typescript
import { hasIn } from 'es-toolkit/compat';

// 检查原型链中的属性
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - 也能找到继承的属性
has(rect, 'area'); // false - has 只检查自有属性
```

安全地处理 `null` 和 `undefined`。

```typescript
import { hasIn } from 'es-toolkit/compat';

hasIn(null, 'a');
// => false

hasIn(undefined, 'b');
// => false
```

#### 参数

- `object` (`any`): 要检查的对象。
- `path` (`PropertyPath`): 要检查的属性路径。可以用字符串、数字、符号或数组表示。

#### 返回值

(`boolean`): 如果路径的属性存在(无论是自有属性还是继承的属性),则返回 `true`,否则返回 `false`。
