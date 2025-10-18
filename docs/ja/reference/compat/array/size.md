# size（Lodash 互換性）

::: warning `.length` プロパティを使用してください

この `size` 関数は、`null`、`undefined` の処理と様々な型のサポートにより、複雑に動作します。

より高速でモダンな `.length` プロパティまたは `Object.keys().length` を使用してください。

:::

配列、文字列、オブジェクトのサイズを返します。

```typescript
const length = size(collection);
```

## 参照

### `size(collection)`

配列、文字列、オブジェクト、Map、Set のサイズを確認する場合は `size` を使用します。様々な型のコレクションに対して一貫したサイズ情報を提供します。

```typescript
import { size } from 'es-toolkit/compat';

// 配列の要素数
size([1, 2, 3]);
// 3を返します

// 文字列の文字数
size('hello');
// 5を返します

// オブジェクトの列挙可能なプロパティ数
size({ a: 1, b: 2, c: 3 });
// 3を返します

// Map の要素数
size(
  new Map([
    ['a', 1],
    ['b', 2],
  ])
);
// 2を返します

// Set の要素数
size(new Set([1, 2, 3]));
// 3を返します
```

`null` や `undefined` は 0 を返します。

```typescript
import { size } from 'es-toolkit/compat';

size(null); // 0
size(undefined); // 0
size({}); // 0
size([]); // 0
```

#### パラメータ

- `collection` (`object | string | null | undefined`): サイズを確認する配列、文字列、オブジェクト、Map、Set。

#### 戻り値

(`number`)：コレクションのサイズを返します。`null` や `undefined` の場合は 0 を返します。
