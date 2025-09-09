# gt

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値が他の値より大きいかどうかを確認します。

## インターフェース

```typescript
function gt(value: any, other: any): boolean;
```

### パラメータ

- `value` (`any`): 比較する値。
- `other` (`any`): 比較するもう一方の値。

### 戻り値

(`boolean`): 値が他の値より大きい場合は `true`、それ以外の場合は `false`。

## 例

```typescript
gt(3, 1); // true
gt(3, 3); // false
gt(1, 3); // false
```
