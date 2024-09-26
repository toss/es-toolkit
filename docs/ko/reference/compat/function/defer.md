# defer

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
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
defer((text) => {
  console.log(text);
}, 'deferred');
// => Logs 'deferred' after the current call stack has cleared.
```