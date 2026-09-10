# inverseLerp

数値 `value` が2つの数値 `start`、`stop` の間のどの位置にあるかを、`0` から `1` の割合として計算します。`lerp` の逆の演算です。

```typescript
const fraction = inverseLerp(start, stop, value);
```

## 使用法

### `inverseLerp(start, stop, value)`

`start` から `stop` までを1つの区間と見なし、`value` がその区間のどのあたりにあるかを知りたいときに `inverseLerp` を使用してください。`value` が `start` なら `0`、`stop` なら `1`、ちょうど真ん中なら `0.5` を返します。スクロール位置やスライダーの値を `0` から `1` の進捗率に変換するときに便利です。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50は0と100のちょうど真ん中にあります
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5は10から20までの区間の4分の1の位置にあります
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// valueがstartなら0、stopなら1を返します
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// startがstopより大きくても構いません
inverseLerp(100, 0, 75);
// Returns: 0.25
```

`value` が `start` と `stop` の間から外れている場合、結果も `0` より小さいか `1` より大きい値になります。`0` から `1` の間の値だけが必要な場合は、結果に `clamp` を適用してください。

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// stopより大きい値を渡すと1より大きい割合になります
inverseLerp(0, 100, 150);
// Returns: 1.5

// 結果を0と1の間に制限します
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

`start` と `stop` が同じ数値の場合、位置を測る区間がないため `0` を返します。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 区間の長さが0です
inverseLerp(5, 5, 5);
// Returns: 0
```

`lerp` と組み合わせると、ある範囲の数値を別の範囲に移すことができます。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 150を[100, 200]から[0, 1000]に移します
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### パラメータ

- `start` (`number`): 区間の開始値です。`value` がこの値なら `0` を返します。
- `stop` (`number`): 区間の終了値です。`value` がこの値なら `1` を返します。
- `value` (`number`): 区間内での位置を求める数値です。

#### 戻り値

(`number`): `value` が `start` と `stop` の間のどの位置にあるかを、`0` から `1` の割合として返します。
