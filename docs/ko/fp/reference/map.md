# map

배열의 모든 요소를 변환하는, 데이터를 마지막에 받는 연산자를 만들어요. `Array.prototype.map`과 같아요.

```typescript
const result = pipe(array, map(callbackfn));
```

## 사용법

`map`은 각 요소에 `callbackfn`을 호출해서 새로운 배열을 만들어요. **지연 평가가 가능해요**. [`pipe`](/ko/fp/reference/pipe) 안에서는 인접한 지연 연산자들과 합쳐지기 때문에, 뒤에 오는 `take`가 작업을 일찍 멈출 수 있어요.

```typescript
import { map, pipe } from 'es-toolkit/fp';

// 각 요소를 변환해요.
pipe(
  [1, 2, 3],
  map(x => x * 2)
); // => [2, 4, 6]

// 인덱스는 두 번째 인자로 받을 수 있어요.
pipe(
  [10, 20, 30],
  map((value, index) => value + index)
); // => [10, 21, 32]

// 요소의 타입이 바뀔 수 있어요.
pipe(
  [1, 2, 3],
  map(x => `#${x}`)
); // => ['#1', '#2', '#3']
```

#### 파라미터

- `callbackfn` (`(value: T, index: number, array: readonly T[]) => U`): 각 요소마다 호출되는 함수예요. 반환 값이 출력 배열의 해당 요소가 돼요. 지연 평가가 진행되는 동안, `array`에는 지금까지 본 요소들만 들어 있어요.

#### 반환 값

(`(array: readonly T[]) => U[]`): `readonly T[]`를 새로운 `U[]`로 변환하는, 데이터를 마지막에 받는 연산자예요.
