# gte

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値が他の値以上であるかどうかを確認します。

## インターフェース

```typescript
function gte(value: unknown, other: unknown): boolean;
```

### パラメータ

- `value` (`unknown`): 比較する値です。
- `other` (`unknown`): 比較する他の値です。

### 戻り値

(`boolean`): 値が他の値以上である場合は`true`を、それ以外の場合は`false`を返します。

## 例

```typescript
gte(3, 1); // => true
gte(3, 3); // => true
gte(1, 3); // => false
```
