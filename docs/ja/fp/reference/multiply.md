# multiply

入力に数値を掛けるデータラストな演算子を作成します。

```typescript
const result = pipe(value, multiply(multiplicand));
```

## 使用法

`multiply` は、入力に `multiplicand` を掛ける関数を返します。合成のために設計されており、[`pipe`](/ja/fp/reference/pipe) を流れる値を変換したり、[`map`](/ja/fp/reference/map) のような演算子のコールバックとして使ったりできます。

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

(`(value: number) => number`): `value` を `value * multiplicand` に変換するデータラストな演算子です。
