# isMap

与えられた値が`Map`であるかどうかを確認します。

この関数は、与えられた値が`Map`のインスタンスであるかどうかをテストします。
その値が`Map`である場合は`true`を返し、そうでない場合は`false`を返します。

この関数は、TypeScriptでも型ガードとして使用できます。

## インターフェース

```typescript
function isMap(value: unknown): value is Map<any, any>;
```

### パラメータ

- `value` (`unknown`): テストする値。

### 戻り値

(`value is Map<any, any>`): 値が`Map`の場合は`true`、そうでない場合は`false`。

## 例

```typescript
const value1 = new Map();
const value2 = new Set();
const value3 = new WeakMap();

console.log(isMap(value1)); // true
console.log(isMap(value2)); // false
console.log(isMap(value3)); // false
```
