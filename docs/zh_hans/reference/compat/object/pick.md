# pick (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `pick`

这个 `pick` 函数由于复杂的路径处理、调用 `get`/`set` 函数以及处理 `null`/`undefined` 而相对较慢。

请改用更快、更现代的 `es-toolkit` 的 [`pick`](../../object/pick.md)。

:::

通过仅选择指定属性来创建新对象。

```typescript
const result = pick(obj, ...keys);
```

## 参考

### `pick(object, ...props)`

当您想创建一个仅包含对象中所需属性的新对象时,请使用 `pick`。可以使用数组一次传递多个键,或将它们作为单个参数逐个传递。支持深层键路径,因此您也可以选择嵌套属性。

```typescript
import { pick } from 'es-toolkit/compat';

// 基本用法
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// 结果: { a: 1, c: 3 }

// 作为单个参数传递
const result2 = pick(obj, 'a', 'c');
// 结果: { a: 1, c: 3 }

// 选择深层路径
const nested = {
  user: { profile: { name: 'John', age: 30 }, settings: { theme: 'dark' } },
  admin: true,
};
const userInfo = pick(nested, 'user.profile.name', 'admin');
// 结果: { user: { profile: { name: 'John' } }, admin: true }

// 混合数组和单个键
const mixed = { a: 1, b: 2, c: 3, d: { e: 4, f: 5 } };
const selected = pick(mixed, ['a', 'b'], 'c', 'd.e');
// 结果: { a: 1, b: 2, c: 3, d: { e: 4 } }

// 区分点表示法键和实际带点的键
const ambiguous = {
  'a.b': 1, // 实际键 'a.b'
  a: { b: 2, c: 3 }, // 嵌套对象
};
const dotKey = pick(ambiguous, 'a.b');
// 结果: { 'a.b': 1 } (实际键优先)
```

`null` 或 `undefined` 被视为空对象。

```typescript
import { pick } from 'es-toolkit/compat';

pick(null, ['a', 'b']); // {}
pick(undefined, ['a', 'b']); // {}
```

#### 参数

- `object` (`T | null | undefined`): 要选择属性的对象。
- `...props` (`Array<Many<PropertyPath>>`): 要选择的属性键。可以指定单个键、键数组或深层键路径。

#### 返回值

(`Pick<T, U> | Partial<T>`): 返回仅包含指定属性的新对象。
