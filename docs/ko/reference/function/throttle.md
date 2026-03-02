# throttle

함수를 정해진 시간마다 최대 한 번만 실행되도록 제한해요.

```typescript
const throttledFunc = throttle(func, throttleMs, options);
```

## 사용법

### `throttle(func, throttleMs, options?)`

함수 호출을 일정 시간 간격으로 제한하고 싶을 때 `throttle`을 사용하세요. 스크롤, 리사이즈, 마우스 이동 같은 자주 발생하는 이벤트를 처리할 때 성능을 최적화하는 데 유용해요.

`debounce`와 달리 throttle은 지정된 시간 동안 함수가 최소 한 번은 실행되도록 보장해요.

```typescript
import { throttle } from 'es-toolkit/function';

// 기본 사용법 (1초마다 최대 한 번 실행)
const throttledLog = throttle(() => {
  console.log('함수가 실행됐어요!');
}, 1000);

// 첫 번째 호출: 즉시 실행
throttledLog(); // '함수가 실행됐어요!' 출력

// 1초 내 추가 호출: 무시됨
throttledLog();
throttledLog();

// 1초 후에 마지막 호출이 trailing으로 실행됨

// 스크롤 이벤트 최적화
const handleScroll = throttle(() => {
  console.log('스크롤 위치:', window.scrollY);
}, 100); // 100ms마다 최대 한 번

window.addEventListener('scroll', handleScroll);

// API 호출 최적화
const searchThrottled = throttle(async (query: string) => {
  const results = await fetch(`/api/search?q=${query}`);
  console.log('검색 결과:', await results.json());
}, 300);

// 입력할 때마다 호출해도 300ms마다만 실제 검색 실행
searchThrottled('hello');
searchThrottled('hello w');
searchThrottled('hello world');
```

leading과 trailing 옵션을 조정할 수 있어요.

```typescript
import { throttle } from 'es-toolkit/function';

// leading만 활성화 (시작 시에만 실행)
const leadingOnly = throttle(() => console.log('Leading only'), 1000, { edges: ['leading'] });

// trailing만 활성화 (끝날 때만 실행)
const trailingOnly = throttle(() => console.log('Trailing only'), 1000, { edges: ['trailing'] });

leadingOnly(); // 즉시 실행
leadingOnly(); // 무시됨
leadingOnly(); // 무시됨

trailingOnly(); // 즉시 실행되지 않음
trailingOnly(); // 무시됨
trailingOnly(); // 1초 후 실행됨
```

수동으로 제어할 수도 있어요.

```typescript
import { throttle } from 'es-toolkit/function';

const throttledFunc = throttle(() => console.log('실행됨'), 1000);

throttledFunc(); // 즉시 실행
throttledFunc(); // 대기 중

// 대기 중인 실행을 즉시 처리
throttledFunc.flush();

// 대기 중인 실행을 취소
throttledFunc.cancel();
```

#### 파라미터

- `func` (`F`): 실행을 제한할 함수예요.
- `throttleMs` (`number`): 실행을 제한할 시간 간격(밀리초)이에요.
- `options` (`ThrottleOptions`, 선택): 추가 옵션이에요.
  - `signal` (`AbortSignal`, 선택): 함수 실행을 취소할 수 있는 시그널이에요.
  - `edges` (`Array<'leading' | 'trailing'>`, 선택): 함수 실행 타이밍을 결정해요. 기본값은 `['leading', 'trailing']`이에요.

#### 반환 값

(`ThrottledFunction<F>`): 실행이 제한된 새로운 함수를 반환해요. `cancel`과 `flush` 메서드를 포함해요.

## Lodash와의 호환성

`es-toolkit/compat`에서 `throttle`을 가져오면 lodash와 완전히 호환돼요.

- `throttle` 함수는 `leading` and `trailing` 옵션을 받아요.

  - `leading`: 스로틀링된 함수를 처음으로 호출했을 때 즉시 원래 함수를 실행할지 여부예요. 기본값은 `true`예요.
  - `trailing`: 마지막 스로틀링된 함수 호출로부터 `throttleMs` 밀리세컨드가 지나면 원래 함수를 실행할지 여부예요. 기본값은 `true`예요.

- `throttleMs` 옵션의 기본값은 `0`이에요. 함수 호출이 다음 틱까지만 지연된다는 뜻이에요.

::: info `throttle`의 `leading`과 `trailing` 옵션

기본적으로 `throttle`의 `leading`과 `trailing` 옵션은 `true`예요. 그래서 `{ leading: true }`나 `{ trailing: true }` 같은 옵션은 함수의 동작을 바꾸지 않아요.

:::

```typescript
// leading 옵션 예시
const leadingFn = throttle(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// 'Leading function executed'를 바로 로깅해요.
// 계속 호출하더라도 1초마다 'Leading function executed'를 로깅해요.
leadingFn();

// trailing 옵션 예시
const trailingFn = throttle(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// 'Trailing function executed'를 바로 로깅해요.
// 계속 호출하더라도 1초마다 'Trailing function executed'를 로깅해요.
trailingFn();

// leading: false, trailing: true 옵션 예시
const trailingOnlyFn = throttle(
  () => {
    console.log('Trailing-only function executed');
  },
  1000,
  { leading: false, trailing: true }
);

// 'Trailing-only function executed'는 처음에는 로깅되지 않아요.
// 계속 호출하더라도 1초마다 'Trailing-only function executed'를 로깅해요.
trailingOnlyFn();
```
