# isUndefined

与えられた値が `undefined` かどうかを確認します。

この関数は、与えられた値が `undefined` かどうかを厳密等価 (===) 基準で確認します。
値が `undefined` であれば `true`、そうでなければ `false` を返します。

TypeScriptの型ガードとしてよく使用されますが、パラメータとして与えられた値を `undefined` 型に絞り込むことができます。

## インターフェース

```typescript
function isUndefined(x: unknown): x is undefined;
```

### パラメータ

- `x` (`unknown`): `undefined` かどうかを確認する値。

### 戻り値

(`x is undefined`): 値が `undefined` であれば `true`、そうでなければ `false`。

## 例

```typescript
const value1 = undefined;
const value2 = null;
const value3 = 42;

console.log(isUndefined(value1)); // true
console.log(isUndefined(value2)); // false
console.log(isUndefined(value3)); // false
```
