# keyBy (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [keyBy](../../array/keyBy.md)

由于需要处理 `null` 或 `undefined`、各种参数类型等,这个 `keyBy` 函数运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [keyBy](../../array/keyBy.md)。

:::

将集合的元素按指定键组织成对象。

```typescript
const result = keyBy(collection, iteratee);
```

## 参考

### `keyBy(collection, iteratee)`

使用指定的键生成函数或属性名将数组或对象的每个元素组织成对象。如果有多个元素具有相同的键,则使用最后一个元素。

```typescript
import { keyBy } from 'es-toolkit/compat';

// 通过属性名生成键
const array = [
  { dir: 'left', code: 97 },
  { dir: 'right', code: 100 },
];

keyBy(array, 'dir');
// => { left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } }

// 使用函数生成键
keyBy(array, o => String.fromCharCode(o.code));
// => { a: { dir: 'left', code: 97 }, d: { dir: 'right', code: 100 } }

// 也可以用于对象
const obj = {
  a: { id: 1, name: 'john' },
  b: { id: 2, name: 'jane' },
};
keyBy(obj, 'name');
// => { john: { id: 1, name: 'john' }, jane: { id: 2, name: 'jane' } }
```

`null` 或 `undefined` 被视为空对象。

```typescript
import { keyBy } from 'es-toolkit/compat';

keyBy(null, 'id'); // {}
keyBy(undefined, 'id'); // {}
```

#### 参数

- `collection` (`ArrayLike<T> | null | undefined`): 要按键组织的数组或对象。
- `iteratee` (`ValueIterateeCustom<T, PropertyKey>`, 可选): 用于生成键的函数或属性名。如果省略,则使用元素本身作为键。

#### 返回值

(`Record<string, T>`): 返回一个新对象,其中每个元素映射到生成的键。
