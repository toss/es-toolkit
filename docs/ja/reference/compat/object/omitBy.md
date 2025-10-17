# omitBy (Lodash 互換性)

::: warning `es-toolkit`の`omitBy`を使用してください

この `omitBy` 関数は、配列様オブジェクトのチェック、`iteratee`変換、キー変換過程により相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`omitBy`](../../object/omitBy.md)を使用してください。

:::

述語関数がtrueを返すプロパティを除外した新しいオブジェクトを作成します。

```typescript
const result = omitBy(obj, predicate);
```

## 参照

### `omitBy(object, predicate)`

オブジェクトの各プロパティに対して述語関数を実行し、述語がtrueを返すプロパティを除外した新しいオブジェクトを作成します。条件に基づいてプロパティを動的にフィルタリングする際に便利です。

```typescript
import { omitBy } from 'es-toolkit/compat';

// 特定の型の値を削除
const data = { a: 1, b: 'remove', c: 3, d: 'keep' };
const numbers = omitBy(data, (value) => typeof value === 'string');
// 結果: { a: 1, c: 3 }

// 条件に基づいてプロパティを削除
const user = { id: 1, name: 'John', age: 0, active: false, email: '' };
const validData = omitBy(user, (value) => !value);
// 結果: { id: 1, name: 'John' } (偽値を削除)

// キー名でフィルタリング
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = omitBy(settings, (value, key) => key.startsWith('admin'));
// 結果: { userSetting: true, debugMode: true }

// 数値プロパティのみ削除
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const noNumbers = omitBy(mixed, (value) => typeof value === 'number');
// 結果: { str: 'hello', bool: true, obj: {} }

// 配列でも使用可能
const arr = [1, 2, 3, 4, 5];
const filtered = omitBy(arr, (value) => value % 2 === 0);
// 結果: { '0': 1, '2': 3, '4': 5 } (偶数インデックスの奇数値)

// 値、キー、元のオブジェクトをすべて活用
const scores = { math: 90, science: 75, english: 85, art: 60 };
const passingGrades = omitBy(scores, (value, key, obj) => {
  console.log(`${key}: ${value} (平均: ${Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length})`);
  return value < 80;
});
// 結果: { math: 90, english: 85 }
```

`null`または`undefined`は空のオブジェクトとして処理されます。

```typescript
import { omitBy } from 'es-toolkit/compat';

omitBy(null, () => true); // {}
omitBy(undefined, () => true); // {}
```

#### パラメータ

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): フィルタリングする元のオブジェクトです。
- `predicate` (`ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, オプション): 各プロパティに対して実行する述語関数です。これがtrueを返すプロパティは削除されます。デフォルトは`identity`関数です。

#### 戻り値

(`Record<string, S> | Record<number, S> | Partial<T>`): 条件に合致しないプロパティで構成された新しいオブジェクトを返します。
