# isFunction

주어진 값이 함수인지 확인해요.

```typescript
const result = isFunction(value);
```

## 레퍼런스

### `isFunction(value)`

값이 함수인지 확인하고 싶을 때 `isFunction`을 사용하세요. 일반 함수, 비동기 함수, 제너레이터 함수, 생성자 함수 등 모든 종류의 함수를 감지할 수 있어요.

```typescript
import { isFunction } from 'es-toolkit/predicate';

// 일반 함수들
console.log(isFunction(function() {})); // true
console.log(isFunction(() => {})); // true
console.log(isFunction(Array.prototype.slice)); // true

// 비동기 함수
console.log(isFunction(async function() {})); // true
console.log(isFunction(async () => {})); // true

// 제너레이터 함수
console.log(isFunction(function* () {})); // true

// 생성자 함수들
console.log(isFunction(Array)); // true
console.log(isFunction(Date)); // true
console.log(isFunction(RegExp)); // true
console.log(isFunction(Promise)); // true
```

내장 JavaScript 함수와 클래스들도 감지해요:

```typescript
// 내장 생성자들
console.log(isFunction(Object)); // true
console.log(isFunction(String)); // true
console.log(isFunction(Number)); // true
console.log(isFunction(Boolean)); // true

// 타입 배열 생성자들
console.log(isFunction(Int8Array)); // true
console.log(isFunction(Uint8Array)); // true
console.log(isFunction(Float32Array)); // true

// 프록시와 리플렉트
console.log(isFunction(Proxy)); // true
console.log(isFunction(Reflect.get)); // true
```

함수가 아닌 값들과 구분해요:

```typescript
// 함수가 아닌 것들
console.log(isFunction({})); // false
console.log(isFunction([])); // false
console.log(isFunction('text')); // false
console.log(isFunction(42)); // false
console.log(isFunction(null)); // false
console.log(isFunction(undefined)); // false

// 함수처럼 보이지만 함수가 아닌 것들
console.log(isFunction({ call: function() {} })); // false
```

콜백 함수 검증이나 동적 함수 호출에서 유용해요:

```typescript
// 콜백 함수 검증
function processData(data: any[], callback?: unknown) {
  const result = data.map(item => item * 2);
  
  if (isFunction(callback)) {
    // callback이 함수임이 확실하므로 안전하게 호출 가능
    callback(result);
  }
  
  return result;
}

// 동적 함수 실행
function executeIfFunction(fn: unknown, ...args: any[]) {
  if (isFunction(fn)) {
    return fn(...args);
  }
  
  console.log('주어진 값이 함수가 아닙니다');
  return null;
}

// 메서드 체이닝에서 함수 확인
const utils = {
  data: [1, 2, 3],
  process(fn: unknown) {
    if (isFunction(fn)) {
      this.data = this.data.map(fn);
    }
    return this;
  }
};
```

#### 파라미터

- `value` (`unknown`): 함수인지 확인할 값이에요.

#### 반환 값

(`value is (...args: any[]) => any`): 값이 함수이면 `true`, 그렇지 않으면 `false`를 반환해요.
