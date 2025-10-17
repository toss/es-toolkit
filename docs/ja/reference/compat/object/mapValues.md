# mapValues (Lodash 互換性)

::: warning `es-toolkit`の`mapValues`を使用してください

この `mapValues` 関数は、`null`や`undefined`の処理、`iteratee`変換過程により相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`mapValues`](../../object/mapValues.md)を使用してください。

:::

キーをそのままにして値を変換し、新しいオブジェクトを作成します。

```typescript
const result = mapValues(obj, iteratee);
```

## 参照

### `mapValues(object, iteratee)`

`iteratee`関数を使用してオブジェクト内の各値を変換し、新しいオブジェクトを作成します。キーは変更されず、値のみが変更されます。文字列、配列、オブジェクトすべてを処理できます。データを変換または計算する際に便利です。

```typescript
import { mapValues } from 'es-toolkit/compat';

// オブジェクトの値を変換
const obj = { a: 1, b: 2, c: 3 };
const doubled = mapValues(obj, value => value * 2);
// 結果: { a: 2, b: 4, c: 6 }

// 文字列を大文字に変換
const names = { first: 'john', last: 'doe' };
const uppercased = mapValues(names, value => value.toUpperCase());
// 結果: { first: 'JOHN', last: 'DOE' }

// 文字列の各文字を変換
const str = 'abc';
const charMap = mapValues(str, char => char.toUpperCase());
// 結果: { '0': 'A', '1': 'B', '2': 'C' }

// 配列をオブジェクトに変換
const arr = [10, 20, 30];
const arrMap = mapValues(arr, (value, index) => value + index);
// 結果: { '0': 10, '1': 21, '2': 32 }

// プロパティパスで値を抽出
const users = {
  user1: { profile: { name: 'Alice' } },
  user2: { profile: { name: 'Bob' } },
};
const userNames = mapValues(users, 'profile.name');
// 結果: { user1: 'Alice', user2: 'Bob' }
```

`null`または`undefined`は空のオブジェクトとして処理されます。

```typescript
import { mapValues } from 'es-toolkit/compat';

mapValues(null, iteratee); // {}
mapValues(undefined, iteratee); // {}
```

#### パラメータ

- `object` (`string | T[] | T | null | undefined`): 値を変換するオブジェクト、配列、または文字列です。
- `iteratee` (`ValueIteratee<any>`, オプション): 各値を変換する関数、プロパティパス、またはマッチングオブジェクトです。デフォルトは`identity`関数です。

#### 戻り値

(`Record<number, T> | { [P in keyof T]: U } | Record<string, boolean> | Record<string, any> | Partial<T>`): 変換された値を持つ新しいオブジェクトを返します。
