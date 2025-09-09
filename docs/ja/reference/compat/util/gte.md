# gte

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値が他の値以上であるかどうかを確認します。

## インターフェース

```typescript
function gte(value: any, other: any): boolean;
```

### パラメータ

- `value` (`any`): 比較する値。
- `other` (`any`): 比較する他の値。

### 戻り値

(`boolean`): 値が他の値以上である場合は`true`、それ以外の場合は`false`。

## 例

```typescript
gte(3, 1); // => true
gte(3, 3); // => true
gte(1, 3); // => false
```
