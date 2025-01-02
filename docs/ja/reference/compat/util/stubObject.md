# stubObject

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

空のオブジェクトを返します。

## インターフェース

```typescript
function stubObject(): {};
```

### 戻り値

(`Object`): 空のオブジェクト。

## 例

```typescript
stubObject(); // Returns {}
```
