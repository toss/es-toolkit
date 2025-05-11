# memoize

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

関数の結果をメモ化（memoization）し、同じ引数で再度呼び出された時にキャッシュされた結果を返します。

## インターフェース

```typescript
function memoize<T extends (...args: any) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T>;
```

### パラメータ

- `func` (`T`): メモ化する関数
- `resolver` (`(...args: Parameters<T>) => any`): キャッシュキーを解決する関数。デフォルトでは最初の引数をキーとして使用

### 戻り値

(`MemoizedFunction<T>`): メモ化された関数を返します。この関数は元の関数と同じシグネチャを持ち、`cache` プロパティを通じてキャッシュにアクセスできます。

## 例

```typescript
import { memoize } from 'es-toolkit/compat';
import { values } from 'es-toolkit/compat';

const object = { a: 1, b: 2 };
const other = { c: 3, d: 4 };

const memoizedValues = memoize(values);
memoizedValues(object);
// => [1, 2]

memoizedValues(other);
// => [3, 4]

object.a = 2;
memoizedValues(object);
// => [1, 2] (キャッシュされた結果)

// キャッシュの修正
memoizedValues.cache.set(object, ['a', 'b']);
memoizedValues(object);
// => ['a', 'b']
```
