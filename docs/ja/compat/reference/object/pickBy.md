# pickBy (Lodash 互換性)

::: warning `es-toolkit`の`pickBy`を使用してください

この `pickBy` 関数は、配列様オブジェクトのチェック、`iteratee`変換、キー変換過程により相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`pickBy`](../../object/pickBy.md)を使用してください。

:::

述語関数がtrueを返すプロパティのみを選択して新しいオブジェクトを作成します。

```typescript
const result = pickBy(obj, predicate);
```

## 使用法

### `pickBy(object, predicate)`

オブジェクトの各プロパティに対して述語関数を実行し、述語がtrueを返すプロパティのみを含む新しいオブジェクトを作成します。条件に基づいてプロパティを動的に選択する際に便利です。

```typescript
import { pickBy } from 'es-toolkit/compat';

// 特定の型の値のみを選択
const data = { a: 1, b: 'keep', c: 3, d: 'select' };
const strings = pickBy(data, value => typeof value === 'string');
// 結果: { b: 'keep', d: 'select' }

// 条件に基づいてプロパティを選択
const user = { id: 1, name: 'John', age: 0, active: true, email: '' };
const validData = pickBy(user, value => Boolean(value));
// 結果: { id: 1, name: 'John', active: true } (真値のみ)

// キー名でフィルタリング
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = pickBy(settings, (value, key) => key.startsWith('user'));
// 結果: { userSetting: true }

// 数値プロパティのみを選択
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const numbersOnly = pickBy(mixed, value => typeof value === 'number');
// 結果: { num1: 42, num2: 0 }

// 配列でも使用可能
const arr = [1, 2, 3, 4, 5];
const evens = pickBy(arr, value => value % 2 === 0);
// 結果: { '1': 2, '3': 4 } (偶数のインデックスと値)

// 値、キー、元のオブジェクトをすべて活用
const scores = { math: 90, science: 75, english: 85, art: 60 };
const highScores = pickBy(scores, (value, key, obj) => {
  const average = Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length;
  return value > average;
});
// 結果: { math: 90, english: 85 }
```

述語関数なしで呼び出すと、真値のみが選択されます。

```typescript
import { pickBy } from 'es-toolkit/compat';

const data = { a: 1, b: '', c: 0, d: 'hello', e: null, f: true };
const truthyValues = pickBy(data);
// 結果: { a: 1, d: 'hello', f: true }
```

`null`または`undefined`は空のオブジェクトとして処理されます。

```typescript
import { pickBy } from 'es-toolkit/compat';

pickBy(null, () => true); // {}
pickBy(undefined, () => true); // {}
```

#### パラメータ

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): フィルタリングする元のオブジェクトです。
- `predicate` (`ValueKeyIterateeTypeGuard<T, S> | ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, オプション): 各プロパティに対して実行する述語関数です。これがtrueを返すプロパティが選択されます。デフォルトは`identity`関数です。

#### 戻り値

(`Record<string, S> | Record<number, S> | Partial<T>`): 条件に合致するプロパティで構成された新しいオブジェクトを返します。
