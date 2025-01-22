# toArray

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値を配列に変換します。

## インターフェース

```typescript
function toArray(value?: unknown): any[];
```

### パラメータ

- `value` (`unknown`): 変換する値です。

### 戻り値

(`any[]`): 変換された配列を返します。
数値配列。

## 例

```typescript
toArray({ a: 1, b: 2 }); // => returns [1,2]
toArray('abc'); // => returns ['a', 'b', 'c']
toArray(1); // => returns []
toArray(null); // => returns []
```
