# isBigInt

与えられた値が bigint であるかどうかを確認します。

この関数は TypeScript の型ガードとしても使用でき、引数の型を `bigint` に絞り込むことができます。

## インターフェース

```typescript
function isBigInt(x: unknown): x is bigint;
```

### パラメータ

- `x` (`unknown`): bigint かどうかをテストする値。

### 戻り値

(`x is bigint`): 値が bigint の場合は true、そうでない場合は false。

## 例

```typescript
const value1 = 0n;
const value2 = 0;
const value3 = '123';

console.log(isBigInt(value1)); // true
console.log(isBigInt(value2)); // false
console.log(isBigInt(value3)); // false
```
