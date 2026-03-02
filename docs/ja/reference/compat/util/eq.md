# eq (Lodash 互換性)

二つの値がSameValueZero比較方式で同等かどうかを確認します。

```typescript
const isEqual = eq(value, other);
```

## 使用法

### `eq(value, other)`

二つの値が同等かどうかを確認したい時に`eq`を使用してください。一般的な`===`比較とは異なり、`NaN`同士の比較で`true`を返します。

```typescript
import { eq } from 'es-toolkit/compat';

// 基本使用法
console.log(eq(1, 1)); // true
console.log(eq(0, -0)); // true (SameValueZeroでは0と-0を同じとみなす)
console.log(eq(NaN, NaN)); // true
console.log(eq('a', 'a')); // true
console.log(eq('a', 'b')); // false
```

`Object.is()`とは異なって動作します。

```typescript
// eq 使用
console.log(eq(NaN, NaN)); // true
console.log(eq(0, -0)); // true

// Object.is 使用 (より高速)
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false (Object.isは0と-0を異なるとみなす)

// === 使用
console.log(NaN === NaN); // false
console.log(0 === -0); // true
```

#### パラメータ

- `value` (`any`): 比較する最初の値です。
- `other` (`any`): 比較する二番目の値です。

#### 戻り値

(`boolean`): 二つの値が同等であれば`true`を、そうでなければ`false`を返します。
