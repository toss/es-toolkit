# get (Lodash 互換性)

::: warning ドット表記法またはブラケット表記法を使用してください

この `get` 関数は、複雑なパス解析、`null` または `undefined` の処理、デフォルト値の処理により、動作が遅くなります。

代わりに、より高速で現代的なドット表記法 (`.`)、ブラケット表記法 (`[]`)、またはオプショナルチェイニング (`?.`) を使用してください。

:::

オブジェクトの指定されたパスにある値を取得します。

```typescript
const value = get(object, path, defaultValue);
```

## 使用法

### `get(object, path, defaultValue?)`

オブジェクトのパスから安全に値を取得するには `get` を使用してください。パスが存在しない場合や値が `undefined` の場合は、デフォルト値を返します。

```typescript
import { get } from 'es-toolkit/compat';

// ドット表記法でネストされたオブジェクトにアクセス
const object = { a: { b: { c: 3 } } };
get(object, 'a.b.c');
// => 3

// 配列表記法でアクセス
get(object, ['a', 'b', 'c']);
// => 3

// 存在しないパスにデフォルト値を提供
get(object, 'a.b.d', 'default');
// => 'default'

// 配列インデックスを含むパス
const arrayObject = { users: [{ name: 'john' }, { name: 'jane' }] };
get(arrayObject, 'users[0].name');
// => 'john'
```

`null` または `undefined` のオブジェクトに安全にアクセスします。

```typescript
import { get } from 'es-toolkit/compat';

get(null, 'a.b.c', 'default');
// => 'default'

get(undefined, ['a', 'b'], 'default');
// => 'default'
```

#### パラメータ

- `object` (`any`): 照会するオブジェクトです。
- `path` (`PropertyPath`): 取得するプロパティのパスです。文字列、数値、シンボル、または配列で表すことができます。
- `defaultValue` (`any`, オプション): 値が `undefined` のときに返すデフォルト値です。

#### 戻り値

(`any`): 解決された値またはデフォルト値を返します。
