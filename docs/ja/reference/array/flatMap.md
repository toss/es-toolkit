# flatMap

配列の各要素を関数が返す値に置き換えた後、指定された深さまで平坦化した新しい配列を返します。

```typescript
const result = flatMap(arr, iteratee, depth);
```

## 使用法

### `flatMap(arr, iteratee, depth = 1)`

配列の各要素を変換しながら同時に平坦化したい場合は `flatMap` を使用してください。まず各要素に関数を適用した後、結果配列を指定された深さまで平坦化します。

JavaScript言語に含まれた[Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)を[Array#map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)と一緒に`map(iteratee).flat(depth)`として呼び出したときと同じように動作しますが、より高速です。

```typescript
import { flatMap } from 'es-toolkit/array';

// 数値配列の各要素を2回コピーします。
const arr = [1, 2, 3];
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// 深さ2で平坦化します。
flatMap(arr, item => [[item, item]], 2);
// Returns: [1, 1, 2, 2, 3, 3]
```

様々な深さで平坦化できます。

```typescript
import { flatMap } from 'es-toolkit/array';

const arr = [1, 2, 3];

// デフォルトの深さ1で平坦化します。
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// 深さ3で平坦化します。
flatMap(arr, item => [[[item, item]]], 3);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### パラメータ

- `arr` (`T[]`): 変換する配列です。
- `iteratee` (`(item: T) => U`): 各配列要素を変換する関数です。
- `depth` (`D`, オプション): 平坦化する深さです。デフォルト値は`1`です。

#### 戻り値

(`Array<FlatArray<U[], D>>`): 各要素が変換され、指定された深さまで平坦化された新しい配列を返します。
