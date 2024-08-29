# isNull

与えられた値がnullかどうかを確認します。

この関数は、与えられた値が`null`かどうかを厳密等価演算子（===）を使用して確認します。
値が`null`の場合は`true`を、そうでない場合は`false`を返します。

TypeScriptの型ガードとしてよく使用され、パラメータとして与えられた値を`null`型に絞り込むことができます。

## インターフェース

```typescript
function isNull(x: unknown): x is null;
```

### パラメータ

- `x` (`unknown`): nullかどうかを確認する値。

### 戻り値

(`x is null`): 値がnullの場合はtrue、そうでない場合はfalse。

## 例

```typescript
const value1 = null;
const value2 = undefined;
const value3 = 42;

console.log(isNull(value1)); // true
console.log(isNull(value2)); // false
console.log(isNull(value3)); // false
```
