# Mutex

여러 비동기 작업이 동시에 실행되지 않도록 순서를 지켜줘요.

```typescript
const mutex = new Mutex();
```

## 사용법

### `Mutex()`

여러 비동기 작업이 동시에 실행되는 것을 방지하고 싶을 때 `Mutex`를 사용하세요. 데이터베이스 연결, 파일 시스템 접근, API 호출 제한 등 동시성을 제어해야 하는 상황에서 유용해요.

```typescript
import { Mutex } from 'es-toolkit';

const mutex = new Mutex();

// API 호출 제한 예시
async function callAPI() {
  await mutex.acquire();
  try {
    // 동시에 여러 API 호출이 발생하는 것을 방지
    const response = await fetch('/api/data');
    return response.json();
  } finally {
    mutex.release();
  }
}

// 파일 시스템 접근 예시
async function writeToFile(data: string) {
  await mutex.acquire();
  try {
    // 동시에 같은 파일에 쓰기 작업이 일어나는 것을 방지
    await fs.writeFile('data.txt', data);
    console.log('파일 쓰기 완료');
  } finally {
    mutex.release();
  }
}

// 여러 작업을 동시에 호출해도 순차적으로 실행됨
callAPI();
callAPI(); // 첫 번째 작업이 끝날 때까지 대기
writeToFile(); // 앞의 작업들이 끝날 때까지 대기
```

#### 프로퍼티

- `isLocked` (`boolean`): 현재 뮤텍스가 사용 중인지 여부. `true`라면 이미 실행 중인 비동기 작업이 있다는 뜻이에요.

#### 메서드

- `acquire` (`() => Promise<void>`): 허가를 받고 비동기 작업을 실행하거나, 허가를 받을 때까지 기다려요.
- `release` (`() => void`): 대기 중인 다음 작업이 실행될 수 있도록 해요.
