# at

関数型パイプラインで使える data-last の `at` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, at([0, -1]));
```

## 使い方

`at` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { at, pipe } from 'es-toolkit/fp';

const result = pipe(['a', 'b', 'c'], at([0, -1]));
// ['a', 'c']
```

## API

### `at(...)`

戻り値: A function that accepts the piped input.
