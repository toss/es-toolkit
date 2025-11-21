# hasIn (Lodash 互換性)

::: warning `in` 演算子を使用してください

この `hasIn` 関数は、複雑なパス解析とプロトタイプチェーンのチェックにより動作が遅くなります。

代わりに、より高速でモダンな `in` 演算子または `Object.hasOwn()` 関数を使用してください。

:::

オブジェクトに指定されたパスのプロパティが存在するか、継承されたプロパティも含めて確認します。

```typescript
const exists = hasIn(object, path);
```

## 使用法

### `hasIn(object, path)`

オブジェクトに特定のパスのプロパティがあるか確認したい場合は `hasIn` を使用します。`has` とは異なり、継承されたプロパティ(プロトタイプチェーンのプロパティ)も一緒に確認します。

```typescript
import { hasIn } from 'es-toolkit/compat';

// 自身のプロパティを確認
const object = { a: 1, b: 2 };
hasIn(object, 'a');
// => true

// ネストされたオブジェクトを確認
const nested = { a: { b: { c: 3 } } };
hasIn(nested, 'a.b.c');
// => true
hasIn(nested, ['a', 'b', 'c']);
// => true

// 存在しないプロパティ
hasIn(nested, 'a.b.d');
// => false

// 配列のインデックスを確認
const array = [1, 2, 3];
hasIn(array, 2);
// => true
hasIn(array, 5);
// => false
```

継承されたプロパティも確認します。

```typescript
import { hasIn } from 'es-toolkit/compat';

// プロトタイプチェーンのプロパティを確認
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - 継承されたプロパティも見つかる
has(rect, 'area'); // false - has は自身のプロパティのみ確認
```

`null` や `undefined` を安全に処理します。

```typescript
import { hasIn } from 'es-toolkit/compat';

hasIn(null, 'a');
// => false

hasIn(undefined, 'b');
// => false
```

#### パラメータ

- `object` (`any`): 検査するオブジェクトです。
- `path` (`PropertyPath`): 確認するプロパティのパスです。文字列、数値、シンボル、または配列で表すことができます。

#### 戻り値

(`boolean`): パスのプロパティが存在する場合(自身のプロパティでも継承されたプロパティでも) `true`、そうでなければ `false` を返します。
