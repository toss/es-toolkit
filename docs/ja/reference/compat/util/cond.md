# cond

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`pairs` に対して繰り返し処理を行い、最初に真となる述語に対応する関数を呼び出す関数を返します。述語と関数のペアは、作成された関数の `this` バインディングと引数を使用して呼び出されます。

## インターフェース

```typescript
function cond(pairs: any[][]): (...args: any[]) => unknown;
```

### パラメータ

- `pairs` (`Array`): 述語と関数のペア。

### 戻り値

(`(...args: any[]) => unknown`): 新しい複合関数を返します。

## 例

```typescript
var func = cond([
  [matches({ 'a': 1 }),           constant('matches A')],
  [conforms({ 'b': isNumber }), constant('matches B')],
  [stubTrue,                      constant('no match')]
]);

func({ 'a': 1, 'b': 2 });
// => 'matches A'

func({ 'a': 0, 'b': 1 });
// => 'matches B'

func({ 'a': '1', 'b': '2' });
// => 'no match'
```