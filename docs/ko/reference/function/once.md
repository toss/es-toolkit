# once

제공된 함수 `func`를 한 번만 호출하도록 제한하는 함수를 생성해요.
함수를 반복해서 호출하면 첫 번째 호출의 값을 반환해요.

## 인터페이스

```typescript
function once<F extends () => any>(func: F): F;
function once<F extends (...args: any[]) => void>(func: F): F;
```

### 파라미터

- `func` (`F extends (() => any) | ((...args: any[]) => void)`): 한 번만 호출하도록 제한할 함수예요.

### 반환 값

(`F`): `func`가 한 번 호출되면 결과를 캐시하고 반환할 새로운 함수예요.

## 예시

```typescript
const initialize = once(() => {
  console.log('초기화');
  return true;
});

initialize(); // '초기화'를 로깅하고, true를 반환해요
initialize(); // 로깅 없이 true를 반환해요
```
