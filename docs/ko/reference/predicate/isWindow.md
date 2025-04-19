# isWindow

이 함수는 주어진 요소가 `Window` 객체인지 확인해요.
요소가 `Window` 객체이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 요소를 `Window` 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isWindow(element: unknown): element is Window;
```

### 파라미터

- `element` (`unknown`): `Window`인지 확인할 요소.

### 반환 값

(`element is Window`): 요소가 `Window`이면 `true`, 아니면 `false`.

## 예시

```typescript
console.log(isWindow(window)); // true
console.log(isWindow(document)); // false
console.log(isWindow({})); // false
```
