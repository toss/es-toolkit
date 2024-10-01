# isArrayBuffer

指定された値が`ArrayBuffer`であるかどうかをチェックします。

この関数はTypeScriptで型述語としても機能し、引数の型を`ArrayBuffer`に絞り込みます。

## インターフェース

```typescript
function isArrayBuffer(value: unknown): value is ArrayBuffer;
```

### パラメータ

- `value` (`unknown`): 値が`ArrayBuffer`であるかどうかをチェックする対象。

### 戻り値

(`value is ArrayBuffer`): `value`が`ArrayBuffer`である場合は`true`を、そうでない場合は`false`を返します。

## 例

```typescript
const value1 = new ArrayBuffer();
const value2 = new Array();
const value3 = new Map();

console.log(isArrayBuffer(value1)); // true
console.log(isArrayBuffer(value2)); // false
console.log(isArrayBuffer(value3)); // false
```
