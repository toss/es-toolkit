# isObject

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値がオブジェクトかどうかをチェックします。オブジェクトはプリミティブ型（文字列、数値、真偽値、シンボル、`null`、または`undefined`）ではない値です。

この関数は提供された値がオブジェクトかどうかをテストします。
値がオブジェクトであれば`true`を返し、それ以外の場合は`false`を返します。

この関数はTypeScriptの型述語としても機能し、引数の型をオブジェクト値に絞り込みます。

## インターフェース

```typescript
function isObject(value: unknown): value is object;
```

### パラメータ

- `value` (`unknown`): それがオブジェクトかどうかを確認する値。

### 戻り値

(`value is object`): 値がオブジェクトの言語型である場合は`true`、それ以外の場合は`false`。

## 例

```typescript
const value1 = {};
const value2 = [1, 2, 3];
const value3 = () => {};
const value4 = null;

console.log(isObject(value1)); // true
console.log(isObject(value2)); // true
console.log(isObject(value3)); // true
console.log(isObject(value4)); // false
```
