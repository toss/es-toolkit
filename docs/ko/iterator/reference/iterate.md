# iterate (`Iterator`용)

시드 값에 함수를 반복해서 적용하며 무한한 지연 평가 이터레이터를 만들어요.

```typescript
const sequence = iterate(seed, getNext);
```

## 사용법

### `iterate(seed, getNext)`

각 값이 이전 값에서 파생되는 시퀀스를 만들 때 `iterate`를 사용하세요. 거듭제곱, 이어지는 날짜, 재시도 지연 시간 같은 것들이요. 시퀀스는 `seed`로 시작해서 `getNext(seed)`, `getNext(getNext(seed))` 순으로 이어져요. 이터레이터가 소비되기 전에는 아무것도 계산되지 않고, `getNext`는 값이 꺼내지는 횟수만큼만 실행돼요.

이터레이터가 무한하기 때문에, 소비하기 전에 네이티브 `take`나 [`takeWhile`](./takeWhile.md)처럼 일찍 멈추는 헬퍼로 범위를 제한해야 해요.

```typescript
import { iterate } from 'es-toolkit/iterator';

// 2의 거듭제곱을 take로 제한해요.
iterate(1, x => x * 2)
  .take(5)
  .toArray();
// 반환 값: [1, 2, 4, 8, 16]

// 1분 미만의 지수 백오프 지연 시간.
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(iterate(100, x => x * 2), x => x < 60000).toArray();
// 반환 값: [100, 200, 400, ..., 51200]
```

#### 파라미터

- `seed` (`T`): 시퀀스의 첫 번째 값이에요.
- `getNext` (`(value: T) => T`): 현재 값에서 다음 값을 계산해요.

#### 반환 값

(`IteratorObject<T, undefined>`): 생성된 시퀀스를 내보내는 무한한 지연 평가 이터레이터예요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.
