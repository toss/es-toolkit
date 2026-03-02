# uniqWith (Lodash互換)

::: warning `es-toolkit`の[uniqWith](../../array/uniqWith.md)を使用してください

この`uniqWith`関数は`null`または`undefined`の処理、複雑な引数タイプ処理などにより動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[uniqWith](../../array/uniqWith.md)を使用してください。

:::

配列で比較関数を使用して重複を削除し、ユニークな要素で構成される新しい配列を作成します。

```typescript
const result = uniqWith(array, comparator);
```

## 使用法

### `uniqWith(array, comparator)`

配列の各要素を比較関数で比較して重複を削除します。比較関数が`true`を返すと2つの要素が同じと判断され、最初に出現する要素のみが保持されます。比較関数を提供しない場合、デフォルトで浅い等価比較を使用します。

```typescript
import { uniqWith } from 'es-toolkit/compat';

// 比較関数なしで使用（浅い等価比較）
uniqWith([1, 2, 2, 3]);
// 戻り値: [1, 2, 3]

// カスタム比較関数で奇数/偶数基準により重複を削除
uniqWith([1, 2, 3, 4], (a, b) => a % 2 === b % 2);
// 戻り値: [1, 2]

// オブジェクト配列でプロパティ基準により重複を削除
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
];
uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y);
// 戻り値: [{ x: 1, y: 2 }, { x: 2, y: 1 }]
```

`null`または`undefined`は空配列として扱われます。

```typescript
import { uniqWith } from 'es-toolkit/compat';

uniqWith(null); // []
uniqWith(undefined); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 重複を削除する配列。
- `comparator` (`(a: T, b: T) => boolean`, 選択): 2つの要素が等しいか比較する関数。`true`を返すと同じと判断されます。デフォルトは浅い等価比較です。

#### 戻り値

(`T[]`): 比較関数の結果を基準に重複が削除された新しい配列を返します。
