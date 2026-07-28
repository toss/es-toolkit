# max (`BigInt`)

配列の中で最も大きい`BigInt`を返します。

```typescript
const largest = max(numbers);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `max(nums)`

複数の`BigInt`の中で最も大きい値を求めたい場合は `max` を使用してください。`Math.max` は`BigInt`をまったく受け取れないため、比較にはこの関数を使用します。

```typescript
import { max } from 'es-toolkit/bigint';

const largest = max([1n, 5n, 3n]);
console.log(largest); // 5n

// 負の値でも動作します
console.log(max([-5n, -1n, -3n])); // -1n
```

`BigInt`は正確に比較されるため、`number`では同じ値に丸められてしまう値も区別されたままになります。

```typescript
import { max } from 'es-toolkit/bigint';

// `number`では、どちらも9007199254740992になります
console.log(max([9007199254740992n, 9007199254740993n])); // 9007199254740993n
```

`BigInt`には`NaN`も`-Infinity`もないため、「最大値がない」ことを表す`BigInt`は存在しません。そのため、空配列は代替値を返す代わりにエラーをスローします。

```typescript
import { max } from 'es-toolkit/bigint';

max([]); // RangeError: Cannot find the maximum of an empty array.
```

#### パラメータ

- `nums` (`readonly bigint[]`): 探索する`BigInt`の配列です。

#### 戻り値

(`bigint`): 配列の中で最も大きい`BigInt`を返します。

#### エラー

配列が空の場合、`RangeError`をスローします。
