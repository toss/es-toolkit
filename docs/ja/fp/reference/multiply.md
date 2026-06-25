# multiply (関数型プログラミング)

入力に数値を掛ける関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(value, multiply(multiplicand));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`multiply` は、入力に `multiplicand` を掛ける関数を返します。合成のために設計されており、[`pipe`](./pipe.md) を流れる値を変換したり、[`map`](./map.md) のような関数のコールバックとして使ったりできます。

```typescript
import { map, multiply, pipe } from 'es-toolkit/fp';

// パイプを流れる値を変換します。
pipe(3, multiply(2)); // => 6

// map のコールバックとして使います。
pipe([1, 2, 3], map(multiply(3))); // => [3, 6, 9]
```

#### パラメータ

- `multiplicand` (`number`): 入力に掛ける数値です。

#### 戻り値

(`(value: number) => number`): `value` を `value * multiplicand` に変換する関数です。
