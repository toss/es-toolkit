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
- `keys` (`readonly K[]`): 要从对象中选择的键的数组。

#### 返回值

(`Pick<T, K>`): 返回一个仅包含指定键对应属性的新对象。
