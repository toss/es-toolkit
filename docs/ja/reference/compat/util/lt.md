# lt

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値が他の値より小さいかどうかを確認します。

## インターフェース

```typescript
function lt(value: unknown, other: unknown): boolean;
```

### パラメータ

- `value` (`unknown`): 比較する値。
- `other` (`unknown`): 比較するもう一方の値。

### 戻り値

(`boolean`): 値が他の値より小さい場合は `true` 、それ以外の場合は `false`

## 例

```typescript
lt(1, 3); // true
lt(3, 3); // false
lt(3, 1); // false
```
