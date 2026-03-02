# join (Lodash 互換性)

::: warning `Array.prototype.join()` を使用してください

この `join` 関数は、ArrayLike オブジェクトの処理、null/undefined の処理などにより動作が遅くなります。

代わりに、より高速で現代的な `Array.prototype.join()` を使用してください。

:::

配列の要素を文字列に結合します。

```typescript
const result = join(array, separator);
```

## 使用法

### `join(array, separator?)`

`join` を使用して、配列のすべての要素を1つの文字列に結合します。各要素の間にセパレータを挿入して連結します。

```typescript
import { join } from 'es-toolkit/compat';

// 文字列配列を結合
const arr = ['a', 'b', 'c'];
join(arr, '~'); // => "a~b~c"

// 数値配列を結合
const numbers = [1, 2, 3];
join(numbers, '-'); // => "1-2-3"
```

セパレータを省略すると、デフォルトでカンマ（`,`）が使用されます。

```typescript
import { join } from 'es-toolkit/compat';

join(['a', 'b', 'c']); // => "a,b,c"
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { join } from 'es-toolkit/compat';

join(null, '-'); // => ""
join(undefined, '-'); // => ""
```

#### パラメータ

- `array` (`T[]`) - 結合する配列です。

::: info `array` は `ArrayLike<T>` であるか、`null` または `undefined` である可能性があります

lodash と完全に互換性があるように、`join` 関数は `array` を次のように処理します。

- `array` が `ArrayLike<T>` の場合、`Array.from(...)` を使用して配列に変換します。
- `array` が `null` または `undefined` の場合、空の配列と見なされます。

:::

- `separator` (`string`, オプション) - 要素を結合するために使用するセパレータです。デフォルト値は `,` です。

#### 戻り値

(`string`): 指定されたセパレータで結合された配列のすべての要素を含む文字列を返します。
