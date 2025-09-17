# defer (Lodash 호환성)

::: warning `setTimeout`을 사용하세요

이 `defer` 함수는 단순히 `setTimeout(func, 1)`의 래퍼 함수에요. 대부분의 경우 더 간단한 네이티브 API로 대체할 수 있어요.

대신 더 빠르고 현대적인 `setTimeout(() => func(...args), 0)`나 `queueMicrotask(() => func(...args))`를 사용하세요.

:::

함수 `func`를 현재 호출 스택이 끝날 때까지 지연시켜요.

## 인터페이스

```typescript
function defer<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): number;
```

### 파라미터

- `func` (`F`): 지연시킬 함수.
- `args` (`Parameters<F>`): `func`를 호출할 인수.

### 반환 값

(`number`): 타이머 ID.

## 예시

```typescript
defer(text => {
  console.log(text);
}, 'deferred');
// => Logs 'deferred' after the current call stack has cleared.
```
