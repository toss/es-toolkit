# toSafeInteger (Lodash 互換性)

値を安全な整数に変換します。

```typescript
const result = toSafeInteger(value);
```

## 使用法

### `toSafeInteger(value)`

値を安全な整数に変換したいときに`toSafeInteger`を使用します。安全な整数はJavaScriptで正確に表現可能な整数で、`Number.MIN_SAFE_INTEGER`と`Number.MAX_SAFE_INTEGER`の範囲内の値です。

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(3.2);
// Returns: 3

toSafeInteger(Infinity);
// Returns: 9007199254740991

toSafeInteger('3.2');
// Returns: 3

// 文字列変換
toSafeInteger('abc');
// Returns: 0

// 特殊値処理
toSafeInteger(NaN);
// Returns: 0

toSafeInteger(null);
// Returns: 0

toSafeInteger(undefined);
// Returns: 0
```

無限大値も安全な範囲に制限します。

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(-Infinity);
// Returns: -9007199254740991 (Number.MIN_SAFE_INTEGER)

toSafeInteger(Number.MAX_VALUE);
// Returns: 9007199254740991
```

配列インデックスやID値として使用するときに便利です。

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

function getArrayItem(arr: any[], index: any) {
  const safeIndex = toSafeInteger(index);
  return arr[safeIndex];
}

const items = ['a', 'b', 'c', 'd', 'e'];
console.log(getArrayItem(items, '2.7')); // 'c' (インデックス2)
console.log(getArrayItem(items, Infinity)); // undefined (範囲外)
```

#### パラメータ

- `value` (`unknown`): 変換する値です。

#### 戻り値

(`number`): 変換された安全な整数を返します。
