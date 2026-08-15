# add (関数型プログラミング)

入力に数値を加える関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(value, add(addend));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`add` は、入力に `addend` を加える関数を返します。合成のために設計されており、[`pipe`](./pipe.md) を流れる値を変換したり、[`map`](./map.md) のような関数のコールバックとして使ったりできます。

```typescript
import { add, map, pipe } from 'es-toolkit/fp';

// パイプを流れる値を変換します。
pipe(3, add(2)); // => 5

// map のコールバックとして使います。
pipe([1, 2, 3], map(add(10))); // => [11, 12, 13]
```

#### パラメータ

- `addend` (`number`): 入力に加える数値です。

#### 戻り値

(`(value: number) => number`): `value` を `value + addend` に変換する関数です。
