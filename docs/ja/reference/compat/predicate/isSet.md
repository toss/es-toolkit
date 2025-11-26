# isSet (Lodash 互換性)

::: warning `es-toolkit`の [isSet](../../predicate/isSet.md)を使用してください

この `isSet` 関数はLodash互換性のための関数ですが、メインライブラリと同じ実装です。

代わりにより高速で現代的な `es-toolkit` の [isSet](../../predicate/isSet.md) を使用してください。

:::

値がSetかどうかを確認します。

```typescript
const result = isSet(value);
```

## 使用法

### `isSet(value)`

値がSetかどうかを型安全に確認したい場合に `isSet` を使用してください。TypeScript で型ガードとしても動作します。

```typescript
import { isSet } from 'es-toolkit/compat';

// Set確認
const set = new Set();
isSet(set); // true

// その他の型はfalse
isSet(new Map()); // false
isSet(new WeakSet()); // false
isSet([]); // false
isSet({}); // false
isSet('set'); // false
isSet(123); // false
isSet(null); // false
isSet(undefined); // false
```

Setと似た他のコレクションとも区別します。

```typescript
import { isSet } from 'es-toolkit/compat';

// Set vs Map vs WeakSet
isSet(new Set([1, 2, 3])); // true
isSet(new Map([['key', 'value']])); // false
isSet(new WeakSet()); // false

// Set vs 配列
isSet(new Set([1, 2, 3])); // true
isSet([1, 2, 3]); // false

// Set vs 一般オブジェクト
isSet(new Set()); // true
isSet({}); // false
isSet(Object.create(null)); // false
```

#### パラメータ

- `value` (`unknown`): Setかどうかを確認する値です。

#### 戻り値

(`boolean`): 値がSetの場合は `true`、そうでなければ `false` を返します。
