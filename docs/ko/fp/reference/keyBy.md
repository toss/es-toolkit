# keyBy

함수형 파이프라인에서 사용할 수 있는 data-last `keyBy` 연산자를 만들어요. [`pipe`](./pipe.md)와 함께 사용하세요.

```typescript
const result = pipe(
  array,
  keyBy(item => item.id)
);
```

## 사용법

`keyBy`는 `pipe`를 통해 흐르는 값을 받는 함수를 반환해요. 데이터는 `pipe`의 첫 번째 인자로 두고, 연산자 설정은 변환 단계 옆에 둘 수 있어요.

```typescript
import { keyBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
  ],
  keyBy(item => item.id)
);
// { a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } }
```

## API

### `keyBy(...)`

반환값: A function that accepts the piped input.
