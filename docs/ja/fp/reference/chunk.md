# chunk

配列を指定した長さのサブ配列に分割する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, chunk(size));
```

## 使用法

`chunk` は配列を、それぞれ長さ `size` のサブ配列に分割します。配列を均等に分割できない場合、最後のチャンクには残りの要素が入ります。

```typescript
import { chunk, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], chunk(2)); // => [[1, 2], [3, 4], [5]]

// 配列より大きいサイズは 1 つのチャンクになります。
pipe([1, 2, 3], chunk(10)); // => [[1, 2, 3]]
```

#### パラメータ

- `size` (`number`): 各チャンクの長さです。正の整数である必要があります。

#### 戻り値

(`(array: readonly T[]) => T[][]`): `readonly T[]` をチャンクの配列に変換する関数です。

#### エラー

`size` が正の整数でない場合、エラーを投げます。
