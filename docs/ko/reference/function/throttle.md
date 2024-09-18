# throttle

제공된 함수를 매 `throttleMs` 밀리초마다 최대 한 번만 호출하는 throttle된 함수를 생성해요. 시간 안에 throttle된 함수를 다시 호출해도 원래 함수를 실행하지 않아요.

## 인터페이스

```typescript
function throttle<F extends (...args: any[]) => void>(
  func: F,
  throttleMs: number,
  options?: ThrottleOptions
): ((...args: Parameters<F>) => void) & {
  cancel: () => void;
  flush: () => void;
};
```

### 파라미터

- `func` (`F`): throttle할 함수.
- `throttleMs`(`number`): 실행을 throttle할 밀리초.
- `options` (`ThrottleOptions`, optional): 옵션 객체.
  - `signal` (`AbortSignal`, optional): 스로틀링된 함수를 취소하기 위한 선택적 `AbortSignal`.
  - `edges` (`Array<'leading' | 'trailing'>`, optional): 원래 함수를 언제 실행할지 나타내는 배열. 기본값은 `['leading', 'trailing']`이에요.
    - `'leading'`이 포함되면, 스로틀링된 함수를 처음으로 호출했을 때 즉시 원래 함수를 실행해요.
    - `'trailing'`이 포함되면, 마지막 스로틀링된 함수 호출로부터 `throttleMs` 밀리세컨드가 지나면 원래 함수를 실행해요.
    - `'leading'`과 `'trailing'`이 모두 포함된다면, 원래 함수는 실행을 지연하기 시작할 때와 끝날 때 모두 호출돼요. 그렇지만 양쪽 시점 모두에 호출되기 위해서는, 스로틀링된 함수가 `throttleMs` 밀리세컨드 사이에 최소 2번은 호출되어야 해요. 스로틀링된 함수를 한 번 호출해서 원래 함수를 두 번 호출할 수는 없기 때문이에요.

### 반환 값

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; }`): 스로틀링된 함수. 스로틀링 동작을 제어하기 위한 추가적인 메서드를 가져요.

- `cancel` (`() => void`): 예정된 스로틀링 호출을 취소해요.
- `flush` (`() => void`): 예정된 스로틀링 호출을 즉시 실행해요.

## 예시

### 기본 사용법

```typescript
const throttledFunction = throttle(() => {
  console.log('Function executed');
}, 1000);

// 'Function executed'를 즉시 로깅해요
throttledFunction(); // 첫 번째 호출은 함수를 즉시 호출해요

// 1초 이후에 'Function executed'를 로깅해요
throttledFunction(); // 2번째 호출은 `throttleMs` 안에 실행되었지만, `'trailing'` 옵션 때문에 스로틀링 시간이 끝나면 함수가 호출돼요

// 2초 뒤
setTimeout(() => {
  throttledFunction(); // 'Function executed'를 다시 로깅해요
}, 2000); // 스로틀링 시간이 지났기 때문에 원래 함수가 호출돼요
```

### Window 이벤트 다루기

```typescript
// 스로틀링할 함수
const logResize = () => {
  console.log('Window resized at', new Date().toISOString());
};

// 함수를 스로틀링해요
const throttledResizeHandler = throttle(logResize, 1000);

// 스로틀링된 함수를 Resize 이벤트에 등록해요
window.addEventListener('resize', throttledResizeHandler);

// 더 이상 필요 없는 이벤트 리스너를 해제해요
const cleanup = () => {
  window.removeEventListener('resize', throttledResizeHandler);
};

// 10초 이후에 이벤트 리스너를 해제해요
setTimeout(cleanup, 10000);
```

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
```
