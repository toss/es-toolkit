# keys (Lodash 互換性)

::: warning `Object.keys`を使用してください

この `keys` 関数は、配列風オブジェクトの処理、プロトタイプオブジェクトの処理などの複雑なロジックにより、動作が遅くなります。

代わりに、より高速で現代的な `Object.keys()` を使用してください。

:::

オブジェクト自身の列挙可能なプロパティ名を配列として返します。

```typescript
const keyArray = keys(object);
```

## 参照

### `keys(object)`

オブジェクト自身のプロパティ名を取得したい場合は `keys` を使用します。継承されたプロパティは含まず、自身のプロパティのみを返します。

```typescript
import { keys } from 'es-toolkit/compat';

// 基本オブジェクトのキー
const object = { a: 1, b: 2, c: 3 };
keys(object);
// => ['a', 'b', 'c']

// 配列のインデックス
const array = [1, 2, 3];
keys(array);
// => ['0', '1', '2']

// 文字列のインデックス
keys('hello');
// => ['0', '1', '2', '3', '4']
```

関数やコンストラクタから継承されたプロパティは除外されます。

```typescript
import { keys } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keys(new Foo());
// => ['a', 'b'] ('c'はプロトタイプのプロパティなので除外されます)
```

配列風オブジェクトは特別に処理されます。

```typescript
import { keys } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keys(typedArray);
// => ['0', '1', '2']

// arguments オブジェクト
function example() {
  return keys(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

`null` や `undefined` を安全に処理します。

```typescript
import { keys } from 'es-toolkit/compat';

keys(null);
// => []

keys(undefined);
// => []
```

#### パラメータ

- `object` (`any`): キーを取得するオブジェクトです。

#### 戻り値

(`string[]`): オブジェクト自身の列挙可能なプロパティ名の配列を返します。
