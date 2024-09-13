# isWeakMap

与えられた値が `WeakMap` であるかどうかを確認します。

この関数は、提供された値が `WeakMap` のインスタンスであるかどうかをテストします。 値が `WeakMap` の場合は true を、それ以外の場合は false を返します。

この関数は、TypeScriptにおける型述語としても機能し、引数の型を `WeakMap` に絞り込むことができます。

## インターフェース

```typescript
function isWeakMap(value: unknown): value is WeakMap<WeakKey, any>;
```

### パラメータ

- `value` (`unknown`): `WeakMap` であるかどうかをテストする値。

### 戻り値

(`value is WeakMap<WeakKey, any>`): 値が `WeakMap` の場合は `true`、それ以外の場合は `false`。

## 例

```typescript
const value1 = new WeakMap();
const value2 = new Map();
const value3 = new Set();

console.log(isWeakMap(value1)); // true
console.log(isWeakMap(value2)); // false
console.log(isWeakMap(value3)); // false
```
