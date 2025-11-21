# unset (Lodash 兼容性)

::: warning 请使用 `delete` 运算符

此 `unset` 函数由于复杂的路径解析和嵌套对象处理而运行缓慢。

请直接使用更快、更现代的 `delete` 运算符。

:::

删除对象指定路径的属性。

```typescript
const success = unset(obj, path);
```

## 用法

### `unset(obj, path)`

当您想要删除嵌套对象中特定路径的属性时，使用 `unset`。路径可以指定为字符串或数组。

```typescript
import { unset } from 'es-toolkit/compat';

// 使用字符串路径删除嵌套属性
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // => true
console.log(obj); // { a: { b: {} } }

// 使用数组路径删除嵌套属性
const obj2 = { a: { b: { c: 42 } } };
unset(obj2, ['a', 'b', 'c']); // => true
console.log(obj2); // { a: { b: {} } }
```

也可以通过数组索引删除元素。

```typescript
import { unset } from 'es-toolkit/compat';

const arr = [1, 2, 3, 4];
unset(arr, 1); // => true
console.log(arr); // [1, undefined, 3, 4]（元素被删除并变为 undefined）
```

即使属性不存在或已被删除，也会返回 `true`。

```typescript
import { unset } from 'es-toolkit/compat';

const obj = { a: { b: 1 } };
unset(obj, 'a.c'); // => true（不存在的属性）
```

`null` 或 `undefined` 对象会被安全处理。

```typescript
import { unset } from 'es-toolkit/compat';

unset(null, 'a.b'); // => true
unset(undefined, 'a.b'); // => true
```

#### 参数

- `obj` (`any`): 要修改的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要删除的属性路径。

#### 返回值

(`boolean`): 如果属性被删除则返回 `true`，否则返回 `false`。
