# isJSONObject

値がJSONオブジェクトかどうかを確認します。

有効なJSONオブジェクトとは、キーが文字列で、値が[有効なJSON値](./isJSONValue.md)を持つオブジェクトです。

## インターフェース

```typescript
function isJSONObject(obj: unknown): obj is Record<string, any>;
```

### パラメータ

- `obj` (`unknown`): 確認する値。

### 戻り値

(`obj is Record<string, any>`): `obj`がJSONオブジェクトである場合は`true`、それ以外の場合は`false`。

## 例

```typescript
isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } }); // true
isJSONObject({ regexp: /test/ }); // false
isJSONObject(123); // false
```
