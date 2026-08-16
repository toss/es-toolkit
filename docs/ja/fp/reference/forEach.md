# forEach (関数型プログラミング)

各値にコールバックを実行し、入力配列を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, forEach(callback));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`forEach` はパイプラインに副作用のステップを入れたい場合に便利です。各値に `callback` を呼び出し、元の配列をそのまま渡します。[`pipe`](./pipe.md) の中では、隣接する遅延処理が早期停止できる場合に遅延評価に対応します。

```typescript
import { forEach, pipe } from 'es-toolkit/fp';

const values: number[] = [];

pipe(
  [1, 2, 3],
  forEach(value => values.push(value))
); // => [1, 2, 3]
values; // => [1, 2, 3]
```

#### パラメータ

- `callback` (`(value: T, index: number) => void`): 各値に対して実行する関数です。

#### 戻り値

(`(array: readonly T[]) => readonly T[]`): callback を実行した後、同じ配列を返す関数です。
