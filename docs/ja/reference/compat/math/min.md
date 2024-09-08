# min

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列の中で最小値を持つ要素を見つけます。

## インターフェース

```typescript
function min<T>(items: [T, ...T[]]): T;
function min(): undefined;
function min<T>(items?: T[]): T | undefined;
function min<T>(items: T[]): T;
```

### パラメータ

- `items` (`T[]`): 検索する要素の配列。デフォルトは空の配列です。

### 戻り値

(`T`): 最小値を持つ要素です。
