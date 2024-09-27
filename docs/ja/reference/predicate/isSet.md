# isSet

指定された値が `Set` かどうかを確認します。

この関数は、提供された値が `Set` のインスタンスかどうかをテストします。
値が `Set` の場合は `true` を返し、そうでない場合は `false` を返します。

この関数は、TypeScript で型述語としても機能し、引数の型を `Set` に狭めます。

## インターフェース

```typescript
function isSet(value: unknown): value is Set<any>;
```

### パラメータ

- `value` (`unknown`): テストする値。

### 戻り値

(`value is Set<any>`): 値が`Set`の場合は`true`、そうでない場合は`false`。

## 例

```typescript
const value1 = new Set();
const value2 = new Map();
const value3 = new WeakSet();

console.log(isSet(value1)); // true
console.log(isSet(value2)); // false
console.log(isSet(value3)); // false
```
