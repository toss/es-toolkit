# isArrayLikeObject

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替となるネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値が非プリミティブで配列のようなオブジェクトかどうかを確認します。

配列のようなオブジェクトは、`null` でも `undefined` でも関数でもなく、`length` プロパティが有効な長さを持つオブジェクトです。

TypeScript の型ガードとして使用できます。パラメータとして与えられた値の型を `ArrayLike<unknown> & object` に絞り込みます。

## インターフェース

```typescript
function isArrayLikeObject(value: unknown): value is ArrayLike<unknown> & object;
```

### パラメータ

- `value` (`unknown`): 非プリミティブで配列のようなオブジェクトかどうかを確認する値です。

### 戻り値

(`value is ArrayLike<unknown> & object`): が非プリミティブでArrayLikeオブジェクトであれば true を返し、それ以外の場合は false を返します。

## 例

```typescript
import { isArrayLikeObject } from 'es-toolkit/predicate';

console.log(isArrayLikeObject([1, 2, 3])); // true
console.log(isArrayLikeObject({ 0: 'a', length: 1 })); // true
console.log(isArrayLikeObject('abc')); // false
console.log(isArrayLikeObject(() => {})); // false
```
