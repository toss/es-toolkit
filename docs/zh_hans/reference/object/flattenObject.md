# flattenObject

将嵌套对象转换为扁平对象。

```typescript
const flattened = flattenObject(object, options?);
```

## 用法

### `flattenObject(object, options?)`

当您想要使用点(`.`)表示法将深层嵌套的对象或数组扁平化时,请使用 `flattenObject`。每个嵌套属性都将成为一个单层对象,其键由分隔符连接。

```typescript
import { flattenObject } from 'es-toolkit/object';

// 扁平化嵌套对象
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

// 使用自定义分隔符
const withCustomDelimiter = flattenObject(nestedObject, { delimiter: '/' });
console.log(withCustomDelimiter);
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3,
//   'e': 'simple'
// }
```

在扁平化配置对象时非常有用。

```typescript
// 扁平化配置对象
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

使用 `options.delimiter` 选项可以用下划线(`_`)等自定义字符而不是点(`.`)来扁平化对象。

```typescript
// 环境变量风格的下划线连接
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

也能适当处理空对象和特殊情况。

```typescript
// 空对象或数组
const emptyCase = {
  empty: {},
  emptyArray: [],
  nullValue: null,
  undefinedValue: undefined,
};

const result = flattenObject(emptyCase);
console.log(result);
// {
//   'nullValue': null,
//   'undefinedValue': undefined
// }
// 空对象或空数组不会显示为键
```

#### 参数

- `object` (`object`): 要扁平化的对象。
- `options` (`FlattenObjectOptions`, 可选): 扁平化选项。
  - `delimiter` (`string`, 可选): 用于连接嵌套键的分隔符。默认为 `'.'`。

#### 返回值

(`Record<string, any>`): 所有嵌套属性都已扁平化的新对象。
