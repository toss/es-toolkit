# isJSONValue

주어진 값이 유효한 JSON 값인지 확인해요.

```typescript
const result = isJSONValue(value);
```

## 사용법

### `isJSONValue(value)`

값이 JSON으로 직렬화할 수 있는 유효한 값인지 확인하고 싶을 때 `isJSONValue`를 사용하세요. JSON 명세에 따라 유효한 값은 `null`, 객체, 배열, 문자열, 숫자, 참/거짓 값이에요. 이 함수는 다른 JSON 관련 타입 가드들의 기반이 되는 함수예요.

```typescript
import { isJSONValue } from 'es-toolkit/predicate';

// 원시 JSON 값들
console.log(isJSONValue(null)); // true
console.log(isJSONValue('hello')); // true
console.log(isJSONValue(42)); // true
console.log(isJSONValue(true)); // true
console.log(isJSONValue(false)); // true

// 객체와 배열 (내부 값들도 모두 유효해야 함)
console.log(isJSONValue({ name: 'John', age: 30 })); // true
console.log(isJSONValue([1, 2, 3, 'text'])); // true
console.log(isJSONValue([])); // true (빈 배열)
console.log(isJSONValue({})); // true (빈 객체)

// 중첩된 구조
const complexData = {
  user: {
    name: 'Alice',
    active: true,
    scores: [95, 87, 92],
  },
  metadata: null,
};
console.log(isJSONValue(complexData)); // true
```

JSON으로 직렬화할 수 없는 값들을 정확하게 구분해요. 함수, `undefined`, `Symbol`, 클래스 인스턴스 등은 JSON 명세에서 지원하지 않는 타입이므로 `false`를 반환해요:

```typescript
// undefined는 JSON에서 지원되지 않음
console.log(isJSONValue(undefined)); // false

// 함수들은 JSON으로 직렬화할 수 없음
console.log(isJSONValue(() => {})); // false
console.log(isJSONValue(function () {})); // false

// Symbol은 JSON에서 지원되지 않음
console.log(isJSONValue(Symbol('test'))); // false

// Date 객체는 JSON에서 문자열로 변환되어야 함
console.log(isJSONValue(new Date())); // false

// RegExp 객체도 JSON에서 지원되지 않음
console.log(isJSONValue(/pattern/)); // false

// 함수나 undefined가 포함된 객체/배열
console.log(isJSONValue({ name: 'John', greet: () => {} })); // false
console.log(isJSONValue([1, 2, undefined])); // false

// BigInt는 JSON에서 지원되지 않음
console.log(isJSONValue(BigInt(123))); // false
```

JSON 직렬화 전 데이터 검증에서 유용해요:

```typescript
// 안전한 JSON 직렬화
function safeJsonStringify(data: unknown): string | null {
  if (isJSONValue(data)) {
    // data가 유효한 JSON 값임이 보장됨
    return JSON.stringify(data);
  }

  console.warn('데이터가 JSON 직렬화 가능하지 않습니다');
  return null;
}

// API 요청 데이터 검증
function sendApiRequest(data: unknown) {
  if (isJSONValue(data)) {
    const jsonPayload = JSON.stringify(data);
    // API 요청 전송
    console.log('전송할 데이터:', jsonPayload);
    return fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonPayload,
    });
  }

  throw new Error('API 데이터는 JSON 직렬화 가능해야 합니다');
}

// localStorage 저장 전 검증
function saveToStorage(key: string, value: unknown) {
  if (isJSONValue(value)) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  console.error('localStorage에 저장할 수 없는 데이터 타입입니다');
  return false;
}

// 설정 파일 검증
function validateConfig(config: unknown) {
  if (isJSONValue(config)) {
    return {
      isValid: true,
      config,
      serialized: JSON.stringify(config),
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Config must be a valid JSON value',
  };
}
```

다른 타입 가드들과 조합해서 사용할 수 있어요.

```typescript
// 구체적인 JSON 타입 확인
function processJsonData(data: unknown) {
  if (!isJSONValue(data)) {
    throw new Error('Invalid JSON value');
  }

  // 이제 data는 유효한 JSON 값임이 보장됨
  if (isJSONObject(data)) {
    console.log('JSON 객체입니다:', Object.keys(data));
  } else if (isJSONArray(data)) {
    console.log('JSON 배열입니다:', data.length, '개 항목');
  } else {
    console.log('원시 JSON 값입니다:', typeof data, data);
  }
}

// 중첩된 데이터 검증
const testData = {
  valid: { name: 'test', values: [1, 2, 3] },
  invalid: { name: 'test', callback: () => {} },
};

console.log(isJSONValue(testData.valid)); // true
console.log(isJSONValue(testData.invalid)); // false
```

엣지 케이스들:

```typescript
// 특수 숫자 값들
console.log(isJSONValue(Infinity)); // false (JSON에서 null로 변환됨)
console.log(isJSONValue(-Infinity)); // false
console.log(isJSONValue(NaN)); // false (JSON에서 null로 변환됨)

// 빈 값들
console.log(isJSONValue('')); // true (빈 문자열)
console.log(isJSONValue(0)); // true
console.log(isJSONValue(false)); // true

// 프로토타입이 있는 객체들
const obj = Object.create({ inherited: 'value' });
obj.own = 'property';
console.log(isJSONValue(obj)); // true (순수 객체로 처리)
```

#### 파라미터

- `value` (`unknown`): 유효한 JSON 값인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 유효한 JSON 값이면 `true`, 그렇지 않으면 `false`를 반환해요.
