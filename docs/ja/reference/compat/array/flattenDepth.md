# flattenDepth (Lodash 互換性)

::: warning `es-toolkit`の`flatten`を使用してください

この`flattenDepth`関数は、`null`や`undefined`の処理などにより、動作が遅くなります。`es-toolkit`の`flatten`関数は、これらの追加処理なしで、より高速かつシンプルに動作します。

代わりに、より高速で現代的な`es-toolkit`の[flatten](../../array/flatten.md)を使用してください。

:::

配列を指定した深さまで平坦化します。

```typescript
const flattened = flattenDepth(array, depth);
```

## 参照

### `flattenDepth(array, depth)`

ネストされた配列を望む深さまで平坦化したい場合は`flattenDepth`を使用してください。深さを指定すると、その深さまでのみネストされた配列を平坦化します。

```typescript
import { flattenDepth } from 'es-toolkit/compat';

// 深さ1まで平坦化します
flattenDepth([1, [2, [3, [4]], 5]], 1);
// Returns: [1, 2, [3, [4]], 5]

// 深さ2まで平坦化します
flattenDepth([1, [2, [3, [4]], 5]], 2);
// Returns: [1, 2, 3, [4], 5]

// 深さを指定しない場合、デフォルト値1で平坦化します
flattenDepth([1, [2, [3, [4]], 5]]);
// Returns: [1, 2, [3, [4]], 5]
```

`null`または`undefined`は空の配列として処理されます。

```typescript
import { flattenDepth } from 'es-toolkit/compat';

flattenDepth(null, 2); // []
flattenDepth(undefined, 2); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 平坦化する配列です。
- `depth` (`number`, オプション): 平坦化する最大深さです。デフォルトは`1`です。

#### 戻り値

(`T[]`): 指定した深さまで平坦化された新しい配列を返します。
