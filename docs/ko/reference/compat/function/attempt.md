# attempt (Lodash 호환성)

::: warning try-catch 블록을 사용하세요

이 `attempt` 함수는 단순한 에러 처리를 위해 추가적인 함수 래퍼와 에러 변환 로직이 포함되어 불필요한 오버헤드가 발생해요.

대신 더 직접적이고 명확한 try-catch 블록을 사용하세요.

:::

함수를 실행하고 에러가 발생하면 에러 객체를 반환하는 함수예요.

```typescript
const result = attempt(func, ...args);
```

## 레퍼런스

### `attempt(func, ...args)`

함수를 안전하게 실행하고 싶을 때 `attempt`를 사용하세요. 에러가 발생할 수 있는 함수를 실행할 때 프로그램이 중단되지 않도록 하고, 에러를 반환값으로 처리할 때 유용해요.

```typescript
import { attempt } from 'es-toolkit/compat';

// 기본 사용법 - 성공하는 경우
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // 5

// 에러가 발생하는 경우
const errorResult = attempt(() => {
  throw new Error('뭔가 잘못됐어요');
});
console.log(errorResult); // Error: 뭔가 잘못됐어요
```

try-catch 블록과 비교:

```typescript
// attempt 사용
import { attempt } from 'es-toolkit/compat';
const result = attempt(riskyFunction, arg1, arg2);
if (result instanceof Error) {
  console.log('에러 발생:', result.message);
} else {
  console.log('결과:', result);
}

// try-catch 사용 (더 직접적)
try {
  const result = riskyFunction(arg1, arg2);
  console.log('결과:', result);
} catch (error) {
  console.log('에러 발생:', error.message);
}
```

JSON 파싱 예제:

```typescript
import { attempt } from 'es-toolkit/compat';

function safeJsonParse(jsonString) {
  const result = attempt(JSON.parse, jsonString);
  
  if (result instanceof Error) {
    console.log('JSON 파싱 실패:', result.message);
    return null;
  }
  
  return result;
}

console.log(safeJsonParse('{"name": "김철수"}')); // { name: "김철수" }
console.log(safeJsonParse('잘못된 JSON')); // null (에러 메시지 출력됨)
```

문자열 에러도 Error 객체로 변환해요:

```typescript
import { attempt } from 'es-toolkit/compat';

const stringErrorResult = attempt(() => {
  throw '문자열 에러입니다';
});

console.log(stringErrorResult); // Error: 문자열 에러입니다
console.log(stringErrorResult instanceof Error); // true
```

API 호출 예제:

```typescript
import { attempt } from 'es-toolkit/compat';

async function fetchUserData(userId) {
  const result = attempt(async () => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  });
  
  if (result instanceof Error) {
    console.error('사용자 데이터 가져오기 실패:', result.message);
    return null;
  }
  
  return result;
}
```

복잡한 계산에서 안전하게 처리:

```typescript
import { attempt } from 'es-toolkit/compat';

function safeDivide(a, b) {
  return attempt((x, y) => {
    if (y === 0) {
      throw new Error('0으로 나눌 수 없습니다');
    }
    return x / y;
  }, a, b);
}

console.log(safeDivide(10, 2)); // 5
console.log(safeDivide(10, 0)); // Error: 0으로 나눌 수 없습니다
```

여러 함수를 안전하게 체이닝:

```typescript
import { attempt } from 'es-toolkit/compat';

function processData(data) {
  const step1 = attempt(validateData, data);
  if (step1 instanceof Error) return step1;
  
  const step2 = attempt(transformData, step1);
  if (step2 instanceof Error) return step2;
  
  const step3 = attempt(formatData, step2);
  if (step3 instanceof Error) return step3;
  
  return step3;
}
```

#### 파라미터

- `func` (`Function`): 실행할 함수예요.
- `args` (`...any[]`): 함수에 전달할 인수들이에요.

### 반환 값

(`ReturnType<F> | Error`): 함수가 성공하면 반환값을, 에러가 발생하면 Error 객체를 반환해요.
