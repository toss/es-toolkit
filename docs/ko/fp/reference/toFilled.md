# toFilled (함수형 프로그래밍)

배열의 일부를 채운 복사본을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, toFilled(value, start, end));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`toFilled`](../../reference/array/toFilled.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`toFilled`는 파이프된 배열의 복사본에서 `start`부터 `end` 직전까지 `value`로 채워요. `Array.prototype.fill`의 인덱스 규칙을 따르고 입력 배열은 변경하지 않아요.

```typescript
import { pipe, toFilled } from 'es-toolkit/fp';

const array = [1, 2, 3, 4];

pipe(array, toFilled(0, 1, 3)); // => [1, 0, 0, 4]
array; // => [1, 2, 3, 4]
```

#### 파라미터

- `value` (`U`): 반환할 배열에 쓸 값이에요.
- `start` (`number, optional`): 시작 인덱스예요. 기본값은 `0`이에요.
- `end` (`number, optional`): 끝 인덱스예요. 기본값은 배열 길이예요.

#### 반환 값

(`(array: readonly T[]) => Array<T | U>`): `readonly T[]`를 일부가 채워진 복사본으로 변환하는 함수예요.
