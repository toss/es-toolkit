# omit (Lodash 호환성)

::: warning `es-toolkit`의 `omit`를 사용하세요

이 `omit` 함수는 깊은 복사와 `unset` 함수 호출 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [omit](../../object/omit.md)를 사용하세요.

:::

객체에서 지정된 키들을 제외한 새로운 객체를 만들어요.

```typescript
const result = omit(obj, ...keys);
```

## 사용법

### `omit(object, ...paths)`

객체에서 지정된 키들을 제외한 새로운 객체를 생성해요. 깊은 키 경로도 지원하며, 배열로 여러 키를 한 번에 지정할 수도 있어요. 객체에서 민감한 정보를 제거하거나 필요한 속성만 선택할 때 유용해요.

```typescript
import { omit } from 'es-toolkit/compat';

// 기본 키 제거
const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const publicUser = omit(user, 'password', 'email');
// 결과: { id: 1, name: 'John' }

// 배열로 여러 키 제거
const data = { a: 1, b: 2, c: 3, d: 4 };
const filtered = omit(data, ['a', 'c']);
// 결과: { b: 2, d: 4 }

// 깊은 키 경로 제거
const nested = {
  user: { profile: { name: 'John', age: 30 }, settings: { theme: 'dark' } },
  admin: true,
};
const result = omit(nested, 'user.profile.age', 'admin');
// 결과: { user: { profile: { name: 'John' }, settings: { theme: 'dark' } } }

// 중첩된 배열과 키 조합
const complex = { a: 1, b: 2, c: 3, d: { e: 4, f: 5 } };
const simplified = omit(complex, 'a', ['b', 'c'], 'd.f');
// 결과: { d: { e: 4 } }
```

배열이나 문자열, 키 경로를 자유롭게 조합할 수 있어요.

```typescript
import { omit } from 'es-toolkit/compat';

const config = {
  api: { url: 'https://api.example.com', key: 'secret', timeout: 5000 },
  ui: { theme: 'dark', language: 'en' },
  debug: true,
};

// 여러 방식으로 키 지정
const cleaned = omit(config, 'api.key', ['debug'], 'ui.language');
// 결과: { api: { url: 'https://api.example.com', timeout: 5000 }, ui: { theme: 'dark' } }
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { omit } from 'es-toolkit/compat';

omit(null, 'key'); // {}
omit(undefined, 'key'); // {}
```

#### 파라미터

- `object` (`T | null | undefined`): 키를 제거할 원본 객체예요.
- `...paths` (`Array<Many<PropertyKey>>`): 제거할 키들이에요. 단일 키, 키 배열, 또는 깊은 키 경로를 지정할 수 있어요.

#### 반환 값

(`Partial<T>`): 지정된 키들이 제거된 새로운 객체를 반환해요.
