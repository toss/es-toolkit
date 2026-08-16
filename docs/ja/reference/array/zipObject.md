# zipObject

キー配列と値配列を受け取って1つのオブジェクトを作成します。

```typescript
const object = zipObject(keys, values);
```

## 使用法

### `zipObject(keys, values)`

2つの配列を1つのオブジェクトに結合したい場合は `zipObject` を使用してください。最初の配列の要素がキーとなり、2番目の配列の要素が値となる新しいオブジェクトを返します。

```typescript
import { zipObject } from 'es-toolkit/array';

// キーと値をオブジェクトにします。
zipObject(['a', 'b', 'c'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3 }

// キーの方が多い場合、undefinedが値になります。
zipObject(['a', 'b', 'c', 'd'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3, d: undefined }
```

値配列の方が長い場合、余分な値は無視されます。

```typescript
import { zipObject } from 'es-toolkit/array';

zipObject(['a', 'b'], [1, 2, 3, 4]);
// Returns: { a: 1, b: 2 }
```

#### パラメータ

- `keys` (`readonly P[]`): オブジェクトのキーとなる配列です。
- `values` (`readonly V[]`): 各キーに対応する値の配列です。

#### 戻り値

(`Record<P, V>`): キーと値が結合された新しいオブジェクトを返します。
