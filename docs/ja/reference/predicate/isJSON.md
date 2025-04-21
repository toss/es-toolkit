# isJSON

与えられた値が有効なJSON文字列かどうかを確認します。

有効なJSON文字列は`JSON.parse()`を使用して正常に解析できる文字列です。JSON仕様によると、有効なJSONは以下を表現できます：

- オブジェクト（文字列キーと有効なJSON値を持つ）
- 配列（有効なJSON値を含む）
- 文字列
- 数値
- ブール値
- `null`

`"null"`、`"true"`、`"false"`などの文字列値や数値文字列（例：`"42"`）も有効なJSONとみなされ、`true`を返します。

この関数はTypeScriptのタイプガードとして機能し、引数の型を`string`に絞り込みます。

## インターフェース

```typescript
function isJSON(value: unknown): value is string;
```

### パラメータ

- `value` (`unknown`): 確認する値。

### 戻り値

(`boolean`): `value`が有効なJSON文字列であれば`true`、そうでなければ`false`。

## 例

```typescript
isJSON('{"name":"John","age":30}'); // true
isJSON('[1,2,3]'); // true
isJSON('true'); // true
isJSON('invalid json'); // false
isJSON({ name: 'John' }); // false (not a string)
isJSON(null); // false (not a string)
```
