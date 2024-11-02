# isJSONArray

与えられた値が有効なJSON配列かどうかを確認します。

有効なJSON配列は、すべての項目が[有効なJSON値](./isJSONValue.md)である配列として定義されます。

## インターフェース

```typescript
function isJSONArray(value: unknown): value is any[];
```

### パラメータ

- `value` (`unknown`): 確認する値。

### 戻り値

(`value is any[]`): 値が有効なJSON配列であれば`true`、それ以外の場合は`false`。

## 例

```typescript
console.log(isJSONArray([1, 2, 3])); // true
console.log(isJSONArray(['string', null, true])); // true
console.log(isJSONArray([1, 2, () => {}])); // false
console.log(isJSONArray('not an array')); // false
```
