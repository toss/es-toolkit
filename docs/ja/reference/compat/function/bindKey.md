# bindKey (Lodash 互換性)

::: warning アロー関数や `bind` メソッドを使用してください
この `bindKey` 関数は、動的メソッドバインディングとプレースホルダー処理により、複雑で遅く動作します。JavaScriptのネイティブ `bind` メソッドやアロー関数を使用すると、よりシンプルでパフォーマンスが向上します。

代わりに、より高速で現代的なアロー関数や `Function.prototype.bind` を使用してください。
:::

オブジェクトのメソッドをバインドしながら、後で再定義される可能性のあるメソッドを参照できるようにします。

```typescript
const bound = bindKey(object, key, ...partialArgs);
```

## 使用法

### `bindKey(object, key, ...partialArgs)`

オブジェクトのメソッドをバインドしながら、メソッドが後で変更される可能性を残したい場合は `bindKey` を使用してください。通常の `bind` とは異なり、メソッドを呼び出すたびに最新のメソッドを参照します。

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// メソッドをバインドします。
let bound = bindKey(object, 'greet', 'hi');
bound('!');
// 戻り値: 'hi fred!'

// メソッドを再定義します。
object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

// バインドされた関数が新しいメソッドを呼び出します。
bound('!');
// 戻り値: 'hiya fred!'
```

プレースホルダーを使用して引数の位置を予約できます。

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// プレースホルダーを使用します。
const bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// 戻り値: 'hi fred!'
```

部分適用された引数が最初に渡され、その後に呼び出し時に渡された引数が追加されます。

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  add: function (a, b, c) {
    return a + b + c;
  },
};

// 最初の引数を事前に設定します。
const bound = bindKey(object, 'add', 10);
bound(20, 30);
// 戻り値: 60 (10 + 20 + 30)
```

#### パラメータ

- `object` (`object`): メソッドを呼び出すオブジェクトです。
- `key` (`string`): 呼び出すメソッドのキーです。
- `...partialArgs` (`any[]`, オプション): メソッドに事前に渡す引数です。`bindKey.placeholder` を使用して引数の位置を予約できます。

#### 戻り値

(`(...args: any[]) => any`): バインドされた新しい関数を返します。この関数は呼び出されるたびにオブジェクトの最新のメソッドを参照します。
