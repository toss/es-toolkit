# flatMap (Lodash 互換性)

::: warning `es-toolkit`の`flatMap`を使用してください

この`flatMap`関数は、`null`や`undefined`の処理、`ArrayLike`型の処理、様々な条件関数形式のサポートなどにより、動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[flatMap](../../array/flatMap.md)を使用してください。

:::

各要素に関数を適用した後、結果を平坦化します。

```typescript
const result = flatMap(collection, iteratee);
```

## 使用法

### `flatMap(collection, iteratee)`

コレクションの各要素にイテレータ関数を適用した後、1段階平坦化した配列を返します。配列、オブジェクト、文字列をサポートし、様々な形式のイテレータを使用できます。

```typescript
import { flatMap } from 'es-toolkit/compat';

// 配列に関数を適用
function duplicate(n) {
  return [n, n];
}
flatMap([1, 2], duplicate);
// 結果: [1, 1, 2, 2]

// オブジェクトに関数を適用
const obj = { a: 1, b: 2 };
flatMap(obj, (value, key) => [key, value]);
// 結果: ['a', 1, 'b', 2]

// 文字列プロパティでマッピング
const users = [
  { user: 'barney', hobbies: ['hiking', 'coding'] },
  { user: 'fred', hobbies: ['reading'] },
];
flatMap(users, 'hobbies');
// 結果: ['hiking', 'coding', 'reading']
```

イテレータなしで使用すると、値を1段階平坦化します。

```typescript
import { flatMap } from 'es-toolkit/compat';

const obj = { a: [1, 2], b: [3, 4] };
flatMap(obj);
// 結果: [1, 2, 3, 4]
```

部分オブジェクトで条件マッピングも可能です。

```typescript
import { flatMap } from 'es-toolkit/compat';

const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
];
flatMap(users, { active: false });
// 結果: [false, true] (activeがfalseの要素のマッチング結果)
```

#### パラメータ

- `collection` (`object | null | undefined`): 反復処理するコレクションです。配列、オブジェクト、文字列が可能です。
- `iteratee` (`ListIterator | ObjectIterator | string | object`, オプション): 各要素に適用するイテレータです。関数、プロパティ名、または部分オブジェクトが可能です。

#### 戻り値

(`any[]`): マッピング後1段階平坦化された新しい配列を返します。
