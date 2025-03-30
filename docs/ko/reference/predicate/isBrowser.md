# isBrowser

현재 환경이 브라우저인지 확인해요.

이 함수는 브라우저 환경에서만 존재하는 `window.document` 속성의 존재 여부를 확인해요.

## 인터페이스

```typescript
function isBrowser(): boolean;
```

### 반환 값

(`boolean`): 현재 환경이 브라우저이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
if (isBrowser()) {
  console.log('이 코드는 브라우저에서 실행됩니다');
  document.getElementById('app').innerHTML = 'Hello World';
}
```
