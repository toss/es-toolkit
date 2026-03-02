# Semaphore

동시에 실행되는 비동기 작업의 개수를 제한해요.

```typescript
const semaphore = new Semaphore(capacity);
```

## 사용법

### `Semaphore(capacity)`

동시에 실행할 수 있는 비동기 작업의 개수를 제한하고 싶을 때 `Semaphore`를 사용하세요. 특히 데이터베이스 연결 풀, API 호출 제한, 파일 다운로드 제한 등 리소스 사용량을 제어해야 하는 상황에서 유용해요.

```typescript
import { Semaphore } from 'es-toolkit';

const semaphore = new Semaphore(3);

// API 호출 제한 예시 (최대 3개까지만 동시 실행)
async function callAPI(id: number) {
  await semaphore.acquire();
  try {
    console.log(`API 호출 시작: ${id}`);
    const response = await fetch(`/api/data/${id}`);
    return response.json();
  } finally {
    semaphore.release();
    console.log(`API 호출 완료: ${id}`);
  }
}

// 파일 다운로드 제한 예시
async function downloadFile(url: string) {
  await semaphore.acquire();
  try {
    console.log(`다운로드 시작: ${url}`);
    // 파일 다운로드 로직
    await fetch(url);
  } finally {
    semaphore.release();
    console.log(`다운로드 완료: ${url}`);
  }
}

// 5개의 작업을 동시에 호출해도 최대 3개까지만 동시 실행됨
callAPI(1);
callAPI(2);
callAPI(3);
callAPI(4); // 앞의 작업 중 하나가 끝날 때까지 대기
callAPI(5); // 앞의 작업 중 하나가 끝날 때까지 대기
```

#### 파라미터

- `capacity` (`number`): 동시에 실행할 수 있는 작업의 최대 개수예요. 1보다 큰 정수여야 해요.

#### 프로퍼티

- `capacity` (`number`): 동시에 실행할 수 있는 작업의 최대 개수예요.
- `available` (`number`): 현재 사용 가능한 허가 개수예요. `0`이면 모든 허가가 사용 중이라는 뜻이에요.

#### 메서드

- `acquire` (`() => Promise<void>`): 허가를 받고 비동기 작업을 실행하거나, 허가를 받을 때까지 기다려요.
- `release` (`() => void`): 허가를 반납해서 대기 중인 다음 작업이 실행될 수 있도록 해요.
