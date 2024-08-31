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
