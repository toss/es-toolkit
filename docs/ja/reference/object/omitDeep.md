# omitDeep

指定されたネストされたパスを除外した新しいオブジェクトを返します。

```typescript
const result = omitDeep(object, paths);
```

## 使用法

### `omitDeep(object, paths)`

オブジェクトから特定のネストされたプロパティを除外したい時に`omitDeep`を使用してください。ドット(`.`)で区切られたパスに対応するプロパティを削除した新しいオブジェクトを返します。ネストされたオブジェクトと配列内のオブジェクトも再帰的に処理されます。

```typescript
import { omitDeep } from 'es-toolkit/object';

// ネストされたプロパティを除外
const obj = { a: 1, b: { x: 2, y: 3 }, c: 4 };
const result = omitDeep(obj, ['b.x']);
// resultは{ a: 1, b: { y: 3 }, c: 4 }になります

// 深くネストされたプロパティを除外
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
// nestedResultは{
//   user: {
//     id: 1,
//     profile: {
//       name: 'John',
//     },
//   },
// }になります

// 配列内のすべてのオブジェクトからプロパティを除外
const users = {
  users: [
    { id: 1, secret: 'abc' },
    { id: 2, secret: 'def' },
  ],
};
const withoutSecrets = omitDeep(users, ['users.secret']);
// withoutSecretsは{
//   users: [
//     { id: 1 },
//     { id: 2 },
//   ],
// }になります

// ネストされたオブジェクトや配列全体を除外
const data = {
  user: { id: 1, profile: { name: 'John' } },
  items: [1, 2, 3],
};
const trimmed = omitDeep(data, ['user.profile', 'items']);
// trimmedは{ user: { id: 1 } }になります
```

#### パラメータ

- `object` (`T`): パスを除外するオブジェクトです。
- `paths` (`readonly string[]`): オブジェクトから除外するドット区切りのパスの配列です。

#### 戻り値

(`OmitDeep<T, P>`): 指定されたパスが除外された新しいオブジェクトを返します。
