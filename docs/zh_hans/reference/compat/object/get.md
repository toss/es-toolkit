# get (Lodash 兼容性)

::: warning 请使用点表示法或方括号表示法

此 `get` 函数由于复杂的路径解析、处理 `null` 或 `undefined` 以及默认值处理而性能较慢。

请使用更快、更现代的点表示法 (`.`)、方括号表示法 (`[]`) 或可选链 (`?.`)。

:::

获取对象指定路径的值。

```typescript
const value = get(object, path, defaultValue);
```

## 用法

### `get(object, path, defaultValue?)`

使用 `get` 安全地从对象路径获取值。当路径不存在或值为 `undefined` 时,返回默认值。

```typescript
import { get } from 'es-toolkit/compat';

// 使用点表示法访问嵌套对象
const object = { a: { b: { c: 3 } } };
get(object, 'a.b.c');
// => 3

// 使用数组表示法访问
get(object, ['a', 'b', 'c']);
// => 3

// 为不存在的路径提供默认值
get(object, 'a.b.d', 'default');
// => 'default'

// 包含数组索引的路径
const arrayObject = { users: [{ name: 'john' }, { name: 'jane' }] };
get(arrayObject, 'users[0].name');
// => 'john'
```

安全地访问 `null` 或 `undefined` 对象。

```typescript
import { get } from 'es-toolkit/compat';

get(null, 'a.b.c', 'default');
// => 'default'

get(undefined, ['a', 'b'], 'default');
// => 'default'
```

#### 参数

- `object` (`any`): 要查询的对象。
- `path` (`PropertyPath`): 要获取的属性路径。可以表示为字符串、数字、符号或数组。
- `defaultValue` (`any`, 可选): 当值为 `undefined` 时返回的默认值。

#### 返回值

(`any`): 返回解析的值或默认值。
