# flatMapDeep (Lodash 互換性)

::: warning `es-toolkit`の[`flatMapDeep`](../../array/flatMapDeep.md)を使用してください

この`flatMapDeep`関数は、複雑なコレクション型の処理と深い平坦化ロジックにより、動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[flatMapDeep](../../array/flatMapDeep.md)を使用してください。

:::

各要素に関数を適用した後、結果を再帰的に平坦化します。

```typescript
const result = flatMapDeep(collection, iteratee);
```

## 使用法

### `flatMapDeep(collection, iteratee)`

コレクションの各要素にイテレータ関数を適用した後、無限の深さまで平坦化した配列を返します。ネストされた配列構造がすべて平坦化されて1次元配列になります。

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

// 配列に関数を適用して深く平坦化
function duplicate(n) {
  return [[[n, n]]];
}
flatMapDeep([1, 2], duplicate);
// 結果: [1, 1, 2, 2]

// オブジェクトに関数を適用して深く平坦化
const obj = { a: 1, b: 2 };
flatMapDeep(obj, (value, key) => [[[key, value]]]);
// 結果: ['a', 1, 'b', 2]

// 文字列プロパティでマッピングして深く平坦化
const users = [
  { user: 'barney', hobbies: [['hiking', 'coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDeep(users, 'hobbies');
// 結果: ['hiking', 'coding', 'reading']
```

イテレータなしで使用すると、値を再帰的に平坦化します。

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const obj = { a: [[1, 2]], b: [[[3]]] };
flatMapDeep(obj);
// 結果: [1, 2, 3]
```

部分オブジェクトで条件マッピングも可能です。

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: [true, false] },
  { user: 'fred', active: [false] },
];
flatMapDeep(users, { active: [false] });
// 結果: [true, true] (active配列に[false]が含まれる要素のマッチング結果)
```

#### パラメータ

- `collection` (`object | null | undefined`): 反復処理するコレクションです。配列、オブジェクト、文字列が可能です。
- `iteratee` (`ListIterator | ObjectIterator | string | object`, オプション): 各要素に適用するイテレータです。関数、プロパティ名、または部分オブジェクトが可能です。

#### 戻り値

(`any[]`): マッピング後再帰的に平坦化された新しい配列を返します。
