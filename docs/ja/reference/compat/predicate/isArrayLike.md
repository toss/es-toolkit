# isArrayLike

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替となるネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値が配列のようなオブジェクトかどうかを確認します。

配列のようなオブジェクトは、`null` でも `undefined` でも関数でもなく、`length` プロパティが有効な長さを持つオブジェクトです。

TypeScript の型ガードとして使用できます。パラメータとして与えられた値の型を `ArrayLike<unknown>` に絞り込みます。

## インターフェース

```typescript
function isArrayLike(value?: unknown): value is ArrayLike<unknown>;
```

### パラメータ

- `value` (`unknown`): 配列のようなオブジェクトかどうかを確認する値です。

### 戻り値

(`value is ArrayLike<unknown>`): 与えられた値がArrayLikeオブジェクトであれば `true`、そうでなければ `false` を返します。

## 例

```typescript
import { isArrayLike } from 'es-toolkit/compat';

console.log(isArrayLike([1, 2, 3])); // true
console.log(isArrayLike('abc')); // true
console.log(isArrayLike({ 0: 'a', length: 1 })); // true
console.log(isArrayLike({})); // false
console.log(isArrayLike(null)); // false
console.log(isArrayLike(undefined)); // false
```
