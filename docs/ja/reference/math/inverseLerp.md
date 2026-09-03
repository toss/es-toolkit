# inverseLerp

数値が2つの数値の間のどの位置にあるかを、`0` から `1` の割合として計算します。

`lerp` の逆関数であり、数値を範囲に合わせて正規化することと同じです。

```typescript
const t = inverseLerp(a, b, value);
```

## 使用法

### `inverseLerp(a, b, value)`

数値が範囲のどのあたりにあるかを知りたいときに `inverseLerp` を使用してください。`value` が `a` なら `0`、`b` なら `1`、中間なら `0.5` を返します。スクロール位置、スライダーの値、測定値を進捗の割合に変換するときに便利です。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50は0と100の中間です
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5は10から20へ向かう途中の4分の1の位置です
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// valueがaなら0、bなら1を返します
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// aがbより大きくても構いません
inverseLerp(100, 0, 75);
// Returns: 0.25
```

結果は `[0, 1]` 内に制限されません。`value` が範囲外の場合、`0` より小さいか `1` より大きい値を返します。`[0, 1]` 内に収める必要がある場合は、結果に `clamp` を適用してください。

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// 範囲の終端を超えています
inverseLerp(0, 100, 150);
// Returns: 1.5

// 結果を[0, 1]に制限します
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

`a` と `b` が同じ数値の場合、意味のある割合が存在しないため、ゼロ除算の代わりに `0` を返します。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 範囲が空です
inverseLerp(5, 5, 5);
// Returns: 0
```

`inverseLerp` は `lerp` の逆関数です。組み合わせると、ある範囲の数値を別の範囲に対応させることができます。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 150を[100, 200]から[0, 1000]に対応させます
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### パラメータ

- `a` (`number`): 範囲の開始値です。`0` に対応します。
- `b` (`number`): 範囲の終了値です。`1` に対応します。
- `value` (`number`): 範囲内での位置を求める数値です。

#### 戻り値

(`number`): `value` が `a` から `b` へ向かう途中のどの割合の位置にあるかを返します。
