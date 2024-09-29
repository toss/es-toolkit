# isJSONValue

与えられた値が有効なJSON値かどうかを確認します。

有効なJSON値とは、次のいずれかを指します。

- [JSONオブジェクト](./isJSONObject.md)（文字列キーと有効なJSON値を持つオブジェクト）
- [JSON配列](./isJSONArray.md)（有効なJSON値の配列）
- 文字列（`string`）
- 数字（`number`）
- 真偽値（`boolean`）
- `null`

## インターフェース

```typescript
function isJSONValue(value: unknown): value is Record<string, any> | any[] | string | number | boolean | null;
```

### パラメータ

- `value` (`unknown`): チェックする値。

### 戻り値

(`value is Record<string, any> | any[] | string | number | boolean | null`): 値が有効なJSON値であれば`true`、そうでなければ`false`。

## 例

```typescript
console.log(isJSONValue(null)); // true
console.log(isJSONValue({ key: 'value' })); // true
console.log(isJSONValue([1, 2, 3])); // true
console.log(isJSONValue('Hello')); // true
console.log(isJSONValue(42)); // true
console.log(isJSONValue(true)); // true
console.log(isJSONValue(undefined)); // false
console.log(isJSONValue(() => {})); // false
```
