# isObjectLike (Lodash 互換性)

値がオブジェクトライクかどうかを確認します。

```typescript
const result = isObjectLike(value);
```

## 使用法

### `isObjectLike(value)`

与えられた値がオブジェクトライクな値かどうかを確認する際に `isObjectLike` を使用してください。オブジェクトライクな値は `typeof` 演算の結果が `'object'` で、`null` でない値です。

```typescript
import { isObjectLike } from 'es-toolkit/compat';

// オブジェクトライクな値
isObjectLike({ a: 1 }); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(new Date()); // true
isObjectLike(/regex/); // true
isObjectLike(new Map()); // true
isObjectLike(new Set()); // true

// オブジェクトライクでない値
isObjectLike('abc'); // false
isObjectLike(123); // false
isObjectLike(true); // false
isObjectLike(() => {}); // false
isObjectLike(Symbol('sym')); // false

// 特別なケース
isObjectLike(null); // false (nullはtypeofが'object'だがオブジェクトライクでない)
isObjectLike(undefined); // false
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値がオブジェクトライクの場合は `true`、そうでなければ `false` を返します。
