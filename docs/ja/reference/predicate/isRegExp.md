# isRegExp

`value`が正規表現かをチェックします。

TypeScriptの型ガードとして使用できます。パラメータとして与えられた値の型を`RegExp`に絞り込みます。

## インターフェース

```typescript
function isRegExp(value: unknown): value is RegExp;
```

### パラメータ

- `value` (`unknown`) チェックする値ます。

### 戻り値

(`value is RegExp`): `value`が正規表現であれば`true`を、そうでなければ`false`を返ししますます。

## 例

```typescript
const value1 = /abc/;
const value2 = '/abc/';

console.log(isRegExp(value1)); // true
console.log(isRegExp(value2)); // false
```
