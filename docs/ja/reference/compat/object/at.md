# at (Lodash 互換性)

::: warning 分割代入を使用してください

この `at` 関数は、複雑なパス処理とさまざまな引数型の処理により相対的に遅くなります。

代わりに、分割代入または直接プロパティアクセスを使用してください。

:::

オブジェクトの指定されたパスの値を配列として返します。

```typescript
const result = at(object, ...paths);
```

## 使用法

### `at(object, ...paths)`

オブジェクトから複数のパスの値を一度に取得したい場合は、`at`を使用してください。各パスに対応する値を配列として返します。

```typescript
import { at } from 'es-toolkit/compat';

// 基本的な使用法
const object = { a: 1, b: 2, c: 3 };
const result = at(object, 'a', 'c');
// Returns: [1, 3]

// ネストされたオブジェクト
const nested = {
  a: {
    b: {
      c: 4,
    },
  },
  x: [1, 2, 3],
};
const result2 = at(nested, 'a.b.c', 'x[1]');
// Returns: [4, 2]

// パスを配列として渡す
const paths = ['a', 'c'];
const result3 = at(object, paths);
// Returns: [1, 3]

// 存在しないパス
const result4 = at(object, 'nonexistent', 'a');
// Returns: [undefined, 1]
```

`null` または `undefined` オブジェクトは、`undefined` の配列を返します。

```typescript
import { at } from 'es-toolkit/compat';

at(null, 'a', 'b'); // [undefined, undefined]
at(undefined, 'a', 'b'); // [undefined, undefined]
```

#### パラメータ

- `object` (`T | null | undefined`): 値を取得するオブジェクトです。
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): 取得する値のパスです。個別の引数として渡すか、配列として渡すことができます。

#### 戻り値

(`unknown[]`): 指定されたパスに対応する値の配列を返します。
