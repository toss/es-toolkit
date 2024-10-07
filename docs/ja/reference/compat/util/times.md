# times

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

関数`iteratee`を`n`回呼び出し、それぞれの呼び出しの結果を配列として返します。

関数は1つの引数（インデックス）で呼び出されます。

## インターフェース

```typescript
function times<F extends (n: number) => any>(n?: number, iteratee?: F): Array<ReturnType<F>>;
```

### パラメータ

- `n` (`number`): イテレータを呼び出す回数です。
- `iteratee` (`F extends (n: number) => any`): 各イテレーションで呼び出される関数。デフォルトはアイデンティティです。

### 戻り値

(`Array<ReturnType<F>>`): 結果の配列を返します。

## 例

```typescript
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
times(2, () => 'es-toolkit') // => ['es-toolkit', 'es-toolkit']
```