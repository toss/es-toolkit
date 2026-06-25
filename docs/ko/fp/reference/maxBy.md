# maxBy

함수형 파이프라인에서 사용할 수 있는 data-last `maxBy` 연산자를 만들어요. [`pipe`](./pipe.md)와 함께 사용하세요.

```typescript
const result = pipe(
  array,
  maxBy(item => item.score)
);
```

## 사용법

`maxBy`는 `pipe`를 통해 흐르는 값을 받는 함수를 반환해요. 데이터는 `pipe`의 첫 번째 인자로 두고, 연산자 설정은 변환 단계 옆에 둘 수 있어요.

```typescript
import { maxBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ score: 1 }, { score: 3 }, { score: 2 }],
  maxBy(item => item.score)
);
// { score: 3 }
```

## API

### `maxBy(...)`

반환값: A function that accepts the piped input.
