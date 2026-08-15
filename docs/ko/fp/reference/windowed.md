# windowed (함수형 프로그래밍)

배열에서 슬라이딩 윈도우를 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, windowed(size, step, options));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`windowed`](../../reference/array/windowed.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`windowed`는 길이가 `size`인 하위 배열을 반환하고, 매번 `step`만큼 앞으로 이동해요. 전체 윈도우만 반환하는 형태는 [`pipe`](./pipe.md) 안에서 지연 평가가 가능해요.

```typescript
import { pipe, windowed } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], windowed(2)); // => [[1, 2], [2, 3], [3, 4]]

pipe([1, 2, 3, 4], windowed(2, 2)); // => [[1, 2], [3, 4]]
```

#### 파라미터

- `size` (`number`): 각 윈도우의 길이예요.
- `step` (`number, optional`): 윈도우 사이에서 이동할 칸 수예요. 기본값은 `1`이에요.
- `options` (`WindowedOptions, optional`): 끝의 부분 윈도우를 포함할지 같은 옵션이에요.

#### 반환 값

(`(array: readonly T[]) => T[][]`): `readonly T[]`를 슬라이딩 윈도우 배열로 변환하는 함수예요.

#### 에러

`size`나 `step`이 양의 정수가 아니면 에러를 던져요.
