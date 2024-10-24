# uniqueId

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

一意の文字列識別子を生成します。オプションで、先頭に付ける接頭辞文字列を指定できます。

## インターフェース

```typescript
function uniqueId(prefix?: string): string;
```

### パラメータ

- `prefix` (`string`, optional): 識別子の先頭に付ける値。

### 戻り値

(`string`): 一意の識別子。

## 例

```typescript
uniqueId('contact_'); // => 'contact_104'
uniqueId(); // => '105'
```
