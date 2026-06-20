# add

入力に数値を加えるデータラストな演算子を作成します。

```typescript
const result = pipe(value, add(addend));
```

## 使用法

`add` は、入力に `addend` を加える関数を返します。合成のために設計されており、[`pipe`](/ja/fp/reference/pipe) を流れる値を変換したり、[`map`](/ja/fp/reference/map) のような演算子のコールバックとして使ったりできます。

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

(`(value: number) => number`): `value` を `value + addend` に変換するデータラストな演算子です。
