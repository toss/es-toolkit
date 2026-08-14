# pickBy

조건 함수를 만족하는 속성들만 포함한 새로운 객체를 반환해요.

```typescript
const result = pickBy(obj, shouldPick);
```

## 사용법

### `pickBy(obj, shouldPick)`

조건 함수를 기반으로 객체의 속성들을 선택적으로 선택하고 싶을 때 `pickBy`를 사용하세요. 조건 함수가 `true`를 반환하는 속성들만 포함된 새로운 객체를 반환해요.

```typescript
import { pickBy } from 'es-toolkit/object';

// 문자열 값을 가진 속성들만 선택해요
const obj = { a: 1, b: 'select', c: 3, d: 'also select' };
const result = pickBy(obj, value => typeof value === 'string');
// result는 { b: 'select', d: 'also select' }이 돼요

// 짝수 값들만 선택해요
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const evens = pickBy(numbers, value => value % 2 === 0);
// evens는 { b: 2, d: 4 }가 돼요

// 키와 값을 모두 활용해요
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const admins = pickBy(data, (value, key) => key.startsWith('admin') && value > 25);
// admins는 { admin1: 30, admin2: 28 }이 돼요
```

#### 파라미터

- `obj` (`T extends Record<string, any>`): 속성들을 필터링할 객체예요.
- `shouldPick` (`(value: T[keyof T], key: keyof T) => boolean`): 속성을 선택할지 결정하는 조건 함수예요. 값과 키를 받아서 선택하려면 `true`, 제외하려면 `false`를 반환해요.

#### 반환 값

조건 함수를 만족하는 속성들만 포함한 새로운 객체를 반환해요. `obj`에 인덱스 시그니처가 있는지에 따라 반환 타입이 달라져요.

- `obj`에 **문자열이나 숫자 인덱스 시그니처**가 있는 경우 (예: `Record<string, number>`): `T`를 반환해요 — 이런 타입은 원래 어떤 키든 없을 수 있기 때문에, 결과를 원래 객체가 필요한 곳에 그대로 넘길 수 있어요.
- 그 외의 경우 (예: `{ a: number; b: string }`): `Partial<T>`를 반환해요 — 알려진 속성 중 어떤 것이든 제외됐을 수 있기 때문이에요.
