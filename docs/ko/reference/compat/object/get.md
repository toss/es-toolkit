# get (Lodash 호환성)

::: warning 점 표기법이나 대괄호 표기법을 사용하세요

이 `get` 함수는 복잡한 경로 파싱, `null`이나 `undefined` 처리, 기본값 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 점 표기법(`.`)이나 대괄호 표기법(`[]`) 또는 옵셔널 체이닝(`?.`)을 사용하세요.

:::

객체의 지정된 경로에 있는 값을 가져와요.

```typescript
const value = get(object, path, defaultValue);
```

## 사용법

### `get(object, path, defaultValue?)`

객체의 경로에서 값을 안전하게 가져올 때 `get`을 사용하세요. 경로가 존재하지 않거나 값이 `undefined`일 때는 기본값을 반환해요.

```typescript
import { get } from 'es-toolkit/compat';

// 점 표기법으로 중첩된 객체에 접근
const object = { a: { b: { c: 3 } } };
get(object, 'a.b.c');
// => 3

// 배열 표기법으로 접근
get(object, ['a', 'b', 'c']);
// => 3

// 존재하지 않는 경로에 기본값 제공
get(object, 'a.b.d', 'default');
// => 'default'

// 배열 인덱스를 포함한 경로
const arrayObject = { users: [{ name: 'john' }, { name: 'jane' }] };
get(arrayObject, 'users[0].name');
// => 'john'
```

`null`이나 `undefined` 객체에 안전하게 접근해요.

```typescript
import { get } from 'es-toolkit/compat';

get(null, 'a.b.c', 'default');
// => 'default'

get(undefined, ['a', 'b'], 'default');
// => 'default'
```

#### 파라미터

- `object` (`any`): 조회할 객체예요.
- `path` (`PropertyPath`): 가져올 속성의 경로예요. 문자열, 숫자, 심볼, 또는 배열로 나타낼 수 있어요.
- `defaultValue` (`any`, 선택): 값이 `undefined`일 때 반환할 기본값이에요.

#### 반환 값

(`any`): 해결된 값이나 기본값을 반환해요.
