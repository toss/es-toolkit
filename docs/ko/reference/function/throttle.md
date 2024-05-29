# throttle

주어진 함수를 최대 `throttleMs` 밀리초마다 한 번만 호출하는 스로틀링 함수를 생성해요. 대기 시간 내에 스로틀링 함수가 반복 호출되더라도 원래 함수는 실행되지 않아요.

## 인터페이스

```typescript
function throttle(func: () => void, throttleMs: number): () => void;
```

### 파라미터

- `func` (`() => void`): 스로틀링할 함수예요.
- `throttleMs`(`number`): 실행을 스로틀링할 밀리초(ms)예요.

### 반환 값

(`() => void`): 새로운 스로틀링 함수예요.

## 예시

```typescript
const throttledFunction = throttle(() => {
  console.log('Function executed');
}, 1000);

// 'Function executed'를 로그로 즉시 출력해요.
throttledFunction();

// 스로틀링 시간 내에 있기 때문에 아무것도 로그로 출력되지 않아요.
throttledFunction();

// 1초 후
setTimeout(() => {
  throttledFunction(); // 'Function executed'를 로그로 출력해요.
}, 1000);
```
