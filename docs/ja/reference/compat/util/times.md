# times

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

インデックスを最初のパラメータとして関数を`n`回実行し、その結果からなる配列を返します。

## インターフェース

```typescript
function times<R = number>(n?: number, getValue?: (index: number) => R): R[];
```

### パラメータ

- `n` (`number`): 関数を呼び出す回数。
- `iteratee` (`(index: number) => R`): 各反復で呼び出される関数。
  - 提供されない場合、`0`以上`n-1`未満の配列。

### 戻り値

(`R[]`): 結果の配列。

## 例

```typescript
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
times(2, () => 'es-toolkit'); // => ['es-toolkit', 'es-toolkit']
```
