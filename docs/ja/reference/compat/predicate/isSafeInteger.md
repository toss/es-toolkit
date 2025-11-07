# isSafeInteger (Lodash 互換性)

::: warning `Number.isSafeInteger`を使用してください

この `isSafeInteger` 関数は追加の型チェックオーバーヘッドにより遅く動作します。

代わりにより高速で現代的な `Number.isSafeInteger` を使用してください。

:::

値が安全な整数かどうかを確認します。

```typescript
const result = isSafeInteger(value);
```

## 使用法

### `isSafeInteger(value)`

与えられた値が安全な整数かどうかを確認する際に `isSafeInteger` を使用してください。安全な整数は -(2^53 - 1) と (2^53 - 1) の間の整数で、JavaScript で正確に表現できる整数です。

```typescript
import { isSafeInteger } from 'es-toolkit/compat';

// 安全な整数
isSafeInteger(3); // true
isSafeInteger(-42); // true
isSafeInteger(0); // true
isSafeInteger(Number.MAX_SAFE_INTEGER); // true (9007199254740991)
isSafeInteger(Number.MIN_SAFE_INTEGER); // true (-9007199254740991)

// 安全でない整数
isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false
isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
isSafeInteger(9007199254740992); // false

// 整数でない値
isSafeInteger(3.14); // false
isSafeInteger('3'); // false
isSafeInteger(1n); // false (BigInt)
isSafeInteger([]); // false
isSafeInteger({}); // false
isSafeInteger(null); // false
isSafeInteger(undefined); // false

// 無限大とNaN
isSafeInteger(Infinity); // false
isSafeInteger(-Infinity); // false
isSafeInteger(NaN); // false
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`value is number`): 値が安全な整数の場合は `true`、そうでなければ `false` を返します。  
`true` を返す場合、TypeScript は `value` の型を `number` に絞り込みます。

> 🧠 **TypeScript 注記:**  
> この関数は **型 predicate** として機能します。つまり、`true` を返す場合、  
> TypeScript は引数の型を `number` に絞り込みます。
