# isError

与えられた値が `Error` オブジェクトかどうかを確認します。

```typescript
const result = isError(value);
```

## 参照

### `isError(value)`

与えられた値が `Error` オブジェクトかどうかを確認したい場合に `isError` を使用してください。TypeScript で型ガードとして活用し、値の型を `Error` に絞り込むことができます。try-catch ブロックや API レスポンスを処理する際に特に便利です。

```typescript
import { isError } from 'es-toolkit/predicate';

// Error オブジェクトの確認
isError(new Error('Something went wrong')); // true
isError(new TypeError('Type error')); // true

// 他の型との区別
isError('error'); // false
isError({ name: 'Error', message: 'Custom error' }); // false
```

TypeScript で型ガードとして使用すると、値の型が絞り込まれます。

```typescript
function handleError(value: unknown) {
  if (isError(value)) {
    // value は Error に型が絞り込まれます
    console.log(`エラーが発生しました: ${value.message}`);
    return value.name;
  }
  return 'エラーではありません';
}
```

#### パラメータ

- `value` (`unknown`): `Error` オブジェクトかどうかを確認する値です。

#### 戻り値

(`value is Error`): 値が `Error` オブジェクトの場合は `true`、そうでなければ `false` を返します。
