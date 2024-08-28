# min

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列から最小値を持つ要素を返します。

配列が空の場合は、`undefined` を返します。

## インターフェース

```typescript
function min<T>(items: [T, ...T[]]): T;
function min(): undefined;
function min<T>(items?: T[]): T | undefined;
```

### パラメータ

- `items` (`T[]`): 最小値を持つ要素を探す配列。

### 戻り値

(`T`): 配列の中で最小値を持つ要素。配列が空の場合は `undefined` を返します。

### 例

```typescript
min([1, 2, 3]); // 戻り値: 1
min(['a', 'b']); // 戻り値: 'a'
```
