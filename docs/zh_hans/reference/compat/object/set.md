# set (Lodash 兼容性)

::: warning 请使用直接赋值

此 `set` 函数内部调用 `updateWith` 函数,由于复杂的路径处理和对象创建逻辑而运行缓慢。

请使用更快、更现代的直接赋值或解构赋值。

:::

在对象的指定路径设置值。

```typescript
const result = set(obj, path, value);
```

## 参考

### `set(object, path, value)`

当您想在对象的特定路径设置值时,请使用 `set`。如果路径的任何部分不存在,将自动创建。在处理嵌套对象或数组时很有用。

```typescript
import { set } from 'es-toolkit/compat';

// 基本用法
const obj = { a: { b: { c: 3 } } };
set(obj, 'a.b.c', 4);
console.log(obj.a.b.c); // 4

// 在数组中设置值
const arr = [1, 2, 3];
set(arr, '1', 4);
console.log(arr[1]); // 4

// 创建不存在的路径
const empty = {};
set(empty, 'user.profile.name', 'John');
console.log(empty);
// 结果: { user: { profile: { name: 'John' } } }

// 使用数组路径
const data = {};
set(data, ['nested', 'array', 0], 'first item');
console.log(data);
// 结果: { nested: { array: ['first item'] } }

// 自动创建数组索引
const list = {};
set(list, 'items[0]', 'first');
set(list, 'items[2]', 'third');
console.log(list);
// 结果: { items: ['first', undefined, 'third'] }

// 混合嵌套对象和数组
const complex = {};
set(complex, 'users[0].profile.settings.theme', 'dark');
console.log(complex);
// 结果: { users: [{ profile: { settings: { theme: 'dark' } } }] }

// 处理数字键
const numeric = {};
set(numeric, 123, 'number key');
console.log(numeric[123]); // 'number key'

// 覆盖现有值
const existing = { a: { b: 'old' } };
set(existing, 'a.b', 'new');
console.log(existing.a.b); // 'new'
```

原始对象被直接修改并返回。

```typescript
import { set } from 'es-toolkit/compat';

const original = { x: 1 };
const result = set(original, 'y', 2);

console.log(original === result); // true
console.log(original); // { x: 1, y: 2 }
```

#### 参数

- `object` (`T`): 要设置值的对象。
- `path` (`PropertyPath`): 要设置的属性路径。可以是字符串、数组或键的数组。
- `value` (`any`): 要设置的值。

#### 返回值

(`T`): 返回修改后的对象(与原始对象相同)。
