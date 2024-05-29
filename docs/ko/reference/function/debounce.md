# debounce

디바운스 함수가 마지막으로 호출된 후 밀리초`debounceMs`가 경과할 때까지 주어진 함수의 호출을 지연시키는 디바운스 함수를 생성해요. 디바운스 함수에는 실행 대기 중인 작업을 취소하는 `cancel` 메서드도 제공하고 있어요.

## 인터페이스

```typescript
function debounce(func: () => void, debounceMs: number): { (): void; cancel: () => void };
```

### 파라미터

- `func` (`() => void`): 디바운스할 함수예요.
- `debounceMs`(`number`): 지연시킬 밀리초(ms)예요.

### 반환 값

(`{ (): void; cancel: () => void }`): `cancel` 메서드를 가진 새로운 디바운스 함수예요.

## 예시

```typescript
const debouncedFunction = debounce(() => {
  console.log('Function executed');
}, 1000);

// 1초 안에 다시 호출되지 않으면 'Function executed'를 로그로 출력해요.
debouncedFunction();

// 이전 호출이 취소되어 아무것도 로그로 출력되지 않아요.
debouncedFunction.cancel();
```
