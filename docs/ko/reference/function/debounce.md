# debounce

제공된 함수를 호출하는 것을 지연시키는 debounce된 함수를 생성해요.
debounce된 함수는 마지막으로 호출된 후, `debounceMs` 밀리초가 경과해야 호출돼요.
debounce된 함수는 또한 대기 중인 실행을 취소하는 `cancel` 메서드를 가지고 있어요.

## 인터페이스

```typescript
function debounce(func: () => void, debounceMs: number): { (): void; cancel: () => void };
```

### 파라미터

- `func` (`() => void`): debounce된 함수를 만들 함수.
- `debounceMs`(`number`): debounce로 지연시킬 밀리초.

### 결괏값

(`{ (): void; cancel: () => void }`): `cancel` 메서드를 가지고 있는 debounce된 함수.

## 예시

```typescript
const debouncedFunction = debounce(() => {
  console.log('실행됨');
}, 1000);

// 1초 안에 다시 호출되지 않으면, '실행됨'을 로깅해요
debouncedFunction();

// 이전 호출이 취소되었으므로, 아무것도 로깅하지 않아요
debouncedFunction.cancel();
```
