# lerp

2つの数値 `start`、`stop` の間の `fraction` の位置にある値を計算します。線形補間(Linear interpolation)を使用します。

```typescript
const result = lerp(start, stop, fraction);
```

## 使用法

### `lerp(start, stop, fraction)`

`start` から `stop` までを1つの区間と見なし、その区間の `fraction` の位置にある値が必要なときに `lerp` を使用してください。`fraction` が `0` なら `start`、`1` なら `stop`、`0.5` なら2つの数値のちょうど真ん中の値を返します。アニメーションの中間の値を求めたり、`0` から `1` の進捗率を実際の値に変換したりするときに便利です。

```typescript
import { lerp } from 'es-toolkit/math';

// 0と100のちょうど真ん中の値
lerp(0, 100, 0.5);
// Returns: 50

// 10から20までの区間の4分の1の位置にある値
lerp(10, 20, 0.25);
// Returns: 12.5

// fractionが0ならstart、1ならstopを返します
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// startがstopより大きくても構いません
lerp(100, 0, 0.25);
// Returns: 75
```

`fraction` が `0` より小さいか `1` より大きい場合、結果も `start` と `stop` の間から外れた値になります。範囲内の値だけが必要な場合は、先に `fraction` に `clamp` を適用してください。

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// stopより大きい値になります
lerp(0, 100, 1.5);
// Returns: 150

// fractionを0と1の間に制限すると、結果もstartとstopの間に収まります
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

`inverseLerp` と組み合わせると、ある範囲の数値を別の範囲に移すことができます。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 0.25を[0, 1]から[10, 20]に移します
lerp(10, 20, 0.25);
// Returns: 12.5

// 150を[100, 200]から[0, 1000]に移します
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### パラメータ

- `start` (`number`): 区間の開始値です。`fraction` が `0` のときにこの値を返します。
- `stop` (`number`): 区間の終了値です。`fraction` が `1` のときにこの値を返します。
- `fraction` (`number`): 開始と終了の間の位置を表す補間の割合です。通常は `0` から `1` の間の値を使用します。

#### 戻り値

(`number`): 2つの数値 `start`、`stop` の間の `fraction` の位置にある値を返します。
