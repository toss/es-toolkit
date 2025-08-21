# isString

与えられた値が文字列（string）であるかを確認します。

TypeScriptの型ガードとして使用できます。パラメータとして与えられた値の型を`string`に絞り込みます。

## インターフェース

```typescript
function isString(value: unknown): value is string;
```

### パラメータ

- `value`(`unknown`): 文字列かどうかをテストする値。

### 戻り値

(`value is string`): 値が文字列であれば`true`、そうでなければ`false`。

## 例

```typescript
const value1 = 'abc';
const value2 = 123;
const value3 = true;

console.log(isString(value1)); // true
console.log(isString(value2)); // false
console.log(isString(value3)); // false
```
