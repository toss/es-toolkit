# mapKeys

オブジェクトのキーを関数を通じて変換した新しいオブジェクトを返します。

```typescript
const newObj = mapKeys(object, getNewKey);
```

## 参照

### `mapKeys(object, getNewKey)`

オブジェクトの各キーを変換して新しいオブジェクトを作りたい時に`mapKeys`を使用してください。値はそのまま維持され、キーのみが`getNewKey`関数の結果に変更されます。

```typescript
import { mapKeys } from 'es-toolkit/object';

// キーに接頭辞を追加
const obj = { a: 1, b: 2 };
const prefixed = mapKeys(obj, (value, key) => `prefix_${key}`);
// prefixedは{ prefix_a: 1, prefix_b: 2 }になります

// キーと値を組み合わせて新しいキーを作成
const combined = mapKeys(obj, (value, key) => `${key}${value}`);
// combinedは{ a1: 1, b2: 2 }になります

// キーを大文字に変換
const uppercased = mapKeys(obj, (value, key) => key.toString().toUpperCase());
// uppercasedは{ A: 1, B: 2 }になります
```

#### パラメータ

- `object` (`T extends Record<PropertyKey, any>`): キーを変換するオブジェクトです。
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => K`): 新しいキーを生成する関数です。値、キー、全体のオブジェクトをパラメータとして受け取ります。

#### 戻り値

(`Record<K, T[keyof T]>`): キーが変換された新しいオブジェクトを返します。
