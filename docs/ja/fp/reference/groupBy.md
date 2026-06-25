# groupBy

関数型パイプラインで使える data-last の `groupBy` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  groupBy(value => value.length)
);
```

## 使い方

`groupBy` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { groupBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  ['a', 'bb', 'c'],
  groupBy(value => value.length)
);
// { 1: ['a', 'c'], 2: ['bb'] }
```

## API

### `groupBy(...)`

戻り値: A function that accepts the piped input.
