# transform (Lodash 互換性)

::: warning `reduce` または `Object.entries` を使用してください

この `transform` 関数は複雑な内部ロジックにより遅く動作します。ほとんどの場合、JavaScript の組み込みメソッドでより簡単に実装できます。

代わりに、より高速で現代的な `reduce` または `Object.entries` を使用してください。

:::

配列またはオブジェクトを反復処理し、アキュムレータを使用して値を蓄積して新しい値を作成します。

```typescript
const result = transform(object, iteratee, accumulator);
```

## 参照

### `transform(object, iteratee, accumulator)`

配列またはオブジェクトの各要素を反復処理し、アキュムレータに値を蓄積したい場合は、`transform` を使用してください。`iteratee` 関数が `false` を返すと反復が停止します。

```typescript
import { transform } from 'es-toolkit/compat';

// 配列を変換
const numbers = [2, 3, 4];
const doubled = transform(
  numbers,
  (acc, value) => {
    acc.push(value * 2);
  },
  []
);
// 返値: [4, 6, 8]

// オブジェクトを変換
const obj = { a: 1, b: 2, c: 1 };
const grouped = transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
);
// 返値: { '1': ['a', 'c'], '2': ['b'] }
```

アキュムレータを省略すると、空の配列または空のオブジェクトが自動的に作成されます。

```typescript
import { transform } from 'es-toolkit/compat';

// 配列の場合は空配列が作成される
const result1 = transform([1, 2, 3], (acc, value) => {
  acc.push(value * 2);
});
// 返値: [2, 4, 6]

// オブジェクトの場合は空オブジェクトが作成される
const result2 = transform({ a: 1, b: 2 }, (acc, value, key) => {
  acc[key] = value * 2;
});
// 返値: { a: 2, b: 4 }
```

`iteratee` 関数で `false` を返すと反復を停止できます。

```typescript
import { transform } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
const result = transform(
  numbers,
  (acc, value) => {
    if (value > 3) {
      return false; // 反復を停止
    }
    acc.push(value * 2);
  },
  []
);
// 返値: [2, 4, 6] (4と5は処理されない)
```

`iteratee` 関数を省略すると、空のオブジェクトまたは配列が返されます。

```typescript
import { transform } from 'es-toolkit/compat';

const array = [1, 2, 3];
const copy1 = transform(array);
// 返値: []

const obj = { a: 1, b: 2 };
const copy2 = transform(obj);
// 返値: {}
```

#### パラメータ

- `object` (`readonly T[] | T`, オプション): 反復処理する配列またはオブジェクト。
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: readonly T[] | T) => unknown`, オプション): 各要素に対して実行する関数。`false` を返すと反復が停止します。デフォルトは `identity` 関数です。
- `accumulator` (`U`, オプション): 初期値。省略すると、配列の場合は空配列、オブジェクトの場合は空オブジェクトが作成されます。

#### 戻り値

(`U | any[] | Record<string, any>`): 累積された結果を返します。
