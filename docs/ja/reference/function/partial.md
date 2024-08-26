# partial

引数を前もって提供した関数を作成します。

[bind](../compat/function/bind.md)と動作が似ていますが、`this`を固定しないという違いがあります。

Symbol型の`partial.placeholder`を使用すると、前もって提供した引数が使用される位置を決定できます。

関数の`length`プロパティは設定しません。

## インターフェース

```typescript
function partial<F extends (...args: any[]) => any>(func: F, ...partialArgs: any[]): F;

namespace partial {
  placeholder: symbol;
}
```

### パラメータ

- `func` (`F`): 前もって引数を提供する関数。
- `partialArgs` (`any[]`, オプション): 前もって提供される引数。

### 戻り値

(`F`): 前もって引数が提供された関数。

## 例

```typescript
import { partial } from 'es-toolkit/function';

function greet(greeting, name) {
  return greeting + ' ' + name;
}

const sayHelloTo = partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'

// プレースホルダーを使用して部分適用
const greetFred = partial(greet, partial.placeholder, 'fred');
greetFred('hi');
// => 'hi fred'
```
