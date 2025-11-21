# omit (Lodash 互換性)

::: warning `es-toolkit`の`omit`を使用してください

この `omit` 関数は、深いコピーと `unset` 関数の呼び出しにより相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`omit`](../../object/omit.md)を使用してください。

:::

オブジェクトから指定されたキーを除外した新しいオブジェクトを作成します。

```typescript
const result = omit(obj, ...keys);
```

## 使用法

### `omit(object, ...paths)`

オブジェクトから指定されたキーを除外した新しいオブジェクトを作成します。深いキーパスをサポートし、配列を使用して一度に複数のキーを指定することもできます。オブジェクトから機密情報を削除したり、必要なプロパティのみを選択する際に便利です。

```typescript
import { omit } from 'es-toolkit/compat';

// 基本的なキーの削除
const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const publicUser = omit(user, 'password', 'email');
// 結果: { id: 1, name: 'John' }

// 配列で複数のキーを削除
const data = { a: 1, b: 2, c: 3, d: 4 };
const filtered = omit(data, ['a', 'c']);
// 結果: { b: 2, d: 4 }

// 深いキーパスの削除
const nested = {
  user: { profile: { name: 'John', age: 30 }, settings: { theme: 'dark' } },
  admin: true,
};
const result = omit(nested, 'user.profile.age', 'admin');
// 結果: { user: { profile: { name: 'John' }, settings: { theme: 'dark' } } }

// ネストされた配列とキーの組み合わせ
const complex = { a: 1, b: 2, c: 3, d: { e: 4, f: 5 } };
const simplified = omit(complex, 'a', ['b', 'c'], 'd.f');
// 結果: { d: { e: 4 } }
```

配列、文字列、キーパスを自由に組み合わせることができます。

```typescript
import { omit } from 'es-toolkit/compat';

const config = {
  api: { url: 'https://api.example.com', key: 'secret', timeout: 5000 },
  ui: { theme: 'dark', language: 'en' },
  debug: true,
};

// 複数の方法でキーを指定
const cleaned = omit(config, 'api.key', ['debug'], 'ui.language');
// 結果: { api: { url: 'https://api.example.com', timeout: 5000 }, ui: { theme: 'dark' } }
```

`null`または`undefined`は空のオブジェクトとして処理されます。

```typescript
import { omit } from 'es-toolkit/compat';

omit(null, 'key'); // {}
omit(undefined, 'key'); // {}
```

#### パラメータ

- `object` (`T | null | undefined`): キーを削除する元のオブジェクトです。
- `...paths` (`Array<Many<PropertyKey>>`): 削除するキーです。単一のキー、キーの配列、または深いキーパスを指定できます。

#### 戻り値

(`Partial<T>`): 指定されたキーが削除された新しいオブジェクトを返します。
