# forOwn (Lodash 互換性)

::: warning 代わりに `Object.keys` とループを使用してください

この `forOwn` 関数は、内部的に `keys` 関数を呼び出し、オブジェクト変換プロセス、`null` や `undefined` の処理などにより、動作が遅くなります。

代わりに、より高速でモダンな `Object.keys` とループを使用してください。

:::

オブジェクトの固有プロパティのみを反復し、各プロパティに対して関数を呼び出します。

```typescript
const result = forOwn(obj, iteratee);
```

## 使用法

### `forOwn(object, iteratee)`

オブジェクトの固有プロパティのみを反復し、`iteratee` 関数を呼び出します。継承されたプロパティや `Symbol` キーを除外し、オブジェクトが直接所有しているプロパティのみを反復します。`iteratee` 関数が `false` を返すと、反復を中断します。

```typescript
import { forOwn } from 'es-toolkit/compat';

// オブジェクトの固有プロパティのみを反復
const obj = { a: 1, b: 2 };
forOwn(obj, (value, key) => {
  console.log(key, value);
});
// 出力: 'a' 1, 'b' 2

// 継承されたプロパティは除外
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forOwn(child, (value, key) => {
  console.log(key, value);
});
// 出力: 'inherited' 'value', 'own' 'ownValue' (protoProperty は除外)

// 条件に応じた早期終了
forOwn(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 'a' の後で中断
});
// 出力: 'a' 1
```

`null` や `undefined` はそのまま返されます。

```typescript
import { forOwn } from 'es-toolkit/compat';

forOwn(null, iteratee); // null
forOwn(undefined, iteratee); // undefined
```

#### パラメータ

- `object` (`T | null | undefined`): 反復するオブジェクトです。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, オプション): 各プロパティに対して呼び出す関数です。デフォルト値は `identity` 関数です。

#### 戻り値

(`T | null | undefined`): 元のオブジェクトを返します。
