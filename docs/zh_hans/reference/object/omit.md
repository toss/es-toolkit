# omit

返回一个排除指定键的新对象。

```typescript
const result = omit(obj, keys);
```

## 参考

### `omit(obj, keys)`

当您想要从对象中排除特定键时使用 `omit`。它返回一个新对象,其中删除了与指定键对应的属性。

```typescript
import { omit } from 'es-toolkit/object';

// 排除特定键
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = omit(obj, ['b', 'c']);
// result 是 { a: 1, d: 4 }

// 指定不存在的键不会导致错误
const safe = omit(obj, ['b', 'nonexistent']);
// safe 是 { a: 1, c: 3, d: 4 }

// 也可以使用动态字符串数组
const keysToOmit = Object.keys({ b: true, c: true });
const dynamic = omit(obj, keysToOmit);
// dynamic 是 { a: 1, d: 4 }
```

#### 参数

- `obj` (`T extends Record<string, any>`):要排除键的对象。
- `keys` (`readonly K[]` 或 `readonly string[]`):要从对象中排除的键的数组。

#### 返回值

- `Omit<T, K>` 或 `Partial<T>` - 返回排除了指定键的新对象。
  - 当 `keys` 为 `readonly K[]` 时: 返回 `Omit<T, K>`,类型更严格。
  - 当 `keys` 为 `readonly string[]` 时: 返回 `Partial<T>`。
