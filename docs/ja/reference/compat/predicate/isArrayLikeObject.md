# isArrayLikeObject (Lodash互換性)

値がプリミティブではない配列のようなオブジェクトかどうかを確認します。

```typescript
const result = isArrayLikeObject(value);
```

## 使用法

### `isArrayLikeObject(value)`

指定された値がプリミティブではない配列のようなオブジェクトかどうかを確認したい場合は`isArrayLikeObject`を使用してください。配列、argumentsオブジェクト、NodeListなどが該当しますが、文字列はプリミティブ値なので除外されます。

```typescript
import { isArrayLikeObject } from 'es-toolkit/compat';

// 配列のようなオブジェクト（プリミティブではない）
isArrayLikeObject([1, 2, 3]); // true
isArrayLikeObject({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLikeObject({ length: 0 }); // true

// argumentsオブジェクト
function example() {
  return isArrayLikeObject(arguments); // true
}

// NodeListやHTMLCollection（ブラウザで）
isArrayLikeObject(document.querySelectorAll('div')); // true

// プリミティブ値はfalse（文字列を含む）
isArrayLikeObject('abc'); // false
isArrayLikeObject(''); // false
isArrayLikeObject(123); // false
isArrayLikeObject(true); // false

// その他のオブジェクト
isArrayLikeObject({}); // false
isArrayLikeObject(null); // false
isArrayLikeObject(undefined); // false
isArrayLikeObject(() => {}); // false
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値がプリミティブではない配列のようなオブジェクトの場合は`true`、そうでない場合は`false`を返します。
