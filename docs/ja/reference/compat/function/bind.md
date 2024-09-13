# bind

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

関数の `this` を固定し、`partialArgs` で事前に引数を提供します。

Symbol 型の `bind.placeholder` を使用すると、事前に提供した引数が使用される位置を決定できます。

組み込みの `Function#bind` とは異なり、関数の `length` プロパティは設定しません。

## インターフェース

```typescript
function bind<F extends Function>(func: F, thisObj?: unknown, ...partialArgs: any[]): F;

namespace bind {
  placeholder: symbol;
}
```

### パラメータ

- `func` (`F`): `this` を固定する関数。
- `thisObj` (`any`, オプション): 関数に固定される `this` オブジェクト。
- `partialArgs` (`any[]`): 事前に与えられる引数。

### 戻り値

(`F`): `this` が固定された関数。

## 例

```typescript
import { bind } from 'es-toolkit/compat';

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: 'fred' };

let bound = bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// プレースホルダーを使用してバインド
bound = bind(greet, object, bind.placeholder, '!');
bound('hi');
// => 'hi fred!'
```
