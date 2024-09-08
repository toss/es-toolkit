# max

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列内で最大値を持つ要素を見つけます。


## インターフェース

```typescript
function max<T>(items: [T, ...T[]]): T;
function max(): undefined;
function max<T>(items?: T[]): T | undefined;
function max<T>(items: T[]): T | undefined;
```

### パラメータ

- `items` (`T[]`): 検索する要素の配列。デフォルトは空の配列です。

### 戻り値

(`T | undefined`): 最大値を持つ要素、または配列が空の場合は未定義です。