# lerp

2つの数値の間を線形補間します。

`lerp` は "linear interpolation(線形補間)" の略です。ある数値から別の数値へ向かう途中の、指定した割合の位置にある数値を返します。

```typescript
const result = lerp(a, b, t);
```

## 使用法

### `lerp(a, b, t)`

`a` から `b` へ向かう途中の `t` の割合の位置にある数値が必要なときに `lerp` を使用してください。`t` が `0` なら `a`、`1` なら `b`、`0.5` なら中間の値を返します。アニメーション、進捗表示、`0` から `1` の値を特定の範囲に対応させるときに便利です。

```typescript
import { lerp } from 'es-toolkit/math';

// 0と100の中間
lerp(0, 100, 0.5);
// Returns: 50

// 10から20へ向かう途中の4分の1の位置
lerp(10, 20, 0.25);
// Returns: 12.5

// tが0ならa、1ならbを返します
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// aがbより大きくても構いません
lerp(100, 0, 0.25);
// Returns: 75
```

結果は範囲内に制限されません。`t` が `0` より小さいか `1` より大きい場合、同じ直線に沿って範囲外へ外挿された値を返します。範囲内に収める必要がある場合は、先に `t` に `clamp` を適用してください。

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// bを超えて外挿されます
lerp(0, 100, 1.5);
// Returns: 150

// tを制限して結果を[a, b]内に収めます
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

`lerp` は `inverseLerp` の逆関数です。組み合わせると、ある範囲の数値を別の範囲に対応させることができます。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 0.25を[0, 1]から[10, 20]に対応させます
lerp(10, 20, 0.25);
// Returns: 12.5

// 150を[100, 200]から[0, 1000]に対応させます
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### パラメータ

- `a` (`number`): 開始値です。`t` が `0` のときに返されます。
- `b` (`number`): 終了値です。`t` が `1` のときに返されます。
- `t` (`number`): 補間の割合です。通常は `0` から `1` の間の値を使用します。

#### 戻り値

(`number`): 補間された数値を返します。
