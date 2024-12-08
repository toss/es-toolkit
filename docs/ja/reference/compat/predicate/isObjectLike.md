# isObjectLike

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値がオブジェクトのようであるかを確認します。

オブジェクトのような値とは、`typeof` 演算の結果が `'object'` で、`null` ではない値のことを指します。

TypeScript の型ガードとして使用できます。パラメータとして与えられた値の型をオブジェクトのような値に絞り込みます。

## インターフェース

```typescript
function isObjectLike(value?: unknown): value is object;
```

### パラメータ

- `value` (`unknown`): オブジェクトのようであるかを確認する値です。

### 戻り値

(`value is object`): 与えられた値がオブジェクトのようであれば `true`、そうでなければ `false` を返します。

## 例

```typescript
import { isObjectLike } from 'es-toolkit/compat';

const value1 = { a: 1 };
const value2 = [1, 2, 3];
const value3 = 'abc';
const value4 = () => {};
const value5 = null;

console.log(isObjectLike(value1)); // true
console.log(isObjectLike(value2)); // true
console.log(isObjectLike(value3)); // false
console.log(isObjectLike(value4)); // false
console.log(isObjectLike(value5)); // false
```
