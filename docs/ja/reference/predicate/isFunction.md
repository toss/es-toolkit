# isFunction

与えられた値が関数かどうかを確認します。

`value`が関数であれば`true`、そうでなければ`false`を返します。

TypeScriptの型ガードとして使用できます。パラメータとして与えられた値の型を`(...args: never[]) => unknown`に絞り込みます。

## インターフェース

```typescript
function isFunction(value: unknown): value is (...args: never[]) => unknown;
```

### パラメータ

- `value` (`unknown`): 関数かどうかを確認する値です。

### 戻り値

(`value is number`): 与えられた値が関数であれば`true`、そうでなければ`false`を返します。

## 例

```typescript
import { isFunction } from 'es-toolkit/predicate';

console.log(isFunction(Array.prototype.slice)); // true
console.log(isFunction(async function () {})); // true
console.log(isFunction(function* () {})); // true
console.log(isFunction(Proxy)); // true
console.log(isFunction(Int8Array)); // true
```
