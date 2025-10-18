# pick

指定されたキーに対応するプロパティのみを含む新しいオブジェクトを返します。

```typescript
const result = pick(obj, keys);
```

## 参照

### `pick(obj, keys)`

オブジェクトから特定のキーに対応するプロパティのみを選択したい時に`pick`を使用してください。指定されたキーに対応するプロパティのみを含む新しいオブジェクトを返します。

```typescript
import { pick } from 'es-toolkit/object';

// 特定のキーのみを選択
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// resultは{ a: 1, c: 3 }になります

// 存在しないキーを指定しても無視されます
const safe = pick(obj, ['a', 'nonexistent']);
// safeは{ a: 1 }になります

// ネストされたオブジェクトでも使用できます
const nested = {
  user: { name: 'John', age: 30 },
  posts: ['post1', 'post2'],
  settings: { theme: 'dark' },
};
const picked = pick(nested, ['user', 'settings']);
// pickedは{ user: { name: 'John', age: 30 }, settings: { theme: 'dark' } }になります
```

#### パラメータ

- `obj` (`T extends Record<string, any>`): プロパティを選択するオブジェクトです。
- `keys` (`readonly K[]`): オブジェクトから選択するキーの配列です。

#### 戻り値

(`Pick<T, K>`): 指定されたキーに対応するプロパティのみを含む新しいオブジェクトを返します。
