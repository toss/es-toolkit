# cond

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

条件を順番にチェックしながら、一致する条件を見つけてその関数を実行する関数を作成します。

各ペアは条件をチェックする関数と実行する関数で構成されています。
条件関数を順番に実行し、`true`を返す条件が見つかるまでチェックします。
`true`を返す条件が見つかると、対応する関数を実行してその結果を返します。
すべての条件が`false`を返した場合は`undefined`を返します。

## インターフェース

```typescript
function cond<R>(pairs: Array<[truthy: () => boolean, falsey: () => R]>): () => R;
function cond<T, R>(pairs: Array<[truthy: (val: T) => boolean, falsey: (val: T) => R]>): (val: T) => R;
```

### パラメータ

- `pairs` (`Array<[truthy: (val: T) => boolean, falsey: (val: T) => R]>`): 条件をチェックする関数と実行する関数のペア。

### 戻り値

(`(val: T) => R`): 条件をチェックして一致する関数を実行する新しい合成関数。

## 例

```typescript
const func = cond([
  [matches({ a: 1 }), constant('matches A')],
  [conforms({ b: isNumber }), constant('matches B')],
  [stubTrue, constant('no match')],
]);

func({ a: 1, b: 2 });
// => 'matches A'

func({ a: 0, b: 1 });
// => 'matches B'

func({ a: '1', b: '2' });
// => 'no match'
```
