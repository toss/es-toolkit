# uniqWith

関数型パイプラインで使える data-last の `uniqWith` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  uniqWith((a, b) => a.id === b.id)
);
```

## 使い方

`uniqWith` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { pipe, uniqWith } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqWith((a, b) => a.id === b.id)
);
// [{ id: 1 }, { id: 2 }]
```

## API

### `uniqWith(...)`

戻り値: A function that accepts the piped input.
