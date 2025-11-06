# nth (Lodash 互換性)

::: warning 配列インデックスアクセスを使用してください

この `nth` 関数は、`null` や `undefined` の処理、整数変換などにより動作が遅くなります。

代わりに、より高速で現代的な配列インデックスアクセス (`array[index]` または `array.at(index)`) を使用してください。

:::

配列の指定されたインデックスにある要素を取得します。

```typescript
const element = nth(array, index);
```

## 使用法

### `nth(array, index)`

配列の指定されたインデックスにある要素を返します。負のインデックスを使用すると、配列の末尾から計算します。インデックスが範囲外の場合は `undefined` を返します。

```typescript
import { nth } from 'es-toolkit/compat';

const array = [1, 2, 3, 4, 5];

// 正のインデックス
nth(array, 1);
// => 2

// 負のインデックス (末尾から)
nth(array, -1);
// => 5

nth(array, -2);
// => 4

// 範囲外のインデックス
nth(array, 10);
// => undefined

nth(array, -10);
// => undefined
```

`null` または `undefined` は `undefined` として扱われます。

```typescript
import { nth } from 'es-toolkit/compat';

nth(null, 0); // undefined
nth(undefined, 0); // undefined
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 要素を取得する配列です。
- `index` (`number`, オプション): 取得する要素のインデックスです。負の場合は末尾から計算します。デフォルトは `0` です。

#### 戻り値

(`T | undefined`): 指定されたインデックスの要素を返します。インデックスが範囲外の場合は `undefined` を返します。
