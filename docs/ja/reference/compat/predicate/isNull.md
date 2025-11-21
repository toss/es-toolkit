# isNull (Lodash 互換性)

::: warning es-toolkitの [isNull](../../predicate/isNull.md)を使用してください

この `isNull` 関数はLodash互換性のための関数ですが、メインライブラリと同じ実装です。

代わりにより高速で現代的な `es-toolkit` の [isNull](../../predicate/isNull.md) を使用してください。

:::

値が `null` かどうかを確認します。

```typescript
const result = isNull(value);
```

## 使用法

### `isNull(value)`

値が正確に `null` かどうかを型安全に確認したい場合に `isNull` を使用してください。TypeScript で型ガードとしても動作します。

```typescript
import { isNull } from 'es-toolkit/compat';

// nullのみtrue
isNull(null); // true

// undefinedもfalse
isNull(undefined); // false

// その他すべての値もfalse
isNull(0); // false
isNull(''); // false
isNull(false); // false
isNull([]); // false
isNull({}); // false
isNull('null'); // false
isNull(NaN); // false
```

`null` と `undefined` を区別して確認することができます。

```typescript
import { isNull } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isNull(value)) {
    console.log('値が明示的にnullです');
  } else if (value === undefined) {
    console.log('値がundefinedです');
  } else {
    console.log(`値があります: ${value}`);
  }
}

handleValue(null); // "値が明示的にnullです"
handleValue(undefined); // "値がundefinedです"
handleValue('hello'); // "値があります: hello"
```

#### パラメータ

- `value` (`any`): `null` かどうかを確認する値です。

#### 戻り値

(`value is null`): 値が `null` の場合は `true`、そうでなければ `false` を返します。
