# invoke (Lodash 互換性)

::: warning 直接メソッドを呼び出してください

この `invoke` 関数はパス解析、オブジェクト探索、`get` 関数呼び出しなどの複雑な処理により遅く動作します。

代わりに、より高速で現代的な直接メソッド呼び出しを使用してください。

:::

オブジェクトのパスにあるメソッドを与えられた引数で呼び出します。

```typescript
const result = invoke(object, path, args);
```

## 使用法

### `invoke(object, path, args)`

オブジェクトの特定のパスにあるメソッドを引数と一緒に呼び出したい時に`invoke`を使用してください。パスはドット表記文字列やプロパティキー配列で指定できます。

```typescript
import { invoke } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// ドット表記でパス指定
invoke(object, 'a.b', [1, 2]);
// Returns: 3

// 配列でパス指定
invoke(object, ['a', 'b'], [1, 2]);
// Returns: 3

// 存在しないパス
invoke(object, 'a.c.d', [1, 2]);
// Returns: undefined

// 様々な型の引数
const obj = {
  calculate: {
    sum: function (...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    },
    multiply: function (a, b) {
      return a * b;
    },
  },
};

invoke(obj, 'calculate.sum', [1, 2, 3, 4]);
// Returns: 10

invoke(obj, ['calculate', 'multiply'], [5, 6]);
// Returns: 30
```

#### パラメータ

- `object` (`unknown`): メソッドを呼び出すオブジェクトです。
- `path` (`PropertyKey | PropertyKey[]`): 呼び出すメソッドのパスです。文字列、シンボル、数値やこれらの配列にできます。
- `args` (`any[]`): メソッドを呼び出す時に使用する引数配列です。

#### 戻り値

(`any`): 呼び出されたメソッドの結果を返します。メソッドが存在しなければ`undefined`を返します。
