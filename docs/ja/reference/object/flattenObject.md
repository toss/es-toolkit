# flattenObject

ネストされたオブジェクトをフラットなオブジェクトに変換します。

```typescript
const flattened = flattenObject(object, options?);
```

## 使用法

### `flattenObject(object, options?)`

深くネストされたオブジェクトや配列をドット(`.`)記法を使用したキーでフラット化したい時に`flattenObject`を使用してください。各ネストされたプロパティが区切り文字で連結されたキーを持つ単一レベルのオブジェクトになります。

```typescript
import { flattenObject } from 'es-toolkit/object';

// ネストされたオブジェクトをフラット化
const nestedObject = {
  a: {
    b: {
      c: 1,
    },
  },
  d: [2, 3],
  e: 'simple',
};

const flattened = flattenObject(nestedObject);
console.log(flattened);
// {
//   'a.b.c': 1,
//   'd.0': 2,
//   'd.1': 3,
//   'e': 'simple'
// }

// カスタム区切り文字を使用
const withCustomDelimiter = flattenObject(nestedObject, { delimiter: '/' });
console.log(withCustomDelimiter);
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3,
//   'e': 'simple'
// }
```

次のように設定オブジェクトをフラット化する時に便利に使用できます。

```typescript
// 設定オブジェクトをフラット化
const config = {
  database: {
    host: 'localhost',
    port: 5432,
    credentials: {
      username: 'admin',
      password: 'secret',
    },
  },
  features: ['auth', 'logging'],
  debug: true,
};

const flatConfig = flattenObject(config);
console.log(flatConfig);
// {
//   'database.host': 'localhost',
//   'database.port': 5432,
//   'database.credentials.username': 'admin',
//   'database.credentials.password': 'secret',
//   'features.0': 'auth',
//   'features.1': 'logging',
//   'debug': true
// }
```

`options.delimiter`オプションを使用すると、ドット(`.`)ではなくアンダースコア(`_`)のようなカスタム文字でオブジェクトをフラット化できます。

```typescript
// アンダースコアで連結された環境変数スタイルに
const envStyle = flattenObject(config, { delimiter: '_' });
console.log(envStyle);
// {
//   'database_host': 'localhost',
//   'database_port': 5432,
//   'database_credentials_username': 'admin',
//   'database_credentials_password': 'secret',
//   'features_0': 'auth',
//   'features_1': 'logging',
//   'debug': true
// }
```

空のオブジェクトと特殊なケースも適切に処理します。

```typescript
// 空のオブジェクトや配列
const emptyCase = {
  empty: {},
  emptyArray: [],
  nullValue: null,
  undefinedValue: undefined,
};

const result = flattenObject(emptyCase);
console.log(result);
// {
//   'empty': {},
//   'emptyArray: [],
//   'nullValue': null,
//   'undefinedValue': undefined
// }
// 空のオブジェクトや空の配列もキーとして表示されます
```

#### パラメータ

- `object` (`object`): フラット化するオブジェクトです。
- `options` (`FlattenObjectOptions`, 選択): フラット化オプションです。
  - `delimiter` (`string`, 選択): ネストされたキーを連結する区切り文字です。デフォルトは`'.'`です。

#### 戻り値

(`Record<string, any>`): すべてのネストされたプロパティがフラット化された新しいオブジェクトです。
