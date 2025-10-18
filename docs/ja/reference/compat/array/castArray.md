# castArray（Lodash 互換性）

::: warning `Array.from()` または配列リテラル（`[value]`）を使用してください

この `castArray` 関数は引数なしの処理と `undefined` 処理などにより、複雑な動作をします。

より明確でモダンな `Array.from()` または条件付き配列作成（`Array.isArray(value) ? value : [value]`）を使用してください。

:::

値が配列でない場合、配列に変換して返します。

```typescript
const result = castArray(value);
```

## 参照

### `castArray(value?)`

任意の値を確実に配列にしたい場合は `castArray` を使用します。値がすでに配列の場合はそのまま返し、そうでない場合はその値を含む新しい配列を作成します。

```typescript
import { castArray } from 'es-toolkit/compat';

// 数値を配列に変換
castArray(1);
// 戻り値: [1]

// 文字列を配列に変換
castArray('hello');
// 戻り値: ['hello']

// オブジェクトを配列に変換
castArray({ a: 1 });
// 戻り値: [{ a: 1 }]
```

すでに配列である値はそのまま返されます。

```typescript
import { castArray } from 'es-toolkit/compat';

castArray([1, 2, 3]);
// 戻り値: [1, 2, 3]

castArray(['a', 'b']);
// 戻り値: ['a', 'b']
```

`null` と `undefined` も配列に変換されます。

```typescript
import { castArray } from 'es-toolkit/compat';

castArray(null);
// 戻り値: [null]

castArray(undefined);
// 戻り値: [undefined]
```

引数なしで呼び出すと、空の配列を返します。

```typescript
import { castArray } from 'es-toolkit/compat';

castArray();
// 戻り値: []
```

#### パラメータ

- `value` (`T | readonly T[]`、オプション): 配列に変換する値。引数が提供されない場合は、空の配列を返します。

#### 戻り値

(`T[]`): 入力がすでに配列の場合はその配列を、そうでない場合は入力値を含む新しい配列を返します。
