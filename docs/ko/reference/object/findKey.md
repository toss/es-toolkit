# findKey

인자로 받은 함수를 만족하는 첫 번째 요소의 키를 반환해요.

## 인터페이스

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### 파라미터

- `obj` (`T extends Record<any, any>`): 탐색할 객체예요.
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): 객체의 각 값에 대해 실행할 함수예요.

### 반환 값

(`keyof T | undefined`): 인자로 받은 함수를 만족하는 첫 번째 요소의 키예요. 함수를 만족하는 요소가 없으면 undefined를 반환해요.

## 예시

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```

## Lodash와 호환성

`es-toolkit/compat`에서 `findKey`를 가져오면 lodash와 완전히 호환돼요.

키를 찾는 조건을 여러 방법으로 명시할 수 있어요.

- **검사 함수**: 각각의 요소에 대해서 검사하는 함수를 실행해요. 처음으로 `true`를 반환하는 요소의 키를 반환해요.
- **부분 객체**: 주어진 객체와 부분적으로 일치하는 요소의 키를 반환해요.
- **프로퍼티-값 쌍**: 해당 프로퍼티와 값이 일치하는 요소의 키를 반환해요.
- **프로퍼티 이름**: 해당 프로퍼티에 대해서 참으로 평가되는 요소의 키를 반환해요.

### 인터페이스

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  conditionToFind: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
function findKey<T extends Record<any, any>>(obj: T, objectToFind: Partial<T[keyof T]>): keyof T | undefined;
function findKey<T extends Record<any, any>>(obj: T, propertyToFind: [keyof T[keyof T], any]): keyof T | undefined;
function findKey<T extends Record<any, any>>(obj: T, propertyToFind: keyof T[keyof T]): keyof T | undefined;
```

### 예시

```typescript
const users = { barney: { age: 36 }, fred: { age: 40 } };

findKey(users, o => o.age < 40);
// => 'barney'
findKey(users, { age: 36 });
// => 'barney'
findKey(users, ['age', 36]);
// => 'barney'

const languages = { javascript: { active: false }, typescript: { active: true } };
findKey(users, 'active');
// => 'typescript'
```
