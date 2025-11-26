# isPromise

주어진 값이 `Promise` 인스턴스인지 확인해요.

```typescript
const result = isPromise(value);
```

## 사용법

### `isPromise(value)`

값이 `Promise` 인스턴스인지 확인하고 싶을 때 `isPromise`를 사용하세요. 비동기 코드에서 `Promise` 객체를 다른 값들과 구분해야 할 때나, 조건부로 `await`를 사용해야 할 때 유용해요.

```typescript
import { isPromise } from 'es-toolkit/predicate';

// Promise 인스턴스들
const promise1 = new Promise(resolve => resolve('done'));
const promise2 = Promise.resolve(42);
const promise3 = Promise.reject(new Error('failed'));

console.log(isPromise(promise1)); // true
console.log(isPromise(promise2)); // true
console.log(isPromise(promise3)); // true

// Promise가 아닌 값들
console.log(isPromise({})); // false
console.log(isPromise('hello')); // false
console.log(isPromise(42)); // false
console.log(isPromise(null)); // false
console.log(isPromise(undefined)); // false
```

비동기 함수에서 조건에 따라 로직을 실행할 때 유용해요.

```typescript
// 값이 Promise인지 확인해서 적절히 처리
async function processValue(input: unknown) {
  if (isPromise(input)) {
    // TypeScript가 input을 Promise<any>로 추론
    const result = await input;
    console.log('Promise 결과:', result);
    return result;
  }

  // Promise가 아닌 값은 바로 반환
  console.log('일반 값:', input);
  return input;
}

// API 응답 처리
function handleApiCall(response: unknown) {
  if (isPromise(response)) {
    return response.then(data => ({ success: true, data })).catch(error => ({ success: false, error: error.message }));
  }

  // 이미 해결된 값
  return { success: true, data: response };
}

// 유틸리티 함수에서 활용
function toPromise<T>(value: T | Promise<T>): Promise<T> {
  if (isPromise(value)) {
    return value;
  }

  return Promise.resolve(value);
}
```

`Promise` 처럼 생긴 객체와 실제 `Promise`를 구분할 수 있어요.

```typescript
// thenable 객체는 Promise가 아님
const thenable = {
  then: (resolve: Function) => resolve('not a promise'),
};

console.log(isPromise(thenable)); // false

// async 함수 결과는 Promise
async function asyncFunction() {
  return 'async result';
}

console.log(isPromise(asyncFunction())); // true

// 일반 함수는 Promise 아님
function normalFunction() {
  return 'normal result';
}

console.log(isPromise(normalFunction())); // false
```

오류를 핸들링할 때도 사용할 수 있어요.

```typescript
function safeExecute(fn: () => any) {
  try {
    const result = fn();

    if (isPromise(result)) {
      return result.catch(error => {
        console.error('비동기 함수 실행 중 에러:', error);
        return null;
      });
    }

    return result;
  } catch (error) {
    console.error('동기 함수 실행 중 에러:', error);
    return null;
  }
}

// 타임아웃 처리
function withTimeout<T>(valueOrPromise: T | Promise<T>, timeoutMs: number) {
  if (!isPromise(valueOrPromise)) {
    return valueOrPromise;
  }

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });

  return Promise.race([valueOrPromise, timeoutPromise]);
}
```

#### 파라미터

- `value` (`unknown`): Promise 인스턴스인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 Promise 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
