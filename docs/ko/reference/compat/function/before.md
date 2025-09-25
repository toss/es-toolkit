# before (Lodash 호환성)

::: warning `es-toolkit`의 [`before`](../../function/before.md)를 사용하세요

이 `before` 함수는 복잡한 타입 검증과 정수 변환 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [before](../../function/before.md)를 사용하세요.

:::

함수를 지정된 횟수까지만 실행하고, 그 이후엔 마지막 결과를 반환하는 함수를 만들어요.

```typescript
const limitedFunction = before(n, func);
```

## 레퍼런스

### `before(n, func)`

함수가 특정 횟수까지만 실행되도록 제한하고 싶을 때 `before`를 사용하세요. 함수 호출 횟수를 제한하거나, 초기 설정 단계에서만 함수를 실행하고 싶을 때 유용해요.

```typescript
import { before } from 'es-toolkit/compat';

// 기본 사용법
let count = 0;
const beforeThree = before(3, () => ++count);

console.log(beforeThree()); // 1 (첫 번째 호출)
console.log(beforeThree()); // 2 (두 번째 호출)
console.log(beforeThree()); // 2 (세 번째 호출부터는 마지막 결과 반환)
console.log(beforeThree()); // 2 (계속 마지막 결과만 반환)
```

클로저를 사용한 대안:

```typescript
// before 사용
const beforeThree = before(3, myFunction);

// 클로저 사용 (더 간단하고 빠름)
function createBefore(limit, callback) {
  let callCount = 0;
  let lastResult;

  return function (...args) {
    if (callCount < limit - 1) {
      lastResult = callback.apply(this, args);
      callCount++;
    }
    return lastResult;
  };
}

const beforeThreeAlternative = createBefore(3, myFunction);
```

초기화 함수로 활용:

```typescript
import { before } from 'es-toolkit/compat';

class Database {
  constructor() {
    this.isInitialized = false;

    // 초기화는 한 번만 실행
    this.initialize = before(2, () => {
      console.log('데이터베이스 초기화 중...');
      this.setupConnection();
      this.isInitialized = true;
      return '초기화 완료';
    });
  }

  setupConnection() {
    // 실제 연결 설정 로직
  }

  query(sql) {
    const initResult = this.initialize();
    console.log(initResult); // 첫 번째 호출: "초기화 완료", 이후: 동일 결과

    // 쿼리 실행 로직
    return `쿼리 실행: ${sql}`;
  }
}

const db = new Database();
db.query('SELECT * FROM users'); // 초기화 실행됨
db.query('SELECT * FROM products'); // 초기화는 실행되지 않음
```

API 호출 제한:

```typescript
import { before } from 'es-toolkit/compat';

// API 호출을 최대 5번까지만 허용
const limitedApiCall = before(6, endpoint => {
  console.log(`API 호출: ${endpoint}`);
  return fetch(endpoint).then(res => res.json());
});

// 처음 5번은 실제 API 호출
limitedApiCall('/api/data1'); // 실제 호출
limitedApiCall('/api/data2'); // 실제 호출
limitedApiCall('/api/data3'); // 실제 호출
limitedApiCall('/api/data4'); // 실제 호출
limitedApiCall('/api/data5'); // 실제 호출
limitedApiCall('/api/data6'); // 마지막 결과 반환 (API 호출 안 함)
```

이벤트 리스너 제한:

```typescript
import { before } from 'es-toolkit/compat';

// 클릭 이벤트를 3번까지만 처리
const limitedClickHandler = before(4, event => {
  console.log('클릭 처리됨:', event.target.id);
  return `처리 완료: ${Date.now()}`;
});

document.getElementById('button').addEventListener('click', limitedClickHandler);
// 처음 3번 클릭만 처리되고, 그 이후엔 마지막 결과만 반환
```

파라미터와 반환값 처리:

```typescript
import { before } from 'es-toolkit/compat';

const limitedCalculator = before(3, (operation, a, b) => {
  const result = operation === 'add' ? a + b : a - b;
  console.log(`계산: ${a} ${operation} ${b} = ${result}`);
  return result;
});

console.log(limitedCalculator('add', 5, 3)); // "계산: 5 add 3 = 8", 반환: 8
console.log(limitedCalculator('subtract', 10, 4)); // "계산: 10 subtract 4 = 6", 반환: 6
console.log(limitedCalculator('multiply', 7, 2)); // 계산 안 함, 반환: 6 (마지막 결과)
```

0 또는 1을 전달하면 함수가 실행되지 않아요:

```typescript
import { before } from 'es-toolkit/compat';

const neverCalled = before(0, () => {
  console.log('이 함수는 실행되지 않아요');
  return '결과';
});

const onceOnly = before(1, () => {
  console.log('이 함수도 실행되지 않아요');
  return '결과';
});

console.log(neverCalled()); // undefined
console.log(onceOnly()); // undefined
```

리소스 정리 최적화:

```typescript
import { before } from 'es-toolkit/compat';

// 함수 참조가 자동으로 정리되어 메모리 누수 방지
const limitedProcessor = before(2, data => {
  // 복잡한 데이터 처리
  return processComplexData(data);
});

// 2번째 호출 이후에는 원본 함수 참조가 제거됨 (가비지 컬렉션)
```

#### 파라미터

- `n` (`number`): 함수를 실행할 최대 횟수예요. n-1번째까지 실행되고, n번째부터는 마지막 결과를 반환해요.
- `func` (`Function`): 제한할 함수예요.

#### 반환 값

(`Function`): 지정된 횟수까지만 원본 함수를 실행하고, 그 이후엔 마지막 결과를 반환하는 새로운 함수를 반환해요.
