# isLength

与えられた値が有効な長さかどうかを確認します。

有効な長さとは、`0`以上`Number.MAX_SAFE_INTEGER`未満の整数を指します。

TypeScriptの型ガードとして使用できます。パラメータとして与えられた値の型を`number`に絞り込みます。

## インターフェース

```typescript
function isLength(value: unknown): value is number;
```

### パラメータ

- `value` (`unknown`): 有効な長さかどうかを確認する値。

### 戻り値

(`value is number`): 値が有効な長さであれば`true`、そうでなければ`false`。

## 例

```typescript
import { isLength } from 'es-toolkit/predicate';

const value1 = 0;
const value2 = 42;
const value3 = -1;
const value4 = 1.5;
const value5 = Number.MAX_SAFE_INTEGER;
const value6 = Number.MAX_SAFE_INTEGER + 1;

console.log(isLength(value1)); // true
console.log(isLength(value2)); // true
console.log(isLength(value3)); // false
console.log(isLength(value4)); // false
console.log(isLength(value5)); // true
console.log(isLength(value6)); // false
```
