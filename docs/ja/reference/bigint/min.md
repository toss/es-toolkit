# min (`BigInt`)

配列の中で最も小さい`BigInt`を返します。

```typescript
const smallest = min(numbers);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `min(nums)`

複数の`BigInt`の中で最も小さい値を求めたい場合は `min` を使用してください。`Math.min` は`BigInt`をまったく受け取れないため、比較にはこの関数を使用します。

```typescript
import { min } from 'es-toolkit/bigint';

const smallest = min([1n, 5n, 3n]);
console.log(smallest); // 1n

// 負の値でも動作します
console.log(min([-5n, -1n, -3n])); // -5n
```

`BigInt`は正確に比較されるため、`number`では同じ値に丸められてしまう値も区別されたままになります。

```typescript
import { min } from 'es-toolkit/bigint';

// `number`では、どちらも9007199254740992になります
console.log(min([9007199254740993n, 9007199254740992n])); // 9007199254740992n
```

`BigInt`には`NaN`も`Infinity`もないため、「最小値がない」ことを表す`BigInt`は存在しません。そのため、空配列は代替値を返す代わりにエラーをスローします。

```typescript
import { min } from 'es-toolkit/bigint';

min([]); // RangeError: Cannot find the minimum of an empty array.
```

#### パラメータ

- `nums` (`readonly bigint[]`): 探索する`BigInt`の配列です。

#### 戻り値

(`bigint`): 配列の中で最も小さい`BigInt`を返します。

#### エラー

配列が空の場合、`RangeError`をスローします。
