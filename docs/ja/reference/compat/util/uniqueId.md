# toString

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

Generates a unique ID. If prefix is given, the ID is appended to it.

## インターフェース

```typescript
function uniqueId(value?: string): string;
```

### パラメータ

- `value` (`string`, optional): ID の先頭に付ける値。

### 戻り値

(`string`): 一意の ID を返します。

## 例

```typescript
uniqueId('contact_'); // => 'contact_104'
uniqueId(); // => '105'
```
