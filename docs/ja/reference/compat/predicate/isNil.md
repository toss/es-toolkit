# isNil (Lodash 互換性)

::: warning es-toolkitの [isNil](../../predicate/isNil.md)を使用してください

この `isNil` 関数はLodash互換性のための複雑な処理により遅く動作します。

代わりにより高速で現代的な `es-toolkit` の [isNil](../../predicate/isNil.md) を使用してください。

:::

値が `null` または `undefined` かどうかを確認します。

```typescript
const result = isNil(value);
```

## 使用法

### `isNil(x)`

値が `null` または `undefined` かどうかを型安全に確認したい場合に `isNil` を使用してください。TypeScript で型ガードとしても動作します。

```typescript
import { isNil } from 'es-toolkit/compat';

// nullとundefinedはtrue
isNil(null); // true
isNil(undefined); // true

// その他すべての値はfalse
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil([]); // false
isNil({}); // false
isNil('hello'); // false
isNil(42); // false
```

falsy として評価されるが `null` や `undefined` でない値と区別します。

```typescript
import { isNil } from 'es-toolkit/compat';

// falsyとして評価されるがnull/undefinedでない値
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil(NaN); // false

// nullとundefinedのみtrue
isNil(null); // true
isNil(undefined); // true
```

#### パラメータ

- `x` (`any`): `null` または `undefined` かどうかを確認する値です。

#### 戻り値

(`x is null | undefined`): 値が `null` または `undefined` の場合は `true`、そうでなければ `false` を返します。
