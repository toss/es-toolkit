# toDefaulted (Lodash 互換性)

::: warning スプレッド演算子または `Object.assign` を使用してください

この `toDefaulted` 関数は深いクローンと複雑なデフォルト値処理により遅く動作します。

代わりに、より高速で現代的なスプレッド演算子(`...`)または `Object.assign()` を使用してください。

:::

オブジェクトにデフォルト値を適用した新しいオブジェクトを作成します。

```typescript
const defaulted = toDefaulted(object, ...sources);
```

## 使用法

### `toDefaulted(object, ...sources)`

対象オブジェクトに1つ以上のソースオブジェクトからデフォルト値を適用した新しいオブジェクトを作成したい場合は、`toDefaulted` を使用してください。`undefined` であるプロパティまたは `Object.prototype` から継承されるプロパティにのみデフォルト値が設定されます。

```typescript
import { toDefaulted } from 'es-toolkit/compat';

// 基本的なデフォルト値の設定
const user = { name: 'John' };
const defaults = { name: 'Anonymous', age: 25, role: 'user' };
toDefaulted(user, defaults);
// => { name: 'John', age: 25, role: 'user' }

// 複数のソースからデフォルト値を適用
const config = { theme: 'dark' };
const defaults1 = { theme: 'light', lang: 'en' };
const defaults2 = { lang: 'ko', region: 'Asia' };
toDefaulted(config, defaults1, defaults2);
// => { theme: 'dark', lang: 'en', region: 'Asia' }
```

`undefined` 値のみがデフォルト値で置き換えられ、`null` 値は維持されます。

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const data = {
  name: undefined,
  age: null,
  active: false,
};
const defaults = {
  name: 'Default',
  age: 18,
  active: true,
  role: 'user',
};

toDefaulted(data, defaults);
// => { name: 'Default', age: null, active: false, role: 'user' }
```

元のオブジェクトは変更されず、新しいオブジェクトが返されます。

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const original = { a: 1 };
const result = toDefaulted(original, { a: 2, b: 3 });

console.log(original); // { a: 1 } (変更されない)
console.log(result); // { a: 1, b: 3 } (新しいオブジェクト)
```

#### パラメータ

- `object` (`object`): デフォルト値を受け取る対象オブジェクト。
- `sources` (`object[]`): デフォルト値を提供するソースオブジェクト。左から右の順序で適用されます。

#### 戻り値

(`object`): デフォルト値が適用された新しいオブジェクトを返します。
