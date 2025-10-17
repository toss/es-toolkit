# lastIndexOf (Lodash互換性)

::: warning `Array.lastIndexOf`を使用してください

この`lastIndexOf`関数は`null`や`undefined`の処理、`NaN`値の検索などにより遅く動作します。

代わりに、より高速でモダンな`Array.lastIndexOf`を使用してください。

:::

配列で指定された要素が最後に現れるインデックスを見つけます。

```typescript
const index = lastIndexOf(array, searchElement, fromIndex);
```

## 参照

### `lastIndexOf(array, searchElement, fromIndex)`

配列で指定された要素が最後に現れるインデックスを返します。ネイティブの`Array.lastIndexOf`と似ていますが、`NaN`値も見つけることができます。

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

// 一般的な使用
lastIndexOf([1, 2, 1, 2], 2);
// => 3

// 開始インデックスの指定
lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1

// NaN値を見つける（ネイティブのlastIndexOfはNaNを見つけられません）
lastIndexOf([1, 2, NaN, 4, NaN], NaN);
// => 4

// 負のインデックスを使用
lastIndexOf([1, 2, 3, 4], 3, -2);
// => 2
```

`null`や`undefined`は空の配列として扱われます。

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

lastIndexOf(null, 1); // -1
lastIndexOf(undefined, 1); // -1
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 検索する配列です。
- `searchElement` (`T`): 見つける要素です。
- `fromIndex` (`true | number`, オプション): 検索を開始するインデックスです。`true`を渡すと配列の最後から検索します。デフォルト値は`array.length - 1`です。

#### 戻り値

(`number`): 最後に一致する要素のインデックスを返します。見つからない場合は`-1`を返します。
