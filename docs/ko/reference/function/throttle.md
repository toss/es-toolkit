# throttle

제공된 함수를 매 `throttleMs` 밀리초마다 최대 한 번만 호출하는 throttle된 함수를 생성해요. 시간 안에 throttle된 함수를 다시 호출해도 원래 함수를 실행하지 않아요.

## 인터페이스

```typescript
function throttle<F extends (...args: any[]) => void>(func: F, throttleMs: number): (...args: Parameters<F>) => void;
```

### 파라미터

- `func` (`F`): throttle할 함수.
- `throttleMs`(`number`): 실행을 throttle할 밀리초.

### 반환 값

(`(...args: Parameters<F>) => void`): 새로운 throttle된 함수.

## 예시

```typescript
const throttledFunction = throttle(() => {
  console.log('호출');
}, 1000);

// 즉시 '호출'를 로깅해요
throttledFunction();

// throttle 시간 내에 있으므로 아무 것도 로깅하지 않아요
throttledFunction();

// 1초 후
setTimeout(() => {
  throttledFunction(); // '호출'를 로깅해요
}, 1000);
```

## Lodash와의 호환성

`es-toolkit/compat`에서 `throttle`을 가져오면 lodash와 완전히 호환돼요.

- `throttle` 함수는 `leading` and `trailing` 옵션을 받아요.

  - `leading`: 스로틀링된 함수를 처음으로 호출했을 때 즉시 원래 함수를 실행할지 여부예요. 기본값은 `true`예요.
  - `trailing`: 마지막 스로틀링된 함수 호출로부터 `debounceMs` 밀리세컨드가 지나면 원래 함수를 실행할지 여부예요. 기본값은 `true`예요.
  - `leading`과 `trailing`가 모두 `true`라면, 원래 함수는 실행을 제어하기 시작할 때와 끝날 때 모두 호출돼요. 그렇지만 양쪽 시점 모두에 호출되기 위해서는, 스로틀링된 함수가 `debounceMs` 밀리세컨드 사이에 최소 2번은 호출되어야 해요. 스로틀링된 함수 호출 한 번이 원래 함수를 두 번 호출할 수는 없기 때문이에요.

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
const trailingFn = debounce(
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
