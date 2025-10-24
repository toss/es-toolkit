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
```

#### 参数

- `obj` (`T extends Record<string, any>`):要排除键的对象。
- `keys` (`readonly K[]`):要从对象中排除的键的数组。

#### 返回值

(`Omit<T, K>`):排除了指定键的新对象。
