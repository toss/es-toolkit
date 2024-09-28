# debounce

제공된 함수를 호출하는 것을 지연시키는 debounce된 함수를 생성해요.
debounce된 함수는 마지막으로 호출된 후, `debounceMs` 밀리초가 경과해야 호출돼요.
debounce된 함수는 또한 대기 중인 실행을 취소하는 `cancel` 메서드를 가지고 있어요.

## 인터페이스

```typescript
function debounce<F extends (...args: any[]) => void>(
  func: F,
  debounceMs: number,
  options?: DebounceOptions
): ((...args: Parameters<F>) => void) & {
  cancel: () => void;
  flush: () => void;
  schedule: () => void;
};
```

### 파라미터

- `func` (`F`): debounce된 함수를 만들 함수.
- `debounceMs`(`number`): debounce로 지연시킬 밀리초.
- `options` (`DebounceOptions`, optional): 옵션 객체.
  - `signal` (`AbortSignal`, optional): 디바운스된 함수를 취소하기 위한 선택적 `AbortSignal`.
  - `edges` (`Array<'leading' | 'trailing'>`, optional): 원래 함수를 언제 실행할지 나타내는 배열. 기본값은 `['trailing']`이에요.
    - `'leading'`이 포함되면, 디바운스된 함수를 처음으로 호출했을 때 즉시 원래 함수를 실행해요.
    - `'trailing'`이 포함되면, 마지막 디바운스된 함수 호출로부터 `debounceMs` 밀리세컨드가 지나면 원래 함수를 실행해요.
    - `'leading'`과 `'trailing'`이 모두 포함된다면, 원래 함수는 실행을 지연하기 시작할 때와 끝날 때 모두 호출돼요. 그렇지만 양쪽 시점 모두에 호출되기 위해서는, 디바운스된 함수가 `debounceMs` 밀리세컨드 사이에 최소 2번은 호출되어야 해요. 디바운스된 함수를 한 번 호출해서 원래 함수를 두 번 호출할 수는 없기 때문이에요.

### 반환 값

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; schedule: () => void; }`): 디바운스된 함수. 디바운스 동작을 제어하기 위한 추가적인 메서드를 가져요.

- `cancel` (`() => void`): 예정된 디바운스 호출을 취소해요.
- `flush` (`() => void`): 예정된 디바운스 호출을 즉시 실행해요.
- `schedule` (`() => void`): 디바운스 호출이 최소 `debounceMs` 이후에 실행되도록 스케줄링해요.

## 예시

### 기본 사용법

```typescript
const debouncedFunction = debounce(() => {
  console.log('실행됨');
}, 1000);

// 1초 안에 다시 호출되지 않으면, '실행됨'을 로깅해요
debouncedFunction();

// 이전 호출이 취소되었으므로, 아무것도 로깅하지 않아요
debouncedFunction.cancel();
```

### AbortSignal 사용법

```typescript
const controller = new AbortController();
const signal = controller.signal;
const debouncedWithSignalFunction = debounce(
  () => {
    console.log('Function executed');
  },
  1000,
  { signal }
);

// 1초 안에 다시 호출되지 않으면, '실행됨'을 로깅해요
debouncedWithSignalFunction();

// debounce 함수 호출을 취소해요
controller.abort();
```

## Lodash와의 호환성

`es-toolkit/compat`에서 `debounce`를 가져오면 lodash와 완전히 호환돼요.

- `debounce` 함수는 `leading` and `trailing` 옵션을 받아요.

  - `leading`: 디바운스된 함수를 처음으로 호출했을 때 즉시 원래 함수를 실행할지 여부예요. 기본값은 `false`예요.
  - `trailing`: 마지막 디바운스된 함수 호출로부터 `debounceMs` 밀리세컨드가 지나면 원래 함수를 실행할지 여부예요. 기본값은 `true`예요.

- `debounce` 함수는 `maxWait` 옵션도 받아요.

  - 원래 함수 호출이 최대로 지연될 수 있는 밀리세컨드예요. 기본값은 `Infinity`예요.

- `debounceMs` 옵션의 기본값은 `0`이에요. 함수 호출이 다음 틱까지만 지연된다는 뜻이에요.

::: info `{ leading: true }` 옵션의 의미

`trailing`은 기본적으로 `true`이므로, 디바운스를 `{ leading: true }`로 설정하면 `leading`과 `trailing` 모두 `true`가 돼요.

:::

```typescript
// leading 옵션 예시
const leadingFn = debounce(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// 'Leading function executed'를 바로 로깅해요.
leadingFn();

// trailing 옵션 예시
const trailingFn = debounce(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// 디바운스된 함수가 그 사이에 호출되지 않는다면, 'Trailing function executed'을 1초 뒤에 로깅해요.
trailingFn();

// maxWait 옵션 예시
const maxWaitFn = debounce(
  () => {
    console.log('MaxWait function executed');
  },
  1000,
  { maxWait: 2000 }
);

// 'MaxWait function executed'를 2초 안에는 반드시 로깅해요.
maxWaitFn();
setTimeout(maxWaitFn, 500);
setTimeout(maxWaitFn, 1000);
setTimeout(maxWaitFn, 1500);
setTimeout(maxWaitFn, 2000);
setTimeout(maxWaitFn, 2500);
setTimeout(maxWaitFn, 3000);
```
