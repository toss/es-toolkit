# flattenObject

Converts a nested object into a flat object.

```typescript
const flattened = flattenObject(object, options?);
```

## Usage

### `flattenObject(object, options?)`

Use `flattenObject` when you want to flatten deeply nested objects or arrays using dot (`.`) notation for keys. Each nested property becomes a single-level object with keys connected by a delimiter.

```typescript
import { flattenObject } from 'es-toolkit/object';

// Flatten a nested object
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

// Use a custom delimiter
const withCustomDelimiter = flattenObject(nestedObject, { delimiter: '/' });
console.log(withCustomDelimiter);
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3,
//   'e': 'simple'
// }
```

It's useful for flattening configuration objects like this:

```typescript
// Flatten a configuration object
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

Using `options.delimiter`, you can flatten the object with custom characters like underscores (`_`) instead of dots (`.`).

```typescript
// Environment variable style with underscores
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

Empty objects and special cases are handled appropriately.

```typescript
// Empty objects or arrays
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
// Empty objects and empty arrays don't appear as keys
```

#### Parameters

- `object` (`object`): The object to flatten.
- `options` (`FlattenObjectOptions`, optional): Flattening options.
  - `delimiter` (`string`, optional): The delimiter to connect nested keys. Defaults to `'.'`.

#### Returns

(`Record<string, any>`): A new object with all nested properties flattened.
