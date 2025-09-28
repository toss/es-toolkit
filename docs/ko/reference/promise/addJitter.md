# addJitter

기본 지연 시간에 작은 무작위 흔들림(jitter)을 더해서 여러 작업이 동시에 몰려 실행되는 "우르르 현상(thundering herd)"을 줄여줘요.

반환 값은 아래 구간에서 균등 분포로 하나를 뽑아요:

```
[delay - delay * factor, delay + delay * factor]
```

그리고 음수가 되지 않도록 0보다 작으면 0으로 고정돼요.

주로 재시도(backoff) 로직, 폴링 주기 분산, 동시에 여러 인스턴스가 같은 타이밍에 호출하는 것을 퍼뜨리고 싶을 때 사용해요.

## 인터페이스

```typescript
function addJitter(delay: number, factor?: number, rng?: () => number): number;
```

### 파라미터

- `delay` (`number`): 기본 지연 시간(밀리세컨드).
- `factor` (`number`, 선택, 기본값 `0.2`): 지터 비율(권장 범위 `[0, 1]`). 최대 ± 퍼센트를 의미하고 0이면 지터가 없어요.
- `rng` (`() => number`, 선택, 기본값 `Math.random`): `[0, 1)` 범위 부동소수 값을 돌려주는 랜덤 함수. 테스트에서 재현성을 위해 직접 주입할 수 있어요.

### 반환 값

(`number`): 지터가 적용된 (0 이상) 지연 시간 값.

## 예시

### 기본 사용법

```typescript
import { addJitter } from 'es-toolkit/promise';

const base = 1000; // 1초
const value = addJitter(base); // factor=0.2면 [800, 1200] 범위
console.log(value);
```

### 지터 비율 직접 지정

```typescript
addJitter(500, 0.5); // [250, 750] 범위
```

### 커스텀 RNG 주입 (결과 고정)

```typescript
// rng가 항상 1을 반환 -> 상한값
const upper = addJitter(100, 0.3, () => 1); // 130
// rng가 항상 0을 반환 -> 하한값
const lower = addJitter(100, 0.3, () => 0); // 70
```

### 지수형 백오프와 함께 사용

```typescript
import { addJitter, delay } from 'es-toolkit/promise';

async function fetchWithRetry(run: () => Promise<any>) {
  let base = 500;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await run();
    } catch (err) {
      const wait = addJitter(base); // 동시에 몰리는 재시도를 분산
      await delay(wait);
      base *= 2; // 지수 증가
    }
  }
  throw new Error('All retries failed');
}
```

### 폴링 주기 분산

```typescript
import { addJitter, delay } from 'es-toolkit/promise';

async function poll(run: () => Promise<void>) {
  const base = 2000;
  const wait = addJitter(base, 0.15);
  await delay(wait);
  await run();
  // 다음 실행 예약
  setTimeout(() => poll(run), addJitter(base, 0.15));
}
```

## 동작 & 참고

- 구간 전체에서 균등 분포로 선택돼요.
- `factor > 1` (권장하지 않음) 이거나 `delay`가 아주 작아도 음수가 되면 0으로 고정돼요.
- `factor = 0`이면 지터 없이 원래 값이 반환돼요.
- 테스트 재현을 위해 커스텀 `rng`를 주입할 수 있어요.
