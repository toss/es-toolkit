# indexOf (Lodash 互換性)

::: warning `Array.prototype.indexOf` または `Array.prototype.findIndex` を使用してください

この`indexOf`関数は、`NaN`処理のための追加ロジックにより、動作が遅くなります。

`NaN`を探していない場合は、より高速な`Array.prototype.indexOf`を使用してください。`NaN`を見つける場合は、`Array.prototype.findIndex`と`Number.isNaN`を使用してください。

:::

配列内で指定された要素が最初に一致するインデックスを見つけます。

```typescript
const index = indexOf(array, searchElement, fromIndex);
```

## 使用法

### `indexOf(array, searchElement, fromIndex?)`

`Array.prototype.indexOf` とほぼ同じように動作しますが、`NaN` 値を見つけることができます。配列内の特定の値の位置を知る必要がある場合に使用してください。

```typescript
import { indexOf } from 'es-toolkit/compat';

// 数値配列で要素を検索
const array = [1, 2, 3, 4];
indexOf(array, 3); // => 2

// NaN 値を検索（Array.prototype.indexOf では見つけられません）
const arrayWithNaN = [1, 2, NaN, 4];
indexOf(arrayWithNaN, NaN); // => 2
```

特定のインデックスから検索を開始できます。

```typescript
import { indexOf } from 'es-toolkit/compat';

const array = [1, 2, 3, 1, 2, 3];
indexOf(array, 2, 2); // => 4（インデックス 2 から検索開始）
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { indexOf } from 'es-toolkit/compat';

indexOf(null, 1); // => -1
indexOf(undefined, 1); // => -1
```

#### パラメータ

- `array` (`T[]`): 検索対象の配列。

::: info `array` は `ArrayLike<T>` または `null` または `undefined` である可能性があります

lodash と完全に互換性があるように、`indexOf` 関数は `array` を次のように処理します。

- `array` が `ArrayLike<T>` の場合、配列に変換するために `Array.from(...)` を使用します。
- `array` が `null` または `undefined` の場合、空の配列と見なされます。

:::

- `searchElement` (`T`): 検索する値です。
- `fromIndex` (`number`, オプション): 検索を開始するインデックスです。負の数の場合、配列の末尾から計算されます。デフォルト値は `0` です。

#### 戻り値

(`number`): 配列内で指定された値と最初に一致する要素のインデックスを返します。一致する要素が見つからない場合は `-1` を返します。
