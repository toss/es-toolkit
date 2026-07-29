# clamp (`BigInt`)

`BigInt`を指定された範囲に制限します。

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `clamp(value, maximum)`

上限だけを設定したい場合は、引数2つの `clamp` を使用してください。最大値を超える値は最大値として返され、それ以外の値はそのまま返されます。

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 5n)); // 5n、10nは最大値を超えているため
console.log(clamp(3n, 5n)); // 3n、すでに上限内にあるため
```

#### パラメータ

- `value` (`bigint`): 制限する`BigInt`です。
- `maximum` (`bigint`): 上限値(含む)です。

#### 戻り値

(`bigint`): 最大値を上限として制限した`BigInt`を返します。

### `clamp(value, minimum, maximum)`

下限と上限の両方を設定したい場合は、引数3つの `clamp` を使用してください。`Math.min` と `Math.max` は`BigInt`を受け取れないため、この関数を使用します。

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 0n, 5n)); // 5n、最大値を超えている
console.log(clamp(-10n, 0n, 5n)); // 0n、最小値を下回っている
console.log(clamp(3n, 0n, 5n)); // 3n、すでに範囲内にある

// 両方の境界値は範囲に含まれます
console.log(clamp(0n, 0n, 5n)); // 0n
console.log(clamp(5n, 0n, 5n)); // 5n

// 負数の範囲でも使用できます
console.log(clamp(-10n, -5n, -1n)); // -5n
```

`BigInt`は正確に比較されるため、`Number.MAX_SAFE_INTEGER`をはるかに超える境界値でも期待どおりに動作します。

```typescript
import { clamp } from 'es-toolkit/bigint';

const maxUint64 = 18446744073709551615n;
console.log(clamp(20000000000000000000n, 0n, maxUint64)); // 18446744073709551615n
```

#### パラメータ

- `value` (`bigint`): 制限する`BigInt`です。
- `minimum` (`bigint`): 下限値(含む)です。
- `maximum` (`bigint`): 上限値(含む)です。

#### 戻り値

(`bigint`): 範囲内に制限した`BigInt`を返します。
