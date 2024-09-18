# isNumber

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値が数値かどうかをチェックします。

この関数はTypeScriptで型述語としても機能し、引数の型を `number` に狭めます。

## インターフェース

```typescript
function isNumber(value?: unknown): value is number;
```

### パラメータ

- `value` (`unknown`): 数値かどうかをチェックする値。

### 戻り値

(`value is number`): `value` が数値の場合は `true` を、それ以外の場合は `false` を返します。

## 例

```typescript
const value1 = 123;
const value2 = 'abc';
const value3 = true;

console.log(isNumber(value1)); // true
console.log(isNumber(value2)); // false
console.log(isNumber(value3)); // false
```
