# isWeakSet

与えられた値が `WeakSet` であるかどうかを確認します。

この関数は、提供された値が `WeakSet` のインスタンスであるかどうかをテストします。 値が `WeakSet` の場合は true を、それ以外の場合は false を返します。

この関数は、TypeScriptにおける型述語としても機能し、引数の型を `WeakSet` に絞り込むことができます。

## インターフェース

```typescript
function isWeakSet(value: unknown): value is WeakSet<WeakKey>;
```

### パラメータ

- `value` (`unknown`): `WeakSet` であるかどうかをテストする値。

### 戻り値

(`value is WeakSet<WeakKey>`): 値が `WeakSet` の場合は `true`、それ以外の場合は `false`。

## 例

```typescript
const value1 = new WeakSet();
const value2 = new Map();
const value3 = new Set();

console.log(isWeakSet(value1)); // true
console.log(isWeakSet(value2)); // false
console.log(isWeakSet(value3)); // false
```
