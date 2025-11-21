# isBrowser

현재 실행 환경이 브라우저인지 확인해요.

```typescript
const result = isBrowser();
```

## 사용법

### `isBrowser()`

브라우저 환경에서만 실행되어야 하는 코드가 있을 때 `isBrowser`를 사용하세요. `window.document`의 존재 여부를 확인해서 브라우저 환경인지 판단해요. SSR(서버 사이드 렌더링)이나 Node.js 환경에서 유용해요.

```typescript
import { isBrowser } from 'es-toolkit/predicate';

// 브라우저 환경에서만 DOM 조작
if (isBrowser()) {
  document.getElementById('app').innerHTML = 'Hello World';
  console.log('브라우저 환경에서 실행 중');
} else {
  console.log('서버 환경에서 실행 중');
}
```

환경에 따른 조건부 로직 구현에 활용할 수 있어요.

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function getWindowWidth() {
  if (isBrowser()) {
    return window.innerWidth;
  }
  return 0; // 서버에서는 기본값 반환
}

// 이벤트 리스너 등록
function addWindowListener() {
  if (isBrowser()) {
    window.addEventListener('resize', () => {
      console.log('윈도우 크기가 변경됐어요');
    });
  }
}
```

Next.js, Nuxt.js 같은 SSR 프레임워크에서 특히 유용해요.

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function initializeAnalytics() {
  if (isBrowser()) {
    // 브라우저에서만 분석 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://analytics.example.com/script.js';
    document.head.appendChild(script);
  }
}

// 로컬 스토리지 접근
function getStoredValue(key: string) {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
}
```

#### 반환 값

(`boolean`): 현재 환경이 브라우저이면 `true`, 그렇지 않으면 `false`를 반환해요.
