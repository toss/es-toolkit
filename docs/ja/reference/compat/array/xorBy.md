# xorBy (Lodash互換)

::: warning `es-toolkit`の[xorBy](../../array/xorBy.md)を使用してください

この`xorBy`関数は`null`または`undefined`の処理、複雑な重複計算ロジックなどにより動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[xorBy](../../array/xorBy.md)を使用してください。

:::

複数の配列で変換関数を基準に正確に1つの配列にのみ存在する要素で構成される新しい配列を作成します。

```typescript
const result = xorBy(...arrays, iteratee);
```

## 参照

### `xorBy(...arrays, iteratee)`

複数の配列の対称差集合を変換関数を基準に計算します。各要素に変換関数を適用した結果が正確に1つの配列にのみ存在する要素を返します。オブジェクト配列で特定のプロパティを基準に比較したり、数値配列で特定の計算結果を基準に比較するときに便利です。

```typescript
import { xorBy } from 'es-toolkit/compat';

// Math.floor結果により対称差集合を計算
xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// 戻り値: [1.2, 4.3]

// オブジェクトのプロパティにより対称差集合を計算
xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// 戻り値: [{ x: 2 }]

// 関数で対称差集合を計算
const users1 = [{ name: 'John', age: 30 }];
const users2 = [
  { name: 'Jane', age: 25 },
  { name: 'John', age: 30 },
];
xorBy(users1, users2, user => user.name);
// 戻り値: [{ name: 'Jane', age: 25 }]

// 3つの配列の対称差集合
xorBy([1.2, 2.3], [3.4, 4.5], [5.6, 6.7], Math.floor);
// 戻り値: [1.2, 3.4, 5.6]
```

`null`または`undefined`は無視されます。

```typescript
import { xorBy } from 'es-toolkit/compat';

xorBy([2.1, 1.2], null, [4.3, 2.4], Math.floor);
// 戻り値: [1.2, 4.3]
```

#### パラメータ

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ValueIteratee<T>>`): 対称差集合を計算する配列と最後の変換関数。関数、プロパティ名、部分オブジェクトなどを使用できます。

#### 戻り値

(`T[]`): 変換関数の結果を基準に正確に1つの配列にのみ存在する要素で構成される新しい配列を返します。
