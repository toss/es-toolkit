# isSafeInteger

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value`が安全な整数（Safe Integer）かどうかを確認します。

安全な整数とは、JavaScriptの`number`型で正確に表現され、他の整数に丸められない整数です。

TypeScriptのタイプガードとして使用できます。パラメーターとして与えられた値のタイプを`number`に絞ります。

## インターフェース

```typescript
function isSafeInteger(value?: unknown): boolean;
```

### パラメータ

- `value` (`unknown`): 確認する値。

### 戻り値

(`boolean`): `value`が整数で安全な値の範囲内であれば `true`、そうでなければ `false`。

## 例

```typescript
isSafeInteger(3); // Returns: true
isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // Returns: false
isSafeInteger(1n); // Returns: false
isSafeInteger('1'); // Returns: false
```
