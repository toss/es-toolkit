# mapKeys (Lodash 互換性)

::: warning `es-toolkit`の`mapKeys`を使用してください

この `mapKeys` 関数は、`null`や`undefined`の処理、`iteratee`変換過程により相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`mapKeys`](../../object/mapKeys.md)を使用してください。

:::

値をそのままにしてキーを変換し、新しいオブジェクトを作成します。

```typescript
const result = mapKeys(obj, iteratee);
```

## 使用法

### `mapKeys(object, iteratee)`

`iteratee`関数を使用してオブジェクト内の各キーを変換し、新しいオブジェクトを作成します。値は変更されず、キーのみが変更されます。オブジェクトのキーを変換または正規化する際に便利です。

```typescript
import { mapKeys } from 'es-toolkit/compat';

// キーに接頭辞を追加
const obj = { a: 1, b: 2, c: 3 };
const result = mapKeys(obj, (value, key) => 'prefix_' + key);
// 結果: { prefix_a: 1, prefix_b: 2, prefix_c: 3 }

// キーを大文字に変換
const data = { name: 'John', age: 30 };
const uppercased = mapKeys(data, (value, key) => key.toUpperCase());
// 結果: { NAME: 'John', AGE: 30 }

// 配列のインデックスをキーに変換
const arr = ['apple', 'banana', 'orange'];
const indexed = mapKeys(arr, (value, index) => `item_${index}`);
// 結果: { item_0: 'apple', item_1: 'banana', item_2: 'orange' }

// キーと値を組み合わせて新しいキーを生成
const scores = { math: 90, science: 85, english: 92 };
const detailed = mapKeys(scores, (value, key) => `${key}_score_${value}`);
// 結果: { math_score_90: 90, science_score_85: 85, english_score_92: 92 }
```

`null`または`undefined`は空のオブジェクトとして処理されます。

```typescript
import { mapKeys } from 'es-toolkit/compat';

mapKeys(null, iteratee); // {}
mapKeys(undefined, iteratee); // {}
```

#### パラメータ

- `object` (`ArrayLike<T> | T | null | undefined`): キーを変換するオブジェクトまたは配列です。
- `iteratee` (`ListIteratee<T> | ObjectIteratee<T>`, オプション): 各キーを変換する関数です。デフォルトは`identity`関数です。

#### 戻り値

(`Record<string, T> | Record<string, T[keyof T]>`): 変換されたキーを持つ新しいオブジェクトを返します。
