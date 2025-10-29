# xorWith (Lodash互換)

::: warning `es-toolkit`の[xorWith](../../array/xorWith.md)を使用してください

この`xorWith`関数は`null`または`undefined`の処理、複雑な重複計算ロジックなどにより動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[xorWith](../../array/xorWith.md)を使用してください。

:::

複数の配列で比較関数を使用して正確に1つの配列にのみ存在する要素で構成される新しい配列を作成します。

```typescript
const result = xorWith(...arrays, comparator);
```

## 参照

### `xorWith(...arrays, comparator)`

複数の配列の対称差集合を比較関数を使用して計算します。比較関数が`true`を返すと2つの要素が同じと判断され、正確に1つの配列にのみ存在する要素を返します。複雑なオブジェクトやカスタム比較ロジックが必要な場合に便利です。

```typescript
import { xorWith } from 'es-toolkit/compat';

// 単純な数値比較
xorWith([1, 2], [2, 3], (a, b) => a === b);
// 戻り値: [1, 3]

// オブジェクトのプロパティを比較
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];
xorWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// 戻り値: [{ x: 2, y: 1 }, { x: 1, y: 1 }]

// 3つの配列の対称差集合
xorWith([1], [2], [3], (a, b) => a === b);
// 戻り値: [1, 2, 3]

// 文字列の長さで比較
xorWith(['hello'], ['world', 'hi'], (a, b) => a.length === b.length);
// 戻り値: ['hi']
```

比較関数を提供しない場合、デフォルトで浅い等価比較を使用します。

```typescript
import { xorWith } from 'es-toolkit/compat';

xorWith([1, 2], [2, 3]);
// 戻り値: [1, 3]
```

#### パラメータ

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean)>`): 対称差集合を計算する配列と最後の比較関数。比較関数は2つの要素が等しい場合に`true`を返す必要があります。

#### 戻り値

(`T[]`): 比較関数の結果を基準に正確に1つの配列にのみ存在する要素で構成される新しい配列を返します。
