# isSymbol

値がシンボルかどうかを確認します。

この関数はTypeScriptの型述語としても機能し、引数の型を`symbol`に狭めます。


## インターフェース

```typescript
function isSymbol(value: unknown): value is symbol;
```

### パラメータ

- `value` (`unknown`) 確認する値ます。

### 戻り値

(`value is symbol`): `value`がシンボルであれば`true`を返し、それ以外の場合は`false`を返します。