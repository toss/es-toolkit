# zipObject

関数型パイプラインで使える data-last の `zipObject` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, zipObject([1, 2]));
```

## 使い方

`zipObject` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { pipe, zipObject } from 'es-toolkit/fp';

const result = pipe(['a', 'b'], zipObject([1, 2]));
// { a: 1, b: 2 }
```

## API

### `zipObject(...)`

戻り値: A function that accepts the piped input.
