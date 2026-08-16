# forInRight (Lodash 互換性)

::: warning `Object.keys` と `for...in` ループを使用してください

この `forInRight` 関数は、キー配列の生成、逆順の走査、`null` や `undefined` の処理などにより、パフォーマンスが遅くなります。

代わりに、より高速で現代的な `Object.keys` と `for...in` ループを使用してください。

:::

オブジェクトのすべてのプロパティ(継承されたプロパティを含む)を逆順で反復し、各プロパティに対して関数を呼び出します。

```typescript
const result = forInRight(obj, iteratee);
```

## 使用法

### `forInRight(object, iteratee)`

オブジェクトのすべてのプロパティを逆順で反復し、`iteratee` 関数を呼び出します。オブジェクトの固有プロパティだけでなく、プロトタイプチェーンを通じて継承されたプロパティも反復します。キーを配列に収集してから逆順で走査するため、通常の反復よりも遅くなります。`iteratee` 関数が `false` を返すと、反復を停止します。

```typescript
import { forInRight } from 'es-toolkit/compat';

// すべてのプロパティを逆順で反復
const obj = { a: 1, b: 2 };
forInRight(obj, (value, key) => {
  console.log(key, value);
});
// 出力: 'b' 2, 'a' 1

// 継承されたプロパティも含めて逆順で反復
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forInRight(child, (value, key) => {
  console.log(key, value);
});
// 出力: 'protoProperty' 'proto', 'own' 'ownValue', 'inherited' 'value'

// 条件に基づく早期終了
forInRight(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 'a' で停止
});
// 出力: 'b' 2, 'a' 1
```

`null` または `undefined` はそのまま返されます。

```typescript
import { forInRight } from 'es-toolkit/compat';

forInRight(null, iteratee); // null
forInRight(undefined, iteratee); // undefined
```

#### パラメータ

- `object` (`T | null | undefined`): 反復するオブジェクト。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, オプション): 各プロパティに対して呼び出す関数。デフォルトは `identity` 関数です。

#### 戻り値

(`T | null | undefined`): 元のオブジェクトを返します。
