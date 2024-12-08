# isElement

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value`がDOM要素であるかどうかを確認します。構造的に確認するため、結果が正確でない場合があります。

## インターフェース

```typescript
function isElement(value?: any): boolean;
```

### パラメータ

- `value` (`any`): 確認する値です。

### 戻り値

(`boolean`): `value`がDOM要素であれば`true`を返し、それ以外の場合は`false`を返します。

## 例

```typescript
console.log(isElement(document.body)); // true
console.log(isElement('<body>')); // false
```
