# omitDeep

返回一个排除指定嵌套路径的新对象。

```typescript
const result = omitDeep(object, paths);
```

## 用法

### `omitDeep(object, paths)`

当您想要从对象中排除特定的嵌套属性时,请使用 `omitDeep`。它返回一个新对象,其中删除了与指定点分隔路径对应的属性。嵌套对象和数组中的对象也会递归处理。

```typescript
import { omitDeep } from 'es-toolkit/object';

// 排除嵌套属性
const obj = { a: 1, b: { x: 2, y: 3 }, c: 4 };
const result = omitDeep(obj, ['b.x']);
// result 是 { a: 1, b: { y: 3 }, c: 4 }

// 排除深层嵌套属性
const nested = {
  user: {
    id: 1,
    profile: {
      name: 'John',
      email: 'john@example.com',
    },
  },
};
const nestedResult = omitDeep(nested, ['user.profile.email']);
// nestedResult 是 {
//   user: {
//     id: 1,
//     profile: {
//       name: 'John',
//     },
//   },
// }

// 从数组中的每个对象排除属性
const users = {
  users: [
    { id: 1, secret: 'abc' },
    { id: 2, secret: 'def' },
  ],
};
const withoutSecrets = omitDeep(users, ['users.secret']);
// withoutSecrets 是 {
//   users: [
//     { id: 1 },
//     { id: 2 },
//   ],
// }

// 排除整个嵌套对象或数组
const data = {
  user: { id: 1, profile: { name: 'John' } },
  items: [1, 2, 3],
};
const trimmed = omitDeep(data, ['user.profile', 'items']);
// trimmed 是 { user: { id: 1 } }
```

#### 参数

- `object` (`T`):要排除路径的对象。
- `paths` (`readonly string[]`):要从对象中排除的点分隔路径的数组。

#### 返回值

(`OmitDeep<T, P>`):排除了指定路径的新对象。
