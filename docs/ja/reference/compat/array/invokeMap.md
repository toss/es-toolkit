# invokeMap (Lodash 互換性)

::: warning `Array.map` と `Object.values(...).map` を使用してください

この `invokeMap` 関数は、`null` や `undefined` の処理、メソッド検索などにより動作が遅くなります。

代わりに、より高速で現代的な `Array.map` と `Object.values(...).map` を使用してください。

例えば、`invokeMap([1, 2, 3], 'toString')` は `[1, 2, 3].map(x => x.toString())` のように書けます。

:::

配列またはオブジェクトの各要素で指定されたメソッドを呼び出し、結果の配列を返します。

```typescript
const result = invokeMap(collection, method, ...args);
```

## 参照

### `invokeMap(collection, method, ...args)`

配列またはオブジェクトの各要素で指定されたメソッドを呼び出します。メソッド名を文字列として渡すか、関数を直接渡すことができます。追加の引数は各メソッド呼び出しに渡されます。

```typescript
import { invokeMap } from 'es-toolkit/compat';

// 配列の各要素でメソッドを呼び出す
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[5, 1, 7].sort(), [3, 2, 1].sort()]
// => [[1, 5, 7], [1, 2, 3]]

// 引数を使用してメソッドを呼び出す
invokeMap([123, 456], 'toString', 2);
// => [(123).toString(2), (456).toString(2)]
// => ['1111011', '111001000']

// 関数を直接渡す
invokeMap(['a', 'b', 'c'], String.prototype.toUpperCase);
// => [String.prototype.toUpperCase('a'), String.prototype.toUpperCase('b'), String.prototype.toUpperCase('c')]
// => ['A', 'B', 'C']
```

オブジェクトの場合、各値でメソッドを呼び出します。

```typescript
import { invokeMap } from 'es-toolkit/compat';

const obj = { a: 1.1, b: 2.2, c: 3.3 };
invokeMap(obj, 'toFixed', 1);
// => ['1.1', '2.2', '3.3']
```

`null` または `undefined` は空の配列として扱われます。

```typescript
import { invokeMap } from 'es-toolkit/compat';

invokeMap(null, 'toString'); // []
invokeMap(undefined, 'toString'); // []
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): メソッドを呼び出す配列またはオブジェクトです。
- `method` (`string | ((...args: any[]) => R)`): 呼び出すメソッド名または関数です。
- `...args` (`any[]`): 各メソッド呼び出しに渡す追加の引数です。

#### 戻り値

(`Array<R | undefined>`): 各メソッド呼び出しの結果を含む新しい配列を返します。
