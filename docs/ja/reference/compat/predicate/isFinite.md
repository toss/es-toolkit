# isFinite

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替となるネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値が有限の数値かどうかを確認します。

この関数は、TypeScriptにおいて型を判別するための述語関数としても使用でき、引数の型を `number` に絞り込むことができます。

## インターフェース

```typescript
function isFinite(value?: unknown): value is number;
```

### パラメータ

- `value` (`unknown`): 有限の数値かどうかを確認する値。

### 戻り値

(`value is number`): 値が有限の数値であれば `true`、そうでなければ `false` を返します。

## 例

```typescript
const value1 = 100;
const value2 = Infinity;
const value3 = '100';

console.log(isFinite(value1)); // true
console.log(isFinite(value2)); // false
console.log(isFinite(value3)); // false
```
