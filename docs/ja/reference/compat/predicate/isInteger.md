# isInteger

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value`が整数であるかどうかを確認します。

この関数はTypeScriptの型述語としても機能し、引数の型を`number`に絞り込みます。

## インターフェース

```typescript
function isInteger(value?: unknown): value is number;
```

### パラメータ

- `value` (`unknown`): 確認する値ます。

### 戻り値

(`boolean`): `value`が整数の場合は`true`、それ以外の場合は`false`です。

## 例

```typescript
isInteger(3); // Returns: true
isInteger(Infinity); // Returns: false
isInteger('3'); // Returns: false
isInteger([]); // Returns: false
```
