# isBrowser

현재 실행 환경이 브라우저인지 확인해요.

이 함수는 브라우저 환경에서만 존재하는 `window.document` 속성의 존재 여부를 확인해요.

## 인터페이스

```typescript
function isBrowser(): boolean;
```

### 반환 값

(`boolean`): 현재 환경이 브라우저이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isBrowser } from 'es-toolkit/predicate';

// 브라우저 환경 확인
if (isBrowser()) {
  console.log('브라우저 환경에서 실행 중이에요');
  document.getElementById('app').innerHTML = 'Hello World';
}

// 환경에 따른 조건부 코드 실행
function initializeApp() {
  if (isBrowser()) {
    // 브라우저에서만 실행되는 코드
    console.log('DOM 조작이 가능해요');
    const element = document.createElement('div');
    element.textContent = '브라우저에서 실행 중';
    document.body.appendChild(element);
  } else {
    // 서버 사이드 렌더링이나 Node.js 환경
    console.log('서버 환경에서 실행 중이에요');
  }
}

// 브라우저 API 사용 전 환경 확인
function handleLocalStorage(key: string, value: string) {
  if (isBrowser() && typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
    console.log('로컬 스토리지에 저장했어요');
  } else {
    console.log('로컬 스토리지를 사용할 수 없어요');
  }
}

// 윈도우 이벤트 리스너 등록
function addWindowListener() {
  if (isBrowser()) {
    window.addEventListener('resize', () => {
      console.log('윈도우 크기가 변경됐어요');
    });
  }
}

// 유니버설/이소모픽 앱에서 활용
function getWindowWidth() {
  if (isBrowser()) {
    return window.innerWidth;
  }
  return 0; // 서버에서는 기본값 반환
}
```
