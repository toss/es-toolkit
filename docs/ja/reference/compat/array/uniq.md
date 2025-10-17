# uniq (Lodash互換)

::: warning `es-toolkit`の[uniq](../../array/uniq.md)を使用してください

この`uniq`関数はLodash互換性のための追加処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[uniq](../../array/uniq.md)を使用してください。

:::

配列から重複する要素を削除してユニークな要素のみを残した新しい配列を作成します。

```typescript
const result = uniq([1, 2, 2, 3, 3, 4]);
// resultは[1, 2, 3, 4]になります。
```

## 参照

### `uniq(array)`

配列から重複する要素を削除してユニークな要素のみを含む新しい配列を返します。最初に出現する要素のみが保持され、順序は保たれます。

```typescript
import { uniq } from 'es-toolkit/compat';

// 数値配列から重複を削除
const numbers = [1, 2, 2, 3, 3, 4, 1];
const result1 = uniq(numbers);
// 戻り値: [1, 2, 3, 4]

// 文字列配列から重複を削除
const strings = ['a', 'b', 'b', 'c', 'a'];
const result2 = uniq(strings);
// 戻り値: ['a', 'b', 'c']

// オブジェクト配列から重複を削除（参照値比較）
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const objects = [obj1, obj2, obj1];
const result3 = uniq(objects);
// 戻り値: [{ id: 1 }, { id: 2 }]
```

#### パラメータ

- `array` (`T[]`): 処理する配列。

#### 戻り値

(`T[]`): 重複が削除された新しい配列。
