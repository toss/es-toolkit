# toArray (Lodash 互換性)

::: warning Object.valuesとArray.fromを使用してください

この`toArray`関数は複雑な型検証と様々な入力処理により遅く動作します。

代わりにより高速で現代的なObject.valuesやArray.fromを使用してください。

:::

値を配列に変換します。

```typescript
const array = toArray(value);
```

## 使用法

### `toArray(value)`

様々な値を配列に変換します。オブジェクトは値の配列に、配列のようなオブジェクトは配列に、その他は空の配列に変換します。

```typescript
import { toArray } from 'es-toolkit/compat';

// オブジェクトを値の配列に変換
toArray({ a: 1, b: 2 });
// Returns: [1, 2]

// 文字列を文字配列に変換
toArray('abc');
// Returns: ['a', 'b', 'c']

// Mapを値の配列に変換
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
toArray(map);
// Returns: [['a', 1], ['b', 2]]
```

nullやundefinedは空の配列に変換します。

```typescript
import { toArray } from 'es-toolkit/compat';

toArray(null);
// Returns: []

toArray(undefined);
// Returns: []
```

#### パラメータ

- `value` (`unknown`): 配列に変換する値です。

#### 戻り値

(`any[]`): 変換された配列を返します。
