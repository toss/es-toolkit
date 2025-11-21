# isNode

현재 실행 환경이 Node.js인지 확인해요.

```typescript
const result = isNode();
```

## 사용법

### `isNode()`

현재 코드가 Node.js 환경에서 실행되고 있는지 확인하고 싶을 때 `isNode`를 사용하세요. Node.js 전용 API를 사용하기 전에 환경을 확인할 때 유용해요.

```typescript
import { isNode } from 'es-toolkit/predicate';

if (isNode()) {
  // Node.js 전용 코드
  console.log('이 코드는 Node.js에서 실행됩니다');
  const fs = await import('node:fs');
  const path = await import('node:path');
} else {
  // 브라우저 환경에서만 사용 가능한 코드
  console.log('이 코드는 브라우저에서 실행됩니다');
  const response = await fetch('/api/data');
}
```

조건부로 Node.js 모듈을 사용할 때도 유용해요:

```typescript
function getEnvironmentInfo() {
  if (isNode()) {
    return {
      platform: process.platform,
      nodeVersion: process.version,
      environment: 'Node.js',
    };
  } else {
    return {
      userAgent: navigator.userAgent,
      environment: 'Browser',
    };
  }
}
```

#### 반환 값

(`boolean`): 현재 환경이 Node.js면 `true`, 그렇지 않으면 `false`를 반환해요.
