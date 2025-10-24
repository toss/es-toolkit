# addJitter

基準となる遅延時間にランダムなジッター(jitter)を加えて、多数のタスクが同じタイミングで一斉に実行される（"thundering herd" 問題）ことを避けます。

戻り値は次の区間から一様分布でサンプリングされます:

```
[delay - delay * factor, delay + delay * factor]
```

その後、負の値にならないよう 0 未満なら 0 に丸められます。

再試行（リトライ）/指数バックオフ、ポーリング間隔の分散、同時起動の集中緩和などに有用です。

## インターフェース

```typescript
function addJitter(delay: number, factor?: number, rng?: () => number): number;
```

### パラメータ

- `delay` (`number`): 基準となる遅延（ミリ秒）。
- `factor` (`number`, 省略可, 既定値 `0.2`): ジッター係数（推奨範囲 `[0, 1]`）。最大で±何割ブレるかを示し、`0` ならジッターなし。
- `rng` (`() => number`, 省略可, 既定値 `Math.random`): `[0, 1)` の乱数を返す関数。テストで再現性を得るために差し替え可能。

### 戻り値

(`number`): ジッター適用後の 0 以上の遅延時間（ミリ秒）。

## 例

### 基本的な使用法

```typescript
import { addJitter } from 'es-toolkit/promise';

const base = 1000; // 1秒
const value = addJitter(base); // factor=0.2 の場合 [800, 1200] の範囲
console.log(value);
```

### ジッター係数を指定

```typescript
addJitter(500, 0.5); // [250, 750] の範囲
```

### カスタム RNG（決定的テスト）

```typescript
// rng が常に 1 を返す -> 上限値
const upper = addJitter(100, 0.3, () => 1); // 130
// rng が常に 0 を返す -> 下限値
const lower = addJitter(100, 0.3, () => 0); // 70
```

### 指数バックオフとの併用

```typescript
import { addJitter, delay } from 'es-toolkit/promise';

async function fetchWithRetry(run: () => Promise<any>) {
  let base = 500;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await run();
    } catch (err) {
      const wait = addJitter(base); // 同時リトライを分散
      await delay(wait);
      base *= 2; // 指数的に増加
    }
  }
  throw new Error('All retries failed');
}
```

### ポーリング間隔を分散

```typescript
import { addJitter, delay } from 'es-toolkit/promise';

async function poll(run: () => Promise<void>) {
  const base = 2000;
  const wait = addJitter(base, 0.15);
  await delay(wait);
  await run();
  // 次回をスケジュール
  setTimeout(() => poll(run), addJitter(base, 0.15));
}
```

## 動作と注意事項

- 区間全体で一様分布。
- `factor > 1`（非推奨）や `delay` が極端に小さくても負値にはならず 0 に切り上げ。
- `factor = 0` なら元の `delay` をそのまま返す。
- 再現テストのためカスタム `rng` を差し替え可能。
