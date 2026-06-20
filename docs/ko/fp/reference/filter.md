# filter

테스트를 통과한 요소만 남기는, 데이터를 마지막에 받는 연산자를 만들어요. `Array.prototype.filter`와 같아요.

```typescript
const result = pipe(array, filter(predicate));
```

## 사용법

`filter`는 `predicate`가 참 같은(truthy) 값을 반환하는 요소만 남겨요. 타입 술어(type predicate)를 사용하면 결과의 요소 타입이 좁혀져요. **지연 평가가 가능해요**. [`pipe`](/ko/fp/reference/pipe) 안에서는 인접한 지연 연산자들과 합쳐져요.

```typescript
import { filter, pipe } from 'es-toolkit/fp';

// 짝수만 남겨요.
pipe(
  [1, 2, 3, 4],
  filter(x => x % 2 === 0)
); // => [2, 4]

// 인덱스는 두 번째 인자로 받을 수 있어요.
pipe(
  [10, 20, 30, 40],
  filter((_value, index) => index % 2 === 0)
); // => [10, 30]
```

타입 가드(type guard)를 사용하면 결과 타입이 좁혀져요.

```typescript
import { filter, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 'a', 2, 'b'],
  filter((x): x is string => typeof x === 'string')
);
// result는 string[] 타입이고 ['a', 'b']와 같아요.
```

#### 파라미터

- `predicate` (`(value: T, index: number, array: readonly T[]) => boolean`): 각 요소마다 호출되는 함수예요. 요소를 남기려면 `true`를 반환하세요. 타입 가드(`value is S`)를 사용하면 결과가 좁혀져요. 지연 평가가 진행되는 동안, `array`에는 지금까지 본 요소들만 들어 있어요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 걸러낸 배열로 변환하는, 데이터를 마지막에 받는 연산자예요. 타입 가드를 사용하면 결과는 `S[]`예요.
