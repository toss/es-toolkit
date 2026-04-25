# has (Lodash互換性)

::: warning `Object.hasOwn` または `in` 演算子を使用してください

この `has` 関数は、複雑なパス解析や配列インデックス処理により動作が遅くなります。

代わりに、より高速で現代的な `Object.hasOwn()` または `in` 演算子を使用してください。

:::

オブジェクトに指定されたパスのプロパティが存在するかどうかを確認します。

```typescript
const exists = has(object, path);
```

## 使用法

### `has(object, path)`

オブジェクトに特定のパスのプロパティがあるかどうかを確認したい場合は、`has` を使用してください。自身のプロパティ(own property)のみを確認し、継承されたプロパティは確認しません。

```typescript
import { has } from 'es-toolkit/compat';

// 単純なプロパティの確認
const object = { a: 1, b: 2 };
has(object, 'a');
// => true

// ネストされたオブジェクトの確認
const nested = { a: { b: { c: 3 } } };
has(nested, 'a.b.c');
// => true
has(nested, ['a', 'b', 'c']);
// => true

// 存在しないプロパティ
has(nested, 'a.b.d');
// => false

// 配列インデックスの確認
const array = [1, 2, 3];
has(array, 2);
// => true
has(array, 5);
// => false
```

疎配列(sparse array)でも正しく動作します。

```typescript
import { has } from 'es-toolkit/compat';

const sparse = [1, , 3]; // インデックス1が空
has(sparse, 0); // true
has(sparse, 1); // true - 実際には存在しますが、値はundefined
has(sparse, 2); // true
```

#### パラメータ

- `object` (`any`): 検査するオブジェクト。
- `path` (`PropertyPath`): 確認するプロパティのパス。文字列、数値、シンボル、または配列で表すことができます。

#### 戻り値

(`boolean`): パスのプロパティが存在する場合は `true`、そうでない場合は `false` を返します。
