# max

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列から最大値を持つ要素を返します。

配列が空の場合は、`undefined` を返します。

## インターフェース

```typescript
function max<T>(items: [T, ...T[]]): T;
function max(): undefined;
function max<T>(items?: T[]): T | undefined;
```

### パラメータ

- `items` (`T[]`): 最大値を持つ要素を探す配列。

### 戻り値

(`T`): 配列から最大値を持つ要素。配列が空の場合は `undefined` を返します。

### 例

```typescript
max([1, 2, 3]); // 戻り値: 3
max(['a', 'b']); // 戻り値: 'b'
```
