# flatMapDeep (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [`flatMapDeep`](../../array/flatMapDeep.md)

此 `flatMapDeep` 函数由于复杂的集合类型处理和深度展平逻辑而运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [flatMapDeep](../../array/flatMapDeep.md)。

:::

对每个元素应用函数并递归展平结果。

```typescript
const result = flatMapDeep(collection, iteratee);
```

## 参考

### `flatMapDeep(collection, iteratee)`

对集合的每个元素应用迭代函数并返回展平到无限深度的数组。所有嵌套的数组结构都将被展平为一维数组。

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

// 对数组应用函数并深度展平
function duplicate(n) {
  return [[[n, n]]];
}
flatMapDeep([1, 2], duplicate);
// 结果: [1, 1, 2, 2]

// 对对象应用函数并深度展平
const obj = { a: 1, b: 2 };
flatMapDeep(obj, (value, key) => [[[key, value]]]);
// 结果: ['a', 1, 'b', 2]

// 使用字符串属性映射并深度展平
const users = [
  { user: 'barney', hobbies: [['hiking', 'coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDeep(users, 'hobbies');
// 结果: ['hiking', 'coding', 'reading']
```

不使用迭代器时递归展平值。

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const obj = { a: [[1, 2]], b: [[[3]]] };
flatMapDeep(obj);
// 结果: [1, 2, 3]
```

也可以使用部分对象进行条件映射。

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: [true, false] },
  { user: 'fred', active: [false] },
];
flatMapDeep(users, { active: [false] });
// 结果: [true, true] (active 数组包含 [false] 的元素的匹配结果)
```

#### 参数

- `collection` (`object | null | undefined`): 要迭代的集合。可以是数组、对象或字符串。
- `iteratee` (`ListIterator | ObjectIterator | string | object`, 可选): 应用于每个元素的迭代器。可以是函数、属性名或部分对象。

#### 返回值

(`any[]`): 返回映射后递归展平的新数组。
