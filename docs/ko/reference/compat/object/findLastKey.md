# findLastKey

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`predicate`에 전달한 조건을 만족하는 **마지막 요소의 키**를 반환해요.

`findKey`와 거의 같지만, **뒤에서부터** 조건을 검사한다는 점이 달라요.

## 인터페이스

```ts
function findLastKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, objectToFind: Partial<T[keyof T]>): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, propertyToFind: [keyof T[keyof T], any]): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, propertyToFind: keyof T[keyof T]): keyof T | undefined;
```

### 파라미터

- `obj` (`T`): 탐색할 객체예요.
- `predicate`: 다음 중 하나의 형태를 가질 수 있어요.
  - `(value, key, obj) => boolean`: 각 요소를 검사할 함수.
  - `Partial<T[keyof T]>`: 부분 객체와 일치하는 요소를 찾을 때 사용해요.
  - `[key, value]`: 특정 프로퍼티와 값이 일치하는 요소를 찾을 때 사용해요.
  - `key`: 해당 프로퍼티가 truthy한 요소를 찾을 때 사용해요.

### 반환 값

(`keyof T | undefined`): 조건을 만족하는 **마지막 요소의 키**를 반환해요. 만족하는 키가 없으면 `undefined`를 반환해요.

## 예시

```ts
import { findLastKey } from 'es-toolkit/compat';

const users = {
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
  pebbles: { age: 1, active: true },
};

// predicate 함수
findLastKey(users, o => o.age < 40);
// => 'pebbles'

// 부분 객체 매칭
findLastKey(users, { active: true });
// => 'pebbles'

// 프로퍼티-값 쌍
findLastKey(users, ['active', false]);
// => 'fred'

// 프로퍼티명 (truthy 평가)
findLastKey(users, 'active');
// => 'pebbles'
```
