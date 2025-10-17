# values (Lodash 互換性)

::: warning `Object.values` を使用してください

この `values` 関数は単に `Object.values` を呼び出すだけで、不必要なオーバーヘッドがあります。

代わりに、より高速で現代的な `Object.values()` を直接使用してください。

:::

オブジェクトの自身の列挙可能なプロパティ値の配列を返します。

```typescript
const valueArray = values(obj);
```

## 参照

### `values(obj)`

オブジェクトのすべてのプロパティ値を配列として取得したい場合に `values` を使用してください。`Object.values` と同じように動作しますが、`null` または `undefined` を安全に処理します。

```typescript
import { values } from 'es-toolkit/compat';

// オブジェクトの値を取得
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]

// 数値キーを持つオブジェクト
const numberKeyObj = { 0: 'a', 1: 'b', 2: 'c' };
values(numberKeyObj); // => ['a', 'b', 'c']
```

配列や配列風のオブジェクトも処理できます。

```typescript
import { values } from 'es-toolkit/compat';

// 配列
values([1, 2, 3]); // => [1, 2, 3]

// 文字列（配列風のオブジェクト）
values('hello'); // => ['h', 'e', 'l', 'l', 'o']
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { values } from 'es-toolkit/compat';

values(null); // => []
values(undefined); // => []
```

列挙可能なプロパティのみが返されます。

```typescript
import { values } from 'es-toolkit/compat';

const obj = Object.create(
  { inherited: 'not included' },
  {
    own: { value: 'included', enumerable: true },
    nonEnum: { value: 'not included', enumerable: false }
  }
);

values(obj); // => ['included']
```

#### パラメータ

- `obj` (`Record<PropertyKey, T> | ArrayLike<T> | null | undefined`): プロパティ値を取得するオブジェクトです。

#### 戻り値

(`T[]`): オブジェクトの列挙可能なプロパティ値の配列を返します。
