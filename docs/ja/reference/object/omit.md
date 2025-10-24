# omit

指定されたキーを除外した新しいオブジェクトを返します。

```typescript
const result = omit(obj, keys);
```

## 参照

### `omit(obj, keys)`

オブジェクトから特定のキーだけを除外したい時に`omit`を使用してください。指定されたキーに対応するプロパティを削除した新しいオブジェクトを返します。

```typescript
import { omit } from 'es-toolkit/object';

// 特定のキーを除外
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = omit(obj, ['b', 'c']);
// resultは{ a: 1, d: 4 }になります

// 存在しないキーを指定してもエラーは発生しません
const safe = omit(obj, ['b', 'nonexistent']);
// safeは{ a: 1, c: 3, d: 4 }になります

// 動的な文字列配列も使用できます
const keysToOmit = Object.keys({ b: true, c: true });
const dynamic = omit(obj, keysToOmit);
// dynamicは{ a: 1, d: 4 }になります
```

#### パラメータ

- `obj` (`T extends Record<string, any>`): キーを除外するオブジェクトです。
- `keys` (`readonly K[]` または `readonly string[]`): オブジェクトから除外するキーの配列です。

#### 戻り値

- `Omit<T, K>` または `Partial<T>` - 指定されたキーが除外された新しいオブジェクトを返します。
  - `keys`が `readonly K[]` の場合: `Omit<T, K>` でより厳密な型が返されます。
  - `keys`が `readonly string[]` の場合: `Partial<T>` が返されます。
