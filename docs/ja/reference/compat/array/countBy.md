# countBy (Lodash 互換性)

::: warning `es-toolkit`の`countBy`を使用してください

この `countBy` 関数は、複雑な変換関数処理と型変換により、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [countBy](../../array/countBy.md) を使用してください。

:::

配列やオブジェクトの要素を条件に従って分類し、各分類の個数を数えます。

```typescript
const counts = countBy(collection, iteratee);
```

## 使用法

### `countBy(collection, iteratee?)`

配列やオブジェクトの各要素をある基準でグループ化し、各グループに何個の要素があるかを数えたい場合、`countBy` を使用してください。反復関数が返す値がキーになり、そのキーに該当する要素の個数が値になります。

```typescript
import { countBy } from 'es-toolkit/compat';

// 数値を小数点以下切り捨てでグループ化
countBy([6.1, 4.2, 6.3], Math.floor);
// Returns: { '4': 1, '6': 2 }

// 文字列を長さでグループ化
countBy(['one', 'two', 'three'], 'length');
// Returns: { '3': 2, '5': 1 }

// ユーザーを年齢代でグループ化
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
  { name: 'Charlie', age: 25 },
];
countBy(users, user => Math.floor(user.age / 10) * 10);
// Returns: { '20': 2, '30': 1 }
```

オブジェクトも処理できます。

```typescript
import { countBy } from 'es-toolkit/compat';

// オブジェクトの値を型で分類
const obj = { a: 1, b: 'string', c: 2, d: 'text' };
countBy(obj, value => typeof value);
// Returns: { 'number': 2, 'string': 2 }
```

反復関数なしで使用すると、値そのものでグループ化されます。

```typescript
import { countBy } from 'es-toolkit/compat';

// 値そのものでグループ化
countBy([1, 2, 1, 3, 2, 1]);
// Returns: { '1': 3, '2': 2, '3': 1 }

// 真偽値でグループ化
countBy([true, false, true, true]);
// Returns: { 'true': 3, 'false': 1 }
```

`null` や `undefined` のコレクションは空のオブジェクトを返します。

```typescript
import { countBy } from 'es-toolkit/compat';

countBy(null);
// Returns: {}

countBy(undefined);
// Returns: {}
```

#### パラメータ

- `collection` (`ArrayLike<T> | object | null | undefined`): 処理する配列またはオブジェクトです。
- `iteratee` (`ValueIteratee<T>`, 選択): 各要素をグループ化する基準を決定する関数です。関数、プロパティ名、または部分オブジェクトを使用できます。

#### 戻り値

(`Record<string, number>`): 各グループのキーとそのグループの要素数を持つオブジェクトを返します。
