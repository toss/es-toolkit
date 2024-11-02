# isError

`value`がErrorオブジェクトであるかどうかを確認します。

この関数はTypeScriptの型ガードとしても使用できます。引数に与えた値の型を`Error`に絞り込みます。

## インターフェース

```typescript
function isError(value: unknown): value is Error;
```

### パラメータ

- `value` (`unknown`): 確認する値です。

### 戻り値

(`value is Error`): `value`がErrorオブジェクトであれば`true`を、それ以外の場合は`false`を返します。

## 例

```typescript
isError(new Error()); // true
isError('error'); // false
isError({ name: 'Error', message: '' }); // false
```
