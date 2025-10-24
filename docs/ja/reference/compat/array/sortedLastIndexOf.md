# sortedLastIndexOf (Lodash 互換性)

::: warning バイナリ検索を直接実装してください

この `sortedLastIndexOf` 関数は、複雑なバイナリ検索処理と型検証により遅く動作します。

代わりに、より高速で現代的なバイナリ検索を直接実装するか、`Array.prototype.lastIndexOf()` を使用してください。

:::

ソートされた配列で値が最後に現れるインデックスを見つけます。

```typescript
const index = sortedLastIndexOf(array, value);
```

## 参照

### `sortedLastIndexOf(array, value)`

ソートされた配列で特定の値が最後に現れるインデックスを見つけるときに `sortedLastIndexOf` を使用してください。バイナリ検索を使用して高速に値を見つけます。

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

// 数値配列で値を見つける
sortedLastIndexOf([1, 2, 3, 4, 5], 3);
// 2を返します

// 値が存在しない場合
sortedLastIndexOf([1, 2, 3, 4, 5], 6);
// -1を返します

// 重複した値がある場合、最後のインデックスを返します
sortedLastIndexOf([1, 2, 2, 3, 3, 3, 4], 3);
// 5を返します（最後の3の位置）

// 0と-0は同じように扱われます
sortedLastIndexOf([-0, 0], 0);
// 1を返します
```

空の配列、`null`、または `undefined` は-1を返します。

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

sortedLastIndexOf([], 1); // -1
sortedLastIndexOf(null, 1); // -1
sortedLastIndexOf(undefined, 1); // -1
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): ソートされた配列です。ソートされていない配列を使用すると、誤った結果が得られる可能性があります。
- `value` (`T`): 探す値です。

#### 戻り値

(`number`): 値が最後に現れるインデックスを返します。値が存在しない場合は-1を返します。
