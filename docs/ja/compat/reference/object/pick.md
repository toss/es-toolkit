# pick (Lodash 互換性)

::: warning `es-toolkit`の`pick`を使用してください

この `pick` 関数は、複雑なパス処理、`get`/`set`関数の呼び出し、`null`/`undefined`の処理により相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`pick`](../../object/pick.md)を使用してください。

:::

オブジェクトから指定したプロパティのみを選択して新しいオブジェクトを作成します。

```typescript
const result = pick(obj, ...keys);
```

## 使用法

### `pick(object, ...props)`

オブジェクトから必要なプロパティのみを選んで新しいオブジェクトを作りたい場合は`pick`を使用してください。配列で複数のキーを一度に渡すか、個別の引数として1つずつ渡すことができます。深いキーパスもサポートしているため、ネストされたプロパティも選択できます。

```typescript
import { pick } from 'es-toolkit/compat';

// 基本的な使用法
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// 結果: { a: 1, c: 3 }

// 個別の引数として渡す
const result2 = pick(obj, 'a', 'c');
// 結果: { a: 1, c: 3 }

// 深いパスを選択
const nested = {
  user: { profile: { name: 'John', age: 30 }, settings: { theme: 'dark' } },
  admin: true,
};
const userInfo = pick(nested, 'user.profile.name', 'admin');
// 結果: { user: { profile: { name: 'John' } }, admin: true }

// 配列と個別のキーを混在
const mixed = { a: 1, b: 2, c: 3, d: { e: 4, f: 5 } };
const selected = pick(mixed, ['a', 'b'], 'c', 'd.e');
// 結果: { a: 1, b: 2, c: 3, d: { e: 4 } }

// ドット表記キーと実際のドット付きキーを区別
const ambiguous = {
  'a.b': 1, // 実際のキー 'a.b'
  a: { b: 2, c: 3 }, // ネストされたオブジェクト
};
const dotKey = pick(ambiguous, 'a.b');
// 結果: { 'a.b': 1 } (実際のキーが優先)
```

`null`または`undefined`は空のオブジェクトとして処理されます。

```typescript
import { pick } from 'es-toolkit/compat';

pick(null, ['a', 'b']); // {}
pick(undefined, ['a', 'b']); // {}
```

#### パラメータ

- `object` (`T | null | undefined`): プロパティを選択するオブジェクトです。
- `...props` (`Array<Many<PropertyPath>>`): 選択するプロパティのキーです。単一のキー、キーの配列、または深いキーパスを指定できます。

#### 戻り値

(`Pick<T, U> | Partial<T>`): 指定されたプロパティのみを含む新しいオブジェクトを返します。
