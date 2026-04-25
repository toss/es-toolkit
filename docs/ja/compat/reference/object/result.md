# result (Lodash 互換性)

::: warning `get` 関数またはオプショナルチェイニングを使用してください

この `result` 関数は複雑なパス処理と関数呼び出しロジックにより動作が遅くなります。

代わりに、より高速で現代的な `get` 関数またはオプショナルチェイニング(`?.`)を使用してください。

:::

オブジェクトのパスから値を取得しますが、関数に遭遇した場合は呼び出して結果を返します。

```typescript
const result = result(obj, path, defaultValue);
```

## 使用法

### `result(object, path, defaultValue)`

オブジェクトのパスから値を取得し、パス上の関数を自動的に呼び出したい場合は `result` を使用してください。`get` 関数と似ていますが、遭遇した関数を実行し、最終値も関数であれば呼び出して結果を返します。

```typescript
import { result } from 'es-toolkit/compat';

// 基本的な使用法(通常の値)
const obj = { a: { b: { c: 3 } } };
const value = result(obj, 'a.b.c');
// 結果: 3

// 自動関数呼び出し
const objWithFunc = {
  compute: () => ({ value: 42 }),
  getValue: function () {
    return this.compute().value;
  },
};
const computed = result(objWithFunc, 'getValue');
// 結果: 42 (getValue 関数が呼び出される)

// パス上の関数呼び出し
const nested = {
  data: () => ({ user: { getName: () => 'John' } }),
};
const name = result(nested, 'data.user.getName');
// 結果: 'John' (data() と getName() の両方が呼び出される)

// デフォルト値の使用
const incomplete = { a: { b: null } };
const withDefault = result(incomplete, 'a.b.c', 'default value');
// 結果: 'default value'

// デフォルト値が関数の場合
const withFuncDefault = result(incomplete, 'a.b.c', () => 'computed default');
// 結果: 'computed default' (デフォルト値の関数が呼び出される)

// 配列パスの使用
const arrayPath = result(objWithFunc, ['getValue']);
// 結果: 42

// 動的デフォルト値
const dynamic = result(incomplete, 'missing.path', function () {
  return `Generated at ${new Date().toISOString()}`;
});
// 結果: 現在時刻を含む文字列
```

関数呼び出し時に `this` コンテキストが保持されます。

```typescript
import { result } from 'es-toolkit/compat';

const calculator = {
  multiplier: 2,
  compute: function () {
    return 10 * this.multiplier;
  },
};

const calculatedValue = result(calculator, 'compute');
// 結果: 20 (this.multiplier が正しく参照される)
```

#### パラメータ

- `object` (`any`): クエリを実行するオブジェクトです。
- `path` (`PropertyPath`): 取得するプロパティのパスです。文字列、配列、またはキーの配列を指定できます。
- `defaultValue` (`R | ((...args: any[]) => R)`, オプション): 値が `undefined` の場合に返すデフォルト値です。関数の場合は呼び出して結果を返します。

#### 戻り値

(`R`): 解決された値を返します。パス上の関数が呼び出され、最終値も関数であれば呼び出した結果を返します。
