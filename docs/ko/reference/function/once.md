# once

주어진 함수 `func`를 한 번만 호출하도록 제한하는 함수를 생성해요. 반복해서 함수를 호출하면 함수는 첫 번째 호출의 값을 반환해요.

## 인터페이스

```typescript
function once<F extends () => any>(func: F): F;
```

### 파라미터

- `func` (`F extends () => any`): 제한할 함수예요.

### 반환 값

(`F`): `func`를 한 번만 호출하고 결과를 캐시하는 새로운 함수예요.

## 예시

```typescript
const initialize = once(() => {
  console.log('Initialized!');
  return true;
});

initialize(); // 'Initialized!'를 로그로 출력하고 true를 반환해요.
initialize(); // 로그를 출력하지 않고 true를 반환해요.
```
