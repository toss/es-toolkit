# add

입력에 숫자를 더하는, 데이터를 마지막에 받는 연산자를 만들어요.

```typescript
const result = pipe(value, add(addend));
```

## 사용법

`add`는 입력에 `addend`를 더하는 함수를 반환해요. 합성을 위해 설계됐어요. [`pipe`](/ko/fp/reference/pipe)를 따라 흐르는 값을 변환할 수도 있고, [`map`](/ko/fp/reference/map) 같은 연산자의 콜백으로 사용할 수도 있어요.

```typescript
import { add, map, pipe } from 'es-toolkit/fp';

// 파이프를 흐르는 값을 변환해요.
pipe(3, add(2)); // => 5

// map의 콜백으로 사용해요.
pipe([1, 2, 3], map(add(10))); // => [11, 12, 13]
```

#### 파라미터

- `addend` (`number`): 입력에 더할 숫자예요.

#### 반환 값

(`(value: number) => number`): `value`를 `value + addend`로 변환하는, 데이터를 마지막에 받는 연산자예요.
