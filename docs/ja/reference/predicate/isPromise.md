# isPromise

指定された値が `Promise` かどうかを確認します。

この関数は、提供された値が `Promise` のインスタンスかどうかをテストします。
値が `Promise` の場合は `true` を返し、そうでない場合は `false` を返します。

この関数は、TypeScript で型述語としても機能し、引数の型を `Promise` に狭めます。

## インターフェース

```typescript
function isPromise(value: unknown): value is Promise<any>;
```

### パラメータ

- `value` (`unknown`): `Promise`かどうか確認する値。

### 戻り値

(`value is Promise<any>`): 値が`Promise`の場合は`true`、そうでない場合は`false`。

## 例

```typescript
const value1 = new Promise(resolve => resolve());
const value2 = {};
const value3 = 123;

console.log(isPromise(value1)); // true
console.log(isPromise(value2)); // false
console.log(isPromise(value3)); // false
```
