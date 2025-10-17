# pickBy (Lodash 호환성)

::: warning `es-toolkit`의 `pickBy`를 사용하세요

이 `pickBy` 함수는 배열 유사 객체 체크, `iteratee` 변환, 키 변환 과정 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [pickBy](../../object/pickBy.md)를 사용하세요.

:::

조건 함수가 참을 반환하는 속성들만 선택해서 새로운 객체를 만들어요.

```typescript
const result = pickBy(obj, predicate);
```

## 레퍼런스

### `pickBy(object, predicate)`

객체의 각 속성에 대해 조건 함수를 실행하고, 조건 함수가 참을 반환하는 속성들만 포함한 새로운 객체를 생성해요. 조건에 따라 동적으로 속성을 선택할 때 유용해요.

```typescript
import { pickBy } from 'es-toolkit/compat';

// 특정 타입의 값만 선택
const data = { a: 1, b: 'keep', c: 3, d: 'select' };
const strings = pickBy(data, value => typeof value === 'string');
// 결과: { b: 'keep', d: 'select' }

// 조건에 따른 속성 선택
const user = { id: 1, name: 'John', age: 0, active: true, email: '' };
const validData = pickBy(user, value => Boolean(value));
// 결과: { id: 1, name: 'John', active: true } (참으로 평가되는 값들만)

// 키 이름으로 필터링
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = pickBy(settings, (value, key) => key.startsWith('user'));
// 결과: { userSetting: true }

// 숫자 속성만 선택
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const numbersOnly = pickBy(mixed, value => typeof value === 'number');
// 결과: { num1: 42, num2: 0 }

// 배열에서도 사용 가능
const arr = [1, 2, 3, 4, 5];
const evens = pickBy(arr, value => value % 2 === 0);
// 결과: { '1': 2, '3': 4 } (짝수 값들의 인덱스와 값)

// 객체와 키, 원본 객체 모두 활용
const scores = { math: 90, science: 75, english: 85, art: 60 };
const highScores = pickBy(scores, (value, key, obj) => {
  const average = Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length;
  return value > average;
});
// 결과: { math: 90, english: 85 }
```

조건 함수 없이 호출하면 참으로 평가되는 값들만 선택해요.

```typescript
import { pickBy } from 'es-toolkit/compat';

const data = { a: 1, b: '', c: 0, d: 'hello', e: null, f: true };
const truthyValues = pickBy(data);
// 결과: { a: 1, d: 'hello', f: true }
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { pickBy } from 'es-toolkit/compat';

pickBy(null, () => true); // {}
pickBy(undefined, () => true); // {}
```

#### 파라미터

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): 필터링할 원본 객체예요.
- `predicate` (`ValueKeyIterateeTypeGuard<T, S> | ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, 선택): 각 속성에 대해 실행할 조건 함수예요. 참을 반환하면 해당 속성이 선택돼요. 기본값은 `identity` 함수예요.

#### 반환 값

(`Record<string, S> | Record<number, S> | Partial<T>`): 조건에 맞는 속성들로 구성된 새로운 객체를 반환해요.
