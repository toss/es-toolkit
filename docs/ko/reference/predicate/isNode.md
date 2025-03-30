# isNode

현재 환경이 Node.js인지 확인해요.

이 함수는 Node.js 환경에서만 존재하는 `process.versions.node` 속성의 존재 여부를 확인해요.

## 인터페이스

```typescript
function isNode(): boolean;
```

### 반환 값

(`boolean`): 현재 환경이 Node.js이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
if (isNode()) {
  console.log('이 코드는 Node.js에서 실행됩니다');
  const fs = import('node:fs');
}
```
