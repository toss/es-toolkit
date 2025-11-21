# sampleSize（Lodash 互換性）

::: warning `es-toolkit` の [sampleSize](../../array/sampleSize.md) を使用してください

この `sampleSize` 関数は、`null` や `undefined` の処理、オブジェクトのサポート、デフォルト値の処理などにより、遅く動作します。

より高速でモダンな `es-toolkit` の [sampleSize](../../array/sampleSize.md) を使用してください。

:::

配列またはオブジェクトから指定された数だけランダムに要素を選択します。

```typescript
const sampled = sampleSize(collection, size);
```

## 使用法

### `sampleSize(collection, size?)`

配列またはオブジェクトからランダムに要素を選択する場合は `sampleSize` を使用します。Floyd アルゴリズムを使用して重複なく効率的にサンプリングします。

```typescript
import { sampleSize } from 'es-toolkit/compat';

// 配列から3個の要素をランダムに選択します。
sampleSize([1, 2, 3, 4, 5], 3);
// 戻り値：[2, 4, 5]（実際の結果は異なる場合があります）

// オブジェクトから2個の値をランダムに選択します。
sampleSize({ a: 1, b: 2, c: 3, d: 4 }, 2);
// 戻り値：[2, 4]（実際の結果は異なる場合があります）
```

`null` や `undefined` は空の配列として処理します。

```typescript
import { sampleSize } from 'es-toolkit/compat';

sampleSize(null, 2);
// 戻り値：[]

sampleSize(undefined, 2);
// 戻り値：[]
```

#### パラメータ

- `collection` (`Record<string, T> | Record<number, T> | T | null | undefined`): サンプリングする配列またはオブジェクト。
- `size` (`number`、オプション): 選択する要素の個数。デフォルトは `1` です。

#### 戻り値

(`T[]`)：ランダムに選択された要素で構成される新しい配列を返します。
