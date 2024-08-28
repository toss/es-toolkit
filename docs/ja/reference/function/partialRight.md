# partialRight

引数を後ろから事前に提供した関数を作成します。

[partial](./partial.md)と動作が似ていますが、引数を後ろから提供するという違いがあります。

Symbol型の`partialRight.placeholder`を使用すると、事前に提供した引数が使用される位置を決定できます。

関数の`length`プロパティは設定しません。

## インターフェース

```typescript
function partialRight<F extends (...args: any[] => any)>(func: F, ...partialArgs: any[]): F;

namespace partialRight {
  placeholder: symbol;
}
```

### パラメータ

- `func` (`F`): 事前に引数を提供する関数。
- `partialArgs` (`any[]`, オプション): 事前に提供される引数。

### 戻り値

(`F`): 事前に引数が提供された関数。

## 例

```typescript
import { partialRight } from 'es-toolkit/function';

function greet(greeting, name) {
  return greeting + ' ' + name;
}

const greetFred = partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'

// プレースホルダーを使用して部分適用
const sayHelloTo = partialRight(greet, 'hello', partialRight.placeholder);
sayHelloTo('fred');
// => 'hello fred'
```
