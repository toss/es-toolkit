# keyBy (Lodash 互換性)

::: warning `es-toolkit` の [keyBy](../../array/keyBy.md) を使用してください

この `keyBy` 関数は、`null` や `undefined` の処理、さまざまなパラメータ型の処理などにより動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [keyBy](../../array/keyBy.md) を使用してください。

:::

コレクションの要素を指定されたキーに基づいてオブジェクトに構成します。

```typescript
const result = keyBy(collection, iteratee);
```

## 参照

### `keyBy(collection, iteratee)`

配列またはオブジェクトの各要素を、指定されたキー生成関数またはプロパティ名を使用してオブジェクトに構成します。同じキーを持つ要素が複数ある場合は、最後の要素が使用されます。

```typescript
import { keyBy } from 'es-toolkit/compat';

// プロパティ名でキーを生成する
const array = [
  { dir: 'left', code: 97 },
  { dir: 'right', code: 100 },
];

keyBy(array, 'dir');
// => { left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } }

// 関数でキーを生成する
keyBy(array, o => String.fromCharCode(o.code));
// => { a: { dir: 'left', code: 97 }, d: { dir: 'right', code: 100 } }

// オブジェクトでも使用可能
const obj = {
  a: { id: 1, name: 'john' },
  b: { id: 2, name: 'jane' },
};
keyBy(obj, 'name');
// => { john: { id: 1, name: 'john' }, jane: { id: 2, name: 'jane' } }
```

`null` または `undefined` は空のオブジェクトとして扱われます。

```typescript
import { keyBy } from 'es-toolkit/compat';

keyBy(null, 'id'); // {}
keyBy(undefined, 'id'); // {}
```

#### パラメータ

- `collection` (`ArrayLike<T> | null | undefined`): キーで構成する配列またはオブジェクトです。
- `iteratee` (`ValueIterateeCustom<T, PropertyKey>`, オプション): キーを生成する関数またはプロパティ名です。省略すると、要素自体がキーとして使用されます。

#### 戻り値

(`Record<string, T>`): 各要素が生成されたキーにマッピングされた新しいオブジェクトを返します。
