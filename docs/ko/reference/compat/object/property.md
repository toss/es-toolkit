# property (Lodash 호환성)

::: warning `get` 함수를 직접 사용하세요

이 `property` 함수는 내부적으로 `get` 함수를 호출하는 래퍼 함수로, 추가적인 함수 호출 오버헤드가 발생해요.

대신 더 빠르고 현대적인 `get` 함수를 직접 사용하거나 옵셔널 체이닝(`?.`)을 사용하세요.

:::

지정된 경로의 값을 가져오는 함수를 생성해요.

```typescript
const getter = property(path);
```

## 레퍼런스

### `property(path)`

특정 경로에서 값을 가져오는 함수를 만들고 싶을 때 `property`를 사용하세요. 생성된 함수를 여러 객체에 재사용할 수 있어 배열 메서드와 함께 사용하기 편해요.

```typescript
import { property } from 'es-toolkit/compat';

// 기본 사용법
const getName = property('name');
const user = { name: 'John', age: 30 };
const result = getName(user);
// 결과: 'John'

// 깊은 경로 접근
const getNestedValue = property('user.profile.name');
const data = { user: { profile: { name: 'Alice', age: 25 } } };
const nestedResult = getNestedValue(data);
// 결과: 'Alice'

// 배열 경로 사용
const getByArray = property(['user', 'profile', 'name']);
const arrayResult = getByArray(data);
// 결과: 'Alice'

// 배열 메서드와 함께 사용
const users = [
  { user: { profile: { name: 'John' } } },
  { user: { profile: { name: 'Jane' } } },
  { user: { profile: { name: 'Bob' } } },
];
const names = users.map(property('user.profile.name'));
// 결과: ['John', 'Jane', 'Bob']

// 배열 인덱스 접근
const getFirstItem = property('[0]');
const items = ['first', 'second', 'third'];
const firstItem = getFirstItem(items);
// 결과: 'first'

// 숫자 키 접근
const getIndex = property(1);
const arr = ['a', 'b', 'c'];
const secondItem = getIndex(arr);
// 결과: 'b'
```

경로가 존재하지 않으면 `undefined`를 반환해요.

```typescript
import { property } from 'es-toolkit/compat';

const getMissing = property('nonexistent.path');
const result = getMissing({ some: 'data' });
// 결과: undefined
```

#### 파라미터

- `path` (`PropertyPath`): 값을 가져올 경로예요. 문자열, 숫자, 심볼, 또는 이들의 배열이 될 수 있어요.

#### 반환 값

(`(object: T) => R`): 주어진 객체에서 지정된 경로의 값을 반환하는 함수를 반환해요.
