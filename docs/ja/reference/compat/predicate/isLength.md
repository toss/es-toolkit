# isLength (Lodash互換性)

::: warning es-toolkitの[isLength](../../predicate/isLength.md)を使用してください
この`isLength`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isLength](../../predicate/isLength.md)を使用してください。
:::

値が有効な長さかどうかを確認します。

```typescript
const result = isLength(value);
```

## 使用法

### `isLength(value)`

値が有効な長さかどうかを確認したい場合は`isLength`を使用してください。有効な長さは数値型で、非負の整数であり、JavaScriptの最大安全整数(`Number.MAX_SAFE_INTEGER`)以下である必要があります。TypeScriptでタイプガードとしても動作します。

```typescript
import { isLength } from 'es-toolkit/compat';

// 有効な長さ
isLength(0); // true
isLength(42); // true
isLength(100); // true
isLength(Number.MAX_SAFE_INTEGER); // true

// 無効な長さ
isLength(-1); // false (負数)
isLength(1.5); // false (整数ではない)
isLength(Number.MAX_SAFE_INTEGER + 1); // false (安全範囲超過)
isLength('3'); // false (文字列)
isLength(null); // false
isLength(undefined); // false
isLength({}); // false
isLength([]); // false
```

配列や文字列のlengthプロパティが有効かどうかを確認する際に便利です。

```typescript
import { isLength } from 'es-toolkit/compat';

function validateArrayLength(arr: any[]) {
  if (isLength(arr.length)) {
    console.log(`配列の長さ${arr.length}は有効です`);
    return true;
  }
  return false;
}

validateArrayLength([1, 2, 3]); // "配列の長さ3は有効です"
```

#### パラメータ

- `value` (`any`): 有効な長さかどうかを確認する値です。

#### 戻り値

(`boolean`): 値が有効な長さの場合は`true`、そうでない場合は`false`を返します。
