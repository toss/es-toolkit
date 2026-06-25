# forEach (함수형 프로그래밍)

각 값에 콜백을 실행하고 입력 배열을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, forEach(callback));
```

::: info

이 헬퍼는 `es-toolkit/fp` 전용이에요. 이 동작을 [`pipe`](./pipe.md) 파이프라인의 한 단계로 조합하고 싶을 때 사용하세요.

:::

## 사용법

`forEach`는 파이프라인에서 부수 효과 단계를 넣고 싶을 때 유용해요. 각 값에 `callback`을 호출하고 원래 배열을 그대로 통과시켜요. [`pipe`](./pipe.md) 안에서는 인접한 지연 연산이 일찍 멈출 수 있을 때 지연 평가가 가능해요.

```typescript
import { forEach, pipe } from 'es-toolkit/fp';

const values: number[] = [];

pipe(
  [1, 2, 3],
  forEach(value => values.push(value))
); // => [1, 2, 3]
values; // => [1, 2, 3]
```

#### 파라미터

- `callback` (`(value: T, index: number) => void`): 각 값마다 실행할 함수예요.

#### 반환 값

(`(array: readonly T[]) => readonly T[]`): callback을 실행한 뒤 같은 배열을 반환하는 함수예요.
