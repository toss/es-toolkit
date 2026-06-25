# add (함수형 프로그래밍)

입력에 숫자를 더하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(value, add(addend));
```

## 사용법

`add`는 입력에 `addend`를 더하는 함수를 반환해요. 합성을 위해 설계됐어요. [`pipe`](./pipe.md)를 통해 흐르는 값을 변환할 수도 있고, [`map`](./map.md) 같은 함수의 콜백으로 쓸 수도 있어요.

```typescript
import { add, map, pipe } from 'es-toolkit/fp';

// 파이프로 전달된 값을 변환해요.
pipe(3, add(2)); // => 5

// map 콜백으로 사용해요.
pipe([1, 2, 3], map(add(10))); // => [11, 12, 13]
```

#### 파라미터

- `addend` (`number`): 입력에 더할 숫자예요.

#### 반환 값

(`(value: number) => number`): `value`를 `value + addend`로 변환하는 함수예요.
