# flatten

ネストされた配列を指定された深さまで平坦化した新しい配列を返します。

```typescript
const result = flatten(arr, depth);
```

## 参照

### `flatten(arr, depth = 1)`

ネストされた配列を特定の深さまで平坦化したい場合は `flatten` を使用してください。配列内の配列を指定されたレベルまで展開し、平面的な構造にします。

JavaScript言語に含まれた[Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)と同じように動作しますが、より高速です。

```typescript
import { flatten } from 'es-toolkit/array';

// デフォルトの深さ1で平坦化します。
const array = [1, [2, 3], [4, [5, 6]]];
flatten(array);
// Returns: [1, 2, 3, 4, [5, 6]]

// 深さ2で平坦化します。
flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

深さを調整して希望するレベルまでのみ平坦化できます。

```typescript
import { flatten } from 'es-toolkit/array';

const array = [1, [2, 3], [4, [5, 6]]];

// 深さ1で平坦化(デフォルト)
const result1 = flatten(array, 1);
// Returns: [1, 2, 3, 4, [5, 6]]

// 深さ2で平坦化
const result2 = flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### パラメータ

- `arr` (`T[]`): 平坦化するネストされた配列です。
- `depth` (`D`, オプション): 平坦化する深さです。デフォルト値は`1`です。

#### 戻り値

(`Array<FlatArray<T[], D>>`): 指定された深さまで平坦化された新しい配列を返します。
