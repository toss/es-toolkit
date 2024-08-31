# spread

配列の要素を元の関数の個別の引数として展開する新しい関数を作成します。

## インターフェース

```typescript
function spread<F extends (...args: any[]) => any>(func: F): (argsArr: Parameters<F>) => ReturnType<F>;
```

### パラメータ

- `func` (`F`): 引数の配列を受け取り、これらの引数で元の関数を呼び出した結果を返す新しい関数です。

### 戻り値

(`(args: Parameters<F>) => ReturnType<F>`): A new function that takes an array of arguments and returns the result of calling the original function with those arguments.

## 例

```typescript
import { spread } from 'es-toolkit/function';

const say = spread(function (who, what) {
  return who + ' says ' + what;
});

say(['fred', 'hello']);
// => 'fred says hello'
```

## Lodash 互換性

`es-toolkit/compat` から `chunk` をインポートすると、Lodash と互換になります。

- `spread` は追加の数値パラメータ `argsIndex` を受け付け、引数配列が前の引数の中で位置する場所を指定します。
  - `argsIndex` が負の値または `NaN` の場合、デフォルトで `0` になります。小数の場合は最も近い整数に丸められます。

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // Returns [1, 2]
spread(fn, NaN)([1, 2]); // Returns [1, 2]
spread(fn, 'a')([1, 2]); // Returns [1, 2]
spread(fn, 1.6)(1, [2, 3]); // Returns [1, 2, 3]
```
