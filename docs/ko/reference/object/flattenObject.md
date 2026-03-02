# flattenObject

중첩된 객체를 평탄한 객체로 변환해요.

```typescript
const flattened = flattenObject(object, options?);
```

## 사용법

### `flattenObject(object, options?)`

깊이 중첩된 객체나 배열을 점(`.`) 표기법을 사용한 키로 평탄화하고 싶을 때 `flattenObject`를 사용하세요. 각 중첩된 속성이 구분자로 연결된 키를 가진 단일 레벨 객체가 돼요.

```typescript
import { flattenObject } from 'es-toolkit/object';

// 중첩된 객체를 평탄화
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

// 사용자 정의 구분자 사용
const withCustomDelimiter = flattenObject(nestedObject, { delimiter: '/' });
console.log(withCustomDelimiter);
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3,
//   'e': 'simple'
// }
```

다음과 같이 설정 객체를 평탄화할 때 유용하게 사용할 수 있어요.

```typescript
// 설정 객체 평탄화
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

`options.delimiter` 옵션을 사용하면 점(`.`)이 아니라 언더스코어(`_`) 같은 커스텀 문자로 객체를 평탄화할 수 있어요.

```typescript
// 언더스코어로 연결된 환경 변수 스타일로
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

빈 객체와 특수한 경우들도 적절히 처리해요.

```typescript
// 빈 객체나 배열
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
// 빈 객체나 빈 배열은 키로 나타나요
```

#### 파라미터

- `object` (`object`): 평탄화할 객체예요.
- `options` (`FlattenObjectOptions`, 선택): 평탄화 옵션이에요.
  - `delimiter` (`string`, 선택): 중첩된 키를 연결할 구분자예요. 기본값은 `'.'`예요.

#### 반환 값

(`Record<string, any>`): 모든 중첩된 속성이 평탄화된 새 객체예요.
