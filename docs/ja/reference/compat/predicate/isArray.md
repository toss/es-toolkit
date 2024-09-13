# isArray

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値が配列かどうかを確認します。

この関数は、与えられた値が配列かどうかを確認します。
値が配列であれば `true`、そうでなければ `false` を返します。

TypeScript の型ガードとしてよく使用され、パラメータとして与えられた値を配列型に絞り込むことができます。

## インターフェース

```typescript
function isArray(value?: unknown): value is any[];
```

### パラメータ

- `value` (`unknown`): 配列かどうかを確認する値。

### 戻り値

(`value is any[]`): 値が配列であれば `true`、そうでなければ `false`。

## 例

```typescript
const value1 = [1, 2, 3];
const value2 = 'abc';
const value3 = () => {};

console.log(isArray(value1)); // true
console.log(isArray(value2)); // false
console.log(isArray(value3)); // false
```
