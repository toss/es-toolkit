# flatMap (`Iterator`向け)

イテレータの各要素をイテラブルに変換し、その結果を 1 段階平坦化して遅延的に生成する関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, flatMap(callback));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap)（`source.flatMap(callback)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `flatMap(callback)`

`flatMap` は各要素をイテラブル（またはイテレータ）に変換し、そのイテラブルの要素をその場で 1 段階だけ展開して生成します。内側の各イテラブルは、その要素が取り出されるときにのみ走査されるため、パイプライン全体が遅延評価のまま保たれます。ネイティブの `Iterator.prototype.flatMap` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { flatMap, toArray } from 'es-toolkit/fp/iterator';

// 各要素を、それ自身とその 10 倍に展開します。
pipe([1, 2].values(), flatMap(x => [x, x * 10]), toArray());
// 結果: [1, 10, 2, 20]
```

#### パラメータ

- `callback` (`(value: T, index: number) => Iterator<U> | Iterable<U>`): 各要素とそのインデックスとともに呼び出されます。結果に平坦化して展開するイテラブルを返します。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): イテレータを、平坦化された要素を生成する遅延評価のイテレータに変換する関数です。
