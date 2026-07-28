# inRange (`BigInt`)

`BigInt`が指定された範囲内にあるかを確認します。

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `inRange(value, maximum)`

`0n`以上、最大値未満の範囲を確認したい場合は、引数2つの `inRange` を使用してください。最小値は自動的に`0n`になります。

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(3n, 5n)); // true、0n <= 3n < 5nであるため
console.log(inRange(5n, 5n)); // false、最大値は範囲に含まれないため
console.log(inRange(-1n, 5n)); // false、-1nは0nを下回るため
```

#### パラメータ

- `value` (`bigint`): 確認する`BigInt`です。
- `maximum` (`bigint`): 範囲の上限値(含まない)です。

#### 戻り値

(`boolean`): `BigInt`が`0n`以上かつ最大値未満の場合は `true`、そうでない場合は `false` を返します。

#### エラー

最大値が`0n`より大きくない場合、エラーをスローします。

### `inRange(value, minimum, maximum)`

範囲を明示的に指定して確認したい場合は、引数3つの `inRange` を使用してください。下限値は範囲に含まれ、上限値は含まれません。

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(5n, 0n, 10n)); // true
console.log(inRange(0n, 0n, 10n)); // true、下限値は範囲に含まれる
console.log(inRange(10n, 0n, 10n)); // false、上限値は範囲に含まれない

// 負数の範囲でも使用できます
console.log(inRange(-3n, -5n, -1n)); // true
```

`BigInt`の比較はどれほど大きな値でも正確なため、値を保存する前に整数型やデータベースのカラムに収まるかを確認するのに便利です。

```typescript
import { inRange } from 'es-toolkit/bigint';

// 符号なし64ビットのカラムに収まるでしょうか?
const maxUint64Exclusive = 18446744073709551616n;
console.log(inRange(18446744073709551615n, 0n, maxUint64Exclusive)); // true
console.log(inRange(18446744073709551616n, 0n, maxUint64Exclusive)); // false
```

#### パラメータ

- `value` (`bigint`): 確認する`BigInt`です。
- `minimum` (`bigint`): 範囲の下限値(含む)です。
- `maximum` (`bigint`): 範囲の上限値(含まない)です。

#### 戻り値

(`boolean`): `BigInt`が範囲内にある場合は `true`、そうでない場合は `false` を返します。

#### エラー

最小値が最大値より大きいか等しい場合、エラーをスローします。
