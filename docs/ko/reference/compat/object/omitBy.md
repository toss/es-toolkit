# omitBy (Lodash 호환성)

::: warning `es-toolkit`의 `omitBy`를 사용하세요

이 `omitBy` 함수는 배열 유사 객체 체크, `iteratee` 변환, 키 변환 과정 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [omitBy](../../object/omitBy.md)를 사용하세요.

:::

조건 함수가 참을 반환하는 속성들을 제외한 새로운 객체를 만들어요.

```typescript
const result = omitBy(obj, predicate);
```

## 레퍼런스

### `omitBy(object, predicate)`

객체의 각 속성에 대해 조건 함수를 실행하고, 조건 함수가 참을 반환하는 속성들을 제외한 새로운 객체를 생성해요. 조건에 따라 동적으로 속성을 필터링할 때 유용해요.

```typescript
import { omitBy } from 'es-toolkit/compat';

// 특정 타입의 값 제거
const data = { a: 1, b: 'remove', c: 3, d: 'keep' };
const numbers = omitBy(data, (value) => typeof value === 'string');
// 결과: { a: 1, c: 3 }

// 조건에 따른 속성 제거
const user = { id: 1, name: 'John', age: 0, active: false, email: '' };
const validData = omitBy(user, (value) => !value);
// 결과: { id: 1, name: 'John' } (falsy 값들 제거)

// 키 이름으로 필터링
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = omitBy(settings, (value, key) => key.startsWith('admin'));
// 결과: { userSetting: true, debugMode: true }

// 숫자 속성만 제거
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const noNumbers = omitBy(mixed, (value) => typeof value === 'number');
// 결과: { str: 'hello', bool: true, obj: {} }

// 배열에서도 사용 가능
const arr = [1, 2, 3, 4, 5];
const filtered = omitBy(arr, (value) => value % 2 === 0);
// 결과: { '0': 1, '2': 3, '4': 5 } (짝수 인덱스의 홀수 값들)

// 객체와 키, 원본 객체 모두 활용
const scores = { math: 90, science: 75, english: 85, art: 60 };
const passingGrades = omitBy(scores, (value, key, obj) => {
  console.log(`${key}: ${value} (평균: ${Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length})`);
  return value < 80;
});
// 결과: { math: 90, english: 85 }
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { omitBy } from 'es-toolkit/compat';

omitBy(null, () => true); // {}
omitBy(undefined, () => true); // {}
```

#### 파라미터

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): 필터링할 원본 객체예요.
- `predicate` (`ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, 선택): 각 속성에 대해 실행할 조건 함수예요. 참을 반환하면 해당 속성이 제거돼요. 기본값은 `identity` 함수예요.

#### 반환 값

(`Record<string, S> | Record<number, S> | Partial<T>`): 조건에 맞지 않는 속성들로 구성된 새로운 객체를 반환해요.
