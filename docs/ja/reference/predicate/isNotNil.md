# isNotNil

与えられた値がnullやundefinedでないかを確認します。

値が`null`や`undefined`でなければ`true`を返し、そうであれば`false`を返します。

TypeScriptの型ガードとしてよく使用されます。パラメータとして与えられた値を`null`や`undefined`ではない型に絞り込むことができます。Nullableでないことを型で保証できます。

## インターフェース

```typescript
function isNotNil<T>(x: T | null | undefined): x is T;
```

### パラメータ

- `x` (`T | null | undefined`): nullやundefinedでないことを確認する値。

### 戻り値

(`x is T`): 値がnullやundefinedでなければtrue。そうであればfalse。

## 例

```typescript
// `arr`の型は(number | undefined)[]です
const arr = [1, undefined, 3];
// `result`の型はnumber[]です
const result = arr.filter(isNotNil);
// `result`の値は[1, 3]になります
```
