# sortedIndexOf (Lodash 互換性)

::: warning バイナリ検索を直接実装してください

この `sortedIndexOf` 関数は、複雑なバイナリ検索処理と型検証により遅く動作します。

代わりに、より高速で現代的なバイナリ検索を直接実装するか、`Array.prototype.indexOf()` を使用してください。

:::

ソートされた配列で値が最初に現れるインデックスを見つけます。

```typescript
const index = sortedIndexOf(array, value);
```

## 参照

### `sortedIndexOf(array, value)`

ソートされた配列で特定の値が最初に現れるインデックスを見つけるときに `sortedIndexOf` を使用してください。バイナリ検索を使用して高速に値を見つけます。

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

// 数値配列で値を見つける
sortedIndexOf([11, 22, 33, 44, 55], 33);
// 2を返します

// 値が存在しない場合
sortedIndexOf([11, 22, 33, 44, 55], 30);
// -1を返します

// 重複した値がある場合、最初のインデックスを返します
sortedIndexOf([1, 2, 2, 3, 3, 3, 4], 3);
// 3を返します（最初の3の位置）

// 0と-0は同じように扱われます
sortedIndexOf([-0, 0], 0);
// 0を返します
```

空の配列、`null`、または `undefined` は-1を返します。

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

sortedIndexOf([], 1); // -1
sortedIndexOf(null, 1); // -1
sortedIndexOf(undefined, 1); // -1
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): ソートされた配列です。ソートされていない配列を使用すると、誤った結果が得られる可能性があります。
- `value` (`T`): 探す値です。

#### 戻り値

(`number`): 値が最初に現れるインデックスを返します。値が存在しない場合は-1を返します。
