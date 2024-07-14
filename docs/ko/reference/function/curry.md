# curry

제공된 함수의 인자를 여러번에 걸쳐 입력받을 수 있도록 함수를 커링 함수로 변환해요.
커링 함수는 원본 함수의 인자를 모두 입력받을 때까지 다음 인자들을 입력받을 수 있는 함수를 반환하고, 인자를 모두 전달 받으면 .
debounce된 함수는 또한 대기 중인 실행을 취소하는 `cancel` 메서드를 가지고 있어요.

## 인터페이스

```typescript
function debounce<F extends (...args: any[]) => void>(
  func: F,
  debounceMs: number,
  options?: DebounceOptions
): F & { cancel: () => void };
```

### 파라미터

- `func` (`F`): debounce된 함수를 만들 함수.
- `debounceMs`(`number`): debounce로 지연시킬 밀리초.
- `options` (`DebounceOptions`, optional): 옵션 객체.
  - `signal` (`AbortSignal`, optional): debounce된 함수를 취소하기 위한 선택적 `AbortSignal`.

### 결괏값

(`F & { cancel: () => void }`): `cancel` 메서드를 가지고 있는 debounce된 함수.

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
