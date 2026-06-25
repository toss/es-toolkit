# unzip

함수형 파이프라인에서 사용할 수 있는 data-last `unzip` 연산자를 만들어요. [`pipe`](./pipe.md)와 함께 사용하세요.

```typescript
const result = pipe(array, unzip());
```

## 사용법

`unzip`는 `pipe`를 통해 흐르는 값을 받는 함수를 반환해요. 데이터는 `pipe`의 첫 번째 인자로 두고, 연산자 설정은 변환 단계 옆에 둘 수 있어요.

```typescript
import { pipe, unzip } from 'es-toolkit/fp';

const result = pipe(
  [
    [1, 'a'],
    [2, 'b'],
  ],
  unzip()
);
// [[1, 2], ['a', 'b']]
```

## API

### `unzip(...)`

반환값: A function that accepts the piped input.
