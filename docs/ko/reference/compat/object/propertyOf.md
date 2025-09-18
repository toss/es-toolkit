# propertyOf (Lodash 호환성)

::: warning `get` 함수를 직접 사용하세요

이 `propertyOf` 함수는 내부적으로 `get` 함수를 호출하는 래퍼 함수로, 추가적인 함수 호출 오버헤드가 발생해요.

대신 더 빠르고 현대적인 `get` 함수를 직접 사용하거나 옵셔널 체이닝(`?.`)을 사용하세요.

:::

특정 객체에서 다양한 경로의 값을 가져오는 함수를 생성해요.

```typescript
const getter = propertyOf(obj);
```

## 레퍼런스

### `propertyOf(object)`

하나의 객체에서 여러 경로의 값을 가져오는 함수를 만들고 싶을 때 `propertyOf`를 사용하세요. `property`와 반대로, 객체를 먼저 고정하고 다양한 경로를 쿼리할 수 있어요.

```typescript
import { propertyOf } from 'es-toolkit/compat';

// 기본 사용법
const data = { name: 'John', age: 30, city: 'New York' };
const getValue = propertyOf(data);

const name = getValue('name');
// 결과: 'John'

const age = getValue('age');
// 결과: 30

// 깊은 경로 접근
const complexData = {
  user: { profile: { name: 'Alice', age: 25 } },
  settings: { theme: 'dark', lang: 'en' }
};
const getComplexValue = propertyOf(complexData);

const userName = getComplexValue('user.profile.name');
// 결과: 'Alice'

const theme = getComplexValue('settings.theme');
// 결과: 'dark'

// 배열 경로 사용
const arrayPath = getComplexValue(['user', 'profile', 'age']);
// 결과: 25

// 여러 경로를 배열로 처리
const paths = ['user.profile.name', 'settings.theme', 'settings.lang'];
const values = paths.map(getValue);
// 결과: ['Alice', 'dark', 'en'] (각 경로의 값들)

// 배열 인덱스 접근
const arrayData = [10, 20, 30];
const getArrayValue = propertyOf(arrayData);
const firstItem = getArrayValue(0);
// 결과: 10

const secondItem = getArrayValue('[1]');
// 결과: 20
```

경로가 존재하지 않으면 `undefined`를 반환해요.

```typescript
import { propertyOf } from 'es-toolkit/compat';

const data = { a: 1, b: 2 };
const getValue = propertyOf(data);
const missing = getValue('nonexistent.path');
// 결과: undefined
```

#### 파라미터

- `object` (`T`): 값을 가져올 대상 객체예요.

#### 반환 값

(`(path: PropertyPath) => any`): 주어진 경로에서 객체의 값을 반환하는 함수를 반환해요.
