# bindKey

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`object[key]` メソッドの `this` を固定し、`partialArgs` で事前に引数を提供します。

Symbol 型の `bindKey.placeholder` を使用すると、事前に提供した引数が使用される位置を決定できます。

[`bind`](./bind.md) 関数とは異なり、固定された関数がまだ定義されていないか、再定義されたメソッドを参照することができます。

## インターフェース

```typescript
function bindKey<T extends Record<PropertyKey, any>, K extends keyof T>(
  object: T,
  key: K,
  ...partialArgs: any[]
): T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never;

namespace bindKey {
  placeholder: symbol;
}
```

### パラメータ

- `object` (`T`): `this` を固定し、メソッドを呼び出すオブジェクト。
- `key` (`K`): 固定するメソッドのキー。
- `partialArgs` (`any[]`): 事前に提供される引数。

### 戻り値

(`T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never`): `this`가 고정된 함수.

## 例

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

let bound = bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'

object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

bound('!');
// => 'hiya fred!'

// Bound with placeholders.
bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// => 'hiya fred!'
```
