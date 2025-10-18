# forIn (Lodash 互換性)

::: warning `Object.keys` と `for...in` ループを使用してください

この `forIn` 関数は、`null` や `undefined` の処理、デフォルトの `iteratee` 設定などにより、動作が遅くなります。

代わりに、より高速で現代的な `Object.keys` と `for...in` ループを使用してください。

:::

オブジェクトのすべてのプロパティ(継承されたプロパティを含む)を反復処理し、各プロパティに対して関数を呼び出します。

```typescript
const result = forIn(obj, iteratee);
```

## 参照

### `forIn(object, iteratee)`

オブジェクトのすべてのプロパティを反復処理し、`iteratee` 関数を呼び出します。オブジェクトの固有プロパティだけでなく、プロトタイプチェーンを通じて継承されたプロパティもすべて反復処理します。`iteratee` 関数が `false` を返すと、反復処理を停止します。

```typescript
import { forIn } from 'es-toolkit/compat';

// オブジェクトのすべてのプロパティを反復処理
const obj = { a: 1, b: 2 };
forIn(obj, (value, key) => {
  console.log(key, value);
});
// 出力: 'a' 1, 'b' 2

// 継承されたプロパティも含めて反復処理
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forIn(child, (value, key) => {
  console.log(key, value);
});
// 出力: 'inherited' 'value', 'own' 'ownValue', 'protoProperty' 'proto'

// 条件による早期終了
forIn(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 'a' の後で停止
});
// 出力: 'a' 1
```

`null` または `undefined` はそのまま返されます。

```typescript
import { forIn } from 'es-toolkit/compat';

forIn(null, iteratee); // null
forIn(undefined, iteratee); // undefined
```

#### パラメータ

- `object` (`T | null | undefined`): 反復処理するオブジェクトです。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, オプション): 各プロパティに対して呼び出す関数です。デフォルトは `identity` 関数です。

#### 戻り値

(`T | null | undefined`): 元のオブジェクトを返します。
