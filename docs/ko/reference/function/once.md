# once

함수를 한 번만 실행하도록 제한하는 새로운 함수를 만들어요.

```typescript
const onceFunc = once(func);
```

## 사용법

### `once(func)`

함수가 한 번만 실행되도록 제한하고 싶을 때 `once`를 사용하세요. 이후 호출에서는 첫 번째 호출의 결과를 그대로 반환해요.

초기화 함수나 이벤트 핸들러 등 한 번만 실행되어야 하는 로직에 유용해요. 중복 실행을 방지하고 일관된 결과를 보장해요.

```typescript
import { once } from 'es-toolkit/function';

// 초기화 함수 예시
const initialize = once(() => {
  console.log('앱을 초기화합니다');
  return { status: 'initialized' };
});

console.log(initialize()); // '앱을 초기화합니다' 로그 출력, { status: 'initialized' } 반환
console.log(initialize()); // 로그 없이 { status: 'initialized' } 반환
console.log(initialize()); // 로그 없이 { status: 'initialized' } 반환

// API 호출 예시
const fetchConfig = once(async () => {
  console.log('설정을 가져옵니다');
  const response = await fetch('/api/config');
  return response.json();
});

// 첫 번째 호출에서만 실제 API 요청이 실행됨
const config1 = await fetchConfig();
const config2 = await fetchConfig(); // 캐시된 결과 반환
```

인수가 있는 함수도 사용할 수 있어요.

```typescript
import { once } from 'es-toolkit/function';

const logOnce = once((message: string) => {
  console.log(`중요한 메시지: ${message}`);
});

logOnce('안녕하세요'); // '중요한 메시지: 안녕하세요' 출력
logOnce('다시 안녕하세요'); // 출력되지 않음 (이미 호출됨)
logOnce('또 안녕하세요'); // 출력되지 않음 (이미 호출됨)
```

#### 파라미터

- `func` (`F`): 한 번만 호출되도록 제한할 함수예요.

#### 반환 값

(`F`): 첫 번째 호출 후 결과를 캐시하고 이후 호출에서 같은 결과를 반환하는 새로운 함수를 반환해요.
