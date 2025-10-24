# uniqBy (Lodash互換)

::: warning `es-toolkit`の[uniqBy](../../array/uniqBy.md)を使用してください

この`uniqBy`関数は`null`または`undefined`の処理、複雑な引数タイプ処理などにより動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[uniqBy](../../array/uniqBy.md)を使用してください。

:::

配列で変換関数が返す値に基づいて重複を削除し、ユニークな要素で構成される新しい配列を作成します。

```typescript
const result = uniqBy(array, iteratee);
```

## 参照

### `uniqBy(array, iteratee)`

配列の各要素に変換関数を適用し、変換結果が同じ要素の中で最初の要素のみを保持します。オブジェクト配列で特定のプロパティを基準に重複を削除したり、数値配列で特定の計算結果を基準に重複を削除するときに便利です。

```typescript
import { uniqBy } from 'es-toolkit/compat';

// 数値配列でMath.floor結果により重複を削除
uniqBy([2.1, 1.2, 2.3], Math.floor);
// 戻り値: [2.1, 1.2]

// オブジェクト配列でプロパティにより重複を削除
uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], 'x');
// 戻り値: [{ x: 1 }, { x: 2 }]

// 関数で重複を削除
uniqBy([{ name: 'John' }, { name: 'Jane' }, { name: 'John' }], obj => obj.name);
// 戻り値: [{ name: 'John' }, { name: 'Jane' }]
```

`null`または`undefined`は空配列として扱われます。

```typescript
import { uniqBy } from 'es-toolkit/compat';

uniqBy(null, Math.floor); // []
uniqBy(undefined, 'x'); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 重複を削除する配列。
- `iteratee` (`ValueIteratee<T>`): 各要素に適用する変換関数。関数、プロパティ名、部分オブジェクトなどを使用できます。

#### 戻り値

(`T[]`): 変換関数の結果を基準に重複が削除された新しい配列を返します。
