# property (Lodash 互換性)

::: warning `get`関数を直接使用してください

この `property` 関数は内部的に `get` 関数を呼び出すラッパー関数で、追加の関数呼び出しオーバーヘッドが発生します。

代わりに、より高速で現代的な `get` 関数を直接使用するか、オプショナルチェーニング(`?.`)を使用してください。

:::

指定されたパスの値を取得する関数を作成します。

```typescript
const getter = property(path);
```

## 参照

### `property(path)`

特定のパスから値を取得する関数を作成したい場合は`property`を使用してください。作成された関数は複数のオブジェクトで再利用でき、配列メソッドと一緒に使用するのに便利です。

```typescript
import { property } from 'es-toolkit/compat';

// 基本的な使用法
const getName = property('name');
const user = { name: 'John', age: 30 };
const result = getName(user);
// 結果: 'John'

// 深いパスへのアクセス
const getNestedValue = property('user.profile.name');
const data = { user: { profile: { name: 'Alice', age: 25 } } };
const nestedResult = getNestedValue(data);
// 結果: 'Alice'

// 配列パスを使用
const getByArray = property(['user', 'profile', 'name']);
const arrayResult = getByArray(data);
// 結果: 'Alice'

// 配列メソッドと一緒に使用
const users = [
  { user: { profile: { name: 'John' } } },
  { user: { profile: { name: 'Jane' } } },
  { user: { profile: { name: 'Bob' } } }
];
const names = users.map(property('user.profile.name'));
// 結果: ['John', 'Jane', 'Bob']

// 配列インデックスアクセス
const getFirstItem = property('[0]');
const items = ['first', 'second', 'third'];
const firstItem = getFirstItem(items);
// 結果: 'first'

// 数値キーアクセス
const getIndex = property(1);
const arr = ['a', 'b', 'c'];
const secondItem = getIndex(arr);
// 結果: 'b'
```

パスが存在しない場合は`undefined`を返します。

```typescript
import { property } from 'es-toolkit/compat';

const getMissing = property('nonexistent.path');
const result = getMissing({ some: 'data' });
// 結果: undefined
```

#### パラメータ

- `path` (`PropertyPath`): 値を取得するパスです。文字列、数値、シンボル、またはこれらの配列を指定できます。

#### 戻り値

(`(object: T) => R`): 与えられたオブジェクトから指定されたパスの値を返す関数を返します。
