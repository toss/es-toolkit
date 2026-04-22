# pick

返回一个仅包含指定键对应属性的新对象。

```typescript
const result = pick(obj, keys);
```

## 用法

### `pick(obj, keys)`

当您想从对象中仅选择特定键对应的属性时,请使用 `pick`。它返回一个仅包含指定键对应属性的新对象。

```typescript
import { pick } from 'es-toolkit/object';

// 仅选择特定键
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// result 是 { a: 1, c: 3 }

// 即使指定不存在的键也会被忽略
const safe = pick(obj, ['a', 'nonexistent']);
// safe 是 { a: 1 }

// 也可以用于嵌套对象
const nested = {
  user: { name: 'John', age: 30 },
  posts: ['post1', 'post2'],
  settings: { theme: 'dark' },
};
const picked = pick(nested, ['user', 'settings']);
// picked 是 { user: { name: 'John', age: 30 }, settings: { theme: 'dark' } }
```

#### 参数

- `obj` (`T extends Record<string, any>`): 要选择属性的对象。
- `keys` (`readonly [...Keys]`): 要从对象中选择的键的数组或元组。

#### 返回值

返回类型取决于 `keys` 是元组还是可变长度数组。

- 如果 `keys` 是**元组**（例如 `['a', 'b']`）：返回 `Pick<T, 'a' | 'b'>` — 保证所有指定的键都存在。
- 如果 `keys` 是**可变长度数组**（例如 `keys: ('a' | 'b')[]`）：返回 `Partial<Pick<T, 'a' | 'b'>>` — 只有数组中实际包含的键才会出现在结果对象中。
