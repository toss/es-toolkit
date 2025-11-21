# keysIn (Lodash 互換性)

::: warning `for...in` ループまたは `Object.keys` を使用してください

この `keysIn` 関数は、配列のようなオブジェクトの処理やプロトタイプチェーンの走査などの複雑なロジックにより、動作が遅くなります。

代わりに、より高速で現代的な `for...in` ループまたは必要に応じて `Object.keys()` を使用してください。

:::

オブジェクトのすべての列挙可能なプロパティ名を継承されたプロパティも含めて配列で返します。

```typescript
const allKeys = keysIn(object);
```

## 使用法

### `keysIn(object)`

オブジェクトのすべてのプロパティ名を継承されたプロパティも含めて取得したい場合は `keysIn` を使用してください。`keys` とは異なり、プロトタイプチェーンのプロパティも一緒に返します。

```typescript
import { keysIn } from 'es-toolkit/compat';

// 基本オブジェクトのキー
const object = { a: 1, b: 2 };
keysIn(object);
// => ['a', 'b']

// 配列のインデックス
const array = [1, 2, 3];
keysIn(array);
// => ['0', '1', '2']

// 文字列のインデックス
keysIn('hello');
// => ['0', '1', '2', '3', '4']
```

継承されたプロパティも含まれます。

```typescript
import { keysIn } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keysIn(new Foo());
// => ['a', 'b', 'c'] (プロトタイプのプロパティ 'c' も含む)

// constructor は除外されます
class MyClass {
  constructor() {
    this.prop = 1;
  }
  method() {}
}
MyClass.prototype.inherited = 2;

keysIn(new MyClass());
// => ['prop', 'method', 'inherited'] (constructor は除外される)
```

配列のようなオブジェクトを特別に処理します。

```typescript
import { keysIn } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keysIn(typedArray);
// => ['0', '1', '2'] (buffer、byteLength などは除外)

// arguments オブジェクト
function example() {
  return keysIn(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

`null` または `undefined` を安全に処理します。

```typescript
import { keysIn } from 'es-toolkit/compat';

keysIn(null);
// => []

keysIn(undefined);
// => []
```

#### パラメータ

- `object` (`any`): キーを取得するオブジェクトです。

#### 戻り値

(`string[]`): オブジェクトのすべての列挙可能なプロパティ名(自身のプロパティと継承されたプロパティの両方を含む)の配列を返します。
