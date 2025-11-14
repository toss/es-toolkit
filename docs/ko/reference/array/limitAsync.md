# limitAsync

비동기 함수의 최대 동시 실행 수를 제한하는 새로운 함수를 만들어요.

```typescript
const limitedFunc = limitAsync(asyncFunc, concurrency);
```

## 레퍼런스

### `limitAsync(callback, concurrency)`

여러 번 호출되는 비동기 함수의 동시 실행 수를 제한하고 싶을 때 `limitAsync`를 사용하세요. 지정한 수만큼만 동시에 실행되고, 추가 호출은 실행 중인 작업이 완료될 때까지 대기해요.

```typescript
import { limitAsync } from 'es-toolkit/array';

// 최대 3개의 요청만 동시에 실행되도록 제한해요.
const limitedFetch = limitAsync(async url => {
  return await fetch(url);
}, 3);

const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
await Promise.all(urls.map(url => limitedFetch(url)));
// 처음 3개가 먼저 실행되고, 완료되면 나머지가 실행돼요.
```

외부 API 호출이나 데이터베이스 쿼리처럼 리소스를 많이 사용하는 작업의 부하를 조절할 때 유용해요. 속도 제한이 있는 API를 사용하거나 서버 부하를 관리해야 할 때 특히 효과적이에요.

```typescript
import { limitAsync } from 'es-toolkit/array';

// 무거운 연산을 최대 2개씩만 처리해요.
const processItem = async item => {
  return await heavyComputation(item);
};

const limitedProcess = limitAsync(processItem, 2);
const items = [1, 2, 3, 4, 5];
await Promise.all(items.map(item => limitedProcess(item)));
// 최대 2개의 항목만 동시에 처리돼요.
```

#### 파라미터

- `callback` (`F extends (...args: any[]) => Promise<any>`): 동시 실행 수를 제한할 비동기 함수예요.
- `concurrency` (`number`): 동시에 실행할 수 있는 최대 작업 수예요.

### 반환 값

(`F`): 동시 실행 제한이 적용된 새로운 함수를 반환해요. 원본 함수와 같은 인터페이스를 가지고 있어요.
