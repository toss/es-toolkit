# forOwnRight (Lodash 互換性)

::: warning `Object.keys` とループを使用してください
この `forOwnRight` 関数は、内部的に `keys` 関数を呼び出し、オブジェクト変換プロセスや逆順走査などにより遅く動作します。

代わりに、より速く、より現代的な `Object.keys` とループを使用してください。

:::

オブジェクトの固有プロパティのみを逆順で反復処理し、各プロパティに対して関数を呼び出します。

```typescript
const result = forOwnRight(obj, iteratee);
```

## 参照

### `forOwnRight(object, iteratee)`

オブジェクトの固有プロパティのみを逆順で反復処理し、`iteratee` 関数を呼び出します。継承されたプロパティや `Symbol` キーを除外し、オブジェクトが直接所有するプロパティのみを逆順で反復処理します。キーを配列に収集してから逆順で走査するため、通常の走査よりも遅くなります。`iteratee` 関数が `false` を返すと、反復処理が停止します。

```typescript
import { forOwnRight } from 'es-toolkit/compat';

// オブジェクトの固有プロパティのみを逆順で反復処理
const obj = { a: 1, b: 2 };
forOwnRight(obj, (value, key) => {
  console.log(key, value);
});
// 出力: 'b' 2, 'a' 1

// 継承されたプロパティを除外して逆順で反復処理
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forOwnRight(child, (value, key) => {
  console.log(key, value);
});
// 出力: 'own' 'ownValue', 'inherited' 'value' (protoProperty は除外)

// 条件に基づく早期終了
forOwnRight(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 'a' で停止
});
// 出力: 'b' 2, 'a' 1
```

`null` または `undefined` はそのまま返されます。

```typescript
import { forOwnRight } from 'es-toolkit/compat';

forOwnRight(null, iteratee); // null
forOwnRight(undefined, iteratee); // undefined
```

#### パラメータ

- `object` (`T | null | undefined`): 反復処理するオブジェクトです。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, オプション): 各プロパティに対して呼び出す関数です。デフォルトは `identity` 関数です。

#### 戻り値

(`T | null | undefined`): 元のオブジェクトを返します。
