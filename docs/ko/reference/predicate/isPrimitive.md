# isPrimitive

주어진 값이 JavaScript 원시 값인지 확인해요.

```typescript
const result = isPrimitive(value);
```

## 사용법

### `isPrimitive(value)`

값이 JavaScript의 원시 값인지 확인하고 싶을 때 `isPrimitive`를 사용하세요. JavaScript의 원시 값은 `null`, `undefined`, 문자열, 숫자, 참/거짓 값, 심볼, `BigInt`를 포함해요. 객체나 함수와 같은 참조 타입과 구분할 때 유용해요.

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

// 원시 값들
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(Symbol('test'))); // true
console.log(isPrimitive(123n)); // true

// 참조 타입들 (원시 값 아님)
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
console.log(isPrimitive(new Date())); // false
console.log(isPrimitive(new Map())); // false
console.log(isPrimitive(new Set())); // false
console.log(isPrimitive(() => {})); // false
console.log(isPrimitive(/regex/)); // false
```

깊은 복사 로직을 구현할 때 유용해요.

```typescript
// 원시 값과 객체를 다르게 처리
function deepClone(value: any): any {
  if (isPrimitive(value)) {
    // 원시 값은 그대로 반환
    return value;
  }

  // 객체는 복제 로직 수행
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const result: any = {};
  for (const key in value) {
    result[key] = deepClone(value[key]);
  }
  return result;
}

// 값 비교에서 사용
function isEqual(a: unknown, b: unknown): boolean {
  if (isPrimitive(a) && isPrimitive(b)) {
    return a === b;
  }

  // 복잡한 객체 비교 로직...
  return false;
}

// 로깅에서 안전한 문자열 변환
function safeLog(value: unknown) {
  if (isPrimitive(value)) {
    console.log('원시 값:', value);
  } else {
    console.log('객체:', typeof value, Object.prototype.toString.call(value));
  }
}
```

타입 가드로 활용해서 안전하게 코드를 작성할 수 있어요.

```typescript
function processValue(input: unknown) {
  if (isPrimitive(input)) {
    // TypeScript가 input을 원시 타입으로 추론
    console.log('원시 값의 타입:', typeof input);
    console.log('원시 값:', input);
    return input;
  }

  // 여기서 input은 객체 타입으로 추론됨
  console.log('객체 타입입니다');
  return null;
}

// API 응답 검증
function validateApiResponse(data: unknown) {
  if (isPrimitive(data)) {
    return {
      type: 'primitive',
      value: data,
      serializable: true,
    };
  }

  return {
    type: 'object',
    value: data,
    serializable: false, // 추가 검증 필요
  };
}

// 설정 값 처리
function normalizeConfigValue(value: unknown) {
  if (isPrimitive(value)) {
    // 원시 값은 안전하게 문자열로 변환 가능
    return String(value);
  }

  // 객체는 JSON으로 직렬화
  try {
    return JSON.stringify(value);
  } catch {
    return '[복잡한 객체]';
  }
}
```

`String`, `Number`, `Boolean` 같은 래퍼 객체와 원시 값을 구분할 수 있어요.

```typescript
// 래퍼 객체들은 원시 값이 아님
console.log(isPrimitive(new String('hello'))); // false
console.log(isPrimitive(new Number(42))); // false
console.log(isPrimitive(new Boolean(true))); // false

// 하지만 실제 원시 값들은 true
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true

// valueOf()로 원시 값 추출 가능
const strObj = new String('hello');
console.log(isPrimitive(strObj.valueOf())); // true
```

#### 파라미터

- `value` (`unknown`): JavaScript 원시 값인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 원시 값이면 `true`, 그렇지 않으면 `false`를 반환해요.
