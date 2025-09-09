# findLastKey

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`predicate`에 전달한 조건을 만족하는 마지막 요소의 키를 반환해요.

`findKey`는 앞에서부터 조건을 검사하는 반면, `findLastKey`는 뒤에서부터 조건을 검사해요.

## 인터페이스

```ts
function findLastKey<T>(
  obj: T | null | undefined,
  conditionToFind: (value: T[keyof T], key: string, obj: T) => unknown
): string | undefined;

function findLastKey<T>(obj: T | null | undefined, objectToFind: Partial<T[keyof T]>): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: [PropertyKey, any]): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: PropertyKey): string | undefined;

function findLastKey<T>(
  obj: T | null | undefined,
  predicate?:
    | ((value: T[keyof T], key: string, obj: T) => unknown)
    | PropertyKey
    | [PropertyKey, any]
    | Partial<T[keyof T]>
): string | undefined;
```

### 파라미터

- `obj` (`T`): 탐색할 객체예요.
- `predicate`: 다음 중 하나의 형태를 가질 수 있어요.
  - `(value, key, obj) => unknown`: 각각의 요소에 대해서 검사하는 함수를 실행해요. 처음으로 `true`를 반환하는 요소의 키를 반환해요.
  - `Partial<T[keyof T]>`: 주어진 객체와 부분적으로 일치하는 요소를 찾을 때 사용해요.
  - `[PropertyKey, any]`: 해당 프로퍼티와 값이 일치하는 요소의 키를 반환해요.
  - `PropertyKey`: 해당 프로퍼티에 대해서 참으로 평가되는 요소의 키를 반환해요.

### 반환 값

(`string | undefined`): 조건을 만족하는 마지막 요소의 키를 반환해요. 만족하는 키가 없으면 `undefined`를 반환해요.

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
