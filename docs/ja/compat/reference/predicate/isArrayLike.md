# isArrayLike (Lodash互換性)

値が配列のようなオブジェクトかどうかを確認します。

```typescript
const result = isArrayLike(value);
```

## 使用法

### `isArrayLike(value)`

指定された値が配列のようなオブジェクトかどうかを確認したい場合は`isArrayLike`を使用してください。配列、文字列、argumentsオブジェクト、NodeListなどが配列のようなオブジェクトに該当します。

```typescript
import { isArrayLike } from 'es-toolkit/compat';

// 配列と文字列
isArrayLike([1, 2, 3]); // true
isArrayLike('abc'); // true
isArrayLike(''); // true

// 配列のようなオブジェクト
isArrayLike({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLike({ length: 0 }); // true

// argumentsオブジェクト
function example() {
  return isArrayLike(arguments); // true
}

// 配列ではないもの
isArrayLike({}); // false
isArrayLike({ length: 'invalid' }); // false
isArrayLike(null); // false
isArrayLike(undefined); // false
isArrayLike(() => {}); // false
isArrayLike(123); // false
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値が配列のようなオブジェクトの場合は`true`、そうでない場合は`false`を返します。
