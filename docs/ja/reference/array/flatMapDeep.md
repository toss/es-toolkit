# flatMapDeep

配列の各要素を関数が返す値に置き換えた後、すべての深さを平坦化した新しい配列を返します。

```typescript
const result = flatMapDeep(arr, iteratee);
```

## 使用法

### `flatMapDeep(arr, iteratee)`

配列の各要素を変換しながら同時にすべてのネストされた配列を完全に平坦化したい場合は `flatMapDeep` を使用してください。まず各要素に関数を適用した後、結果配列をすべての深さまで平坦化します。

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// 各要素を2回コピーした後、完全に平坦化します。
const result1 = flatMapDeep([1, 2, 3], item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]
```

どれほど深くネストされた配列でもすべての深さを平坦化します。

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// ネストされた配列も完全に平坦化します。
const result = flatMapDeep([1, 2, 3], item => [[item, item]]);
// Returns: [1, 1, 2, 2, 3, 3]

// 複数レベルのネストもすべて平坦化します。
const result2 = flatMapDeep([1, 2, 3], item => [[[item, item]]]);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### パラメータ

- `arr` (`T[]`): 変換する配列です。
- `iteratee` (`(item: T) => U`): 各配列要素を変換する関数です。

#### 戻り値

(`Array<ExtractNestedArrayType<U>>`): 各要素が変換され、すべての深さが平坦化された新しい配列を返します。
