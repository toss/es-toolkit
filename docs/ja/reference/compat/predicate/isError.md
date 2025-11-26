# isError (Lodash互換性)

::: warning es-toolkitの[isError](../../predicate/isError.md)を使用してください
この`isError`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isError](../../predicate/isError.md)を使用してください。
:::

値がErrorオブジェクトかどうかを確認します。

```typescript
const result = isError(value);
```

## 使用法

### `isError(value)`

値がErrorオブジェクトかどうかを型安全に確認したい場合は`isError`を使用してください。TypeScriptでタイプガードとしても動作します。

```typescript
import { isError } from 'es-toolkit/compat';

// Errorオブジェクトの確認
isError(new Error()); // true
isError(new TypeError('Type error')); // true
isError(new ReferenceError('Reference error')); // true

// Errorを継承したカスタムエラー
class CustomError extends Error {}
isError(new CustomError()); // true

// 他の型はfalse
isError('Error'); // false
isError({ name: 'Error', message: 'Something went wrong' }); // false
isError({}); // false
isError(null); // false
isError(undefined); // false
```

#### パラメータ

- `value` (`unknown`): Errorオブジェクトかどうかを確認する値です。

#### 戻り値

(`value is Error`): 値がErrorオブジェクトの場合は`true`、そうでない場合は`false`を返します。
