# propertyOf (Lodash 互換性)

::: warning `get`関数を直接使用してください

この `propertyOf` 関数は内部的に `get` 関数を呼び出すラッパー関数で、追加の関数呼び出しオーバーヘッドが発生します。

代わりに、より高速で現代的な `get` 関数を直接使用するか、オプショナルチェーニング(`?.`)を使用してください。

:::

特定のオブジェクトから様々なパスの値を取得する関数を作成します。

```typescript
const getter = propertyOf(obj);
```

## 使用法

### `propertyOf(object)`

1つのオブジェクトから複数のパスの値を取得する関数を作りたい場合は`propertyOf`を使用してください。`property`とは逆に、オブジェクトを先に固定し、様々なパスをクエリできます。

```typescript
import { propertyOf } from 'es-toolkit/compat';

// 基本的な使用法
const data = { name: 'John', age: 30, city: 'New York' };
const getValue = propertyOf(data);

const name = getValue('name');
// 結果: 'John'

const age = getValue('age');
// 結果: 30

// 深いパスへのアクセス
const complexData = {
  user: { profile: { name: 'Alice', age: 25 } },
  settings: { theme: 'dark', lang: 'en' },
};
const getComplexValue = propertyOf(complexData);

const userName = getComplexValue('user.profile.name');
// 結果: 'Alice'

const theme = getComplexValue('settings.theme');
// 結果: 'dark'

// 配列パスを使用
const arrayPath = getComplexValue(['user', 'profile', 'age']);
// 結果: 25

// 複数のパスを配列で処理
const paths = ['user.profile.name', 'settings.theme', 'settings.lang'];
const values = paths.map(getComplexValue);
// 結果: ['Alice', 'dark', 'en'] (各パスの値)

// 配列インデックスアクセス
const arrayData = [10, 20, 30];
const getArrayValue = propertyOf(arrayData);
const firstItem = getArrayValue(0);
// 結果: 10

const secondItem = getArrayValue('[1]');
// 結果: 20
```

パスが存在しない場合は`undefined`を返します。

```typescript
import { propertyOf } from 'es-toolkit/compat';

const data = { a: 1, b: 2 };
const getValue = propertyOf(data);
const missing = getValue('nonexistent.path');
// 結果: undefined
```

#### パラメータ

- `object` (`T`): 値を取得する対象のオブジェクトです。

#### 戻り値

(`(path: PropertyPath) => any`): 与えられたパスでオブジェクトの値を返す関数を返します。
