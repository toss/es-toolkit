# isJSONArray

주어진 값이 유효한 JSON 배열인지 확인해요.

```typescript
const result = isJSONArray(value);
```

## 레퍼런스

### `isJSONArray(value)`

배열의 모든 요소가 유효한 JSON 값인지 확인하고 싶을 때 `isJSONArray`를 사용하세요. 유효한 JSON 배열이란 모든 항목이 JSON으로 직렬화할 수 있는 값(`null`, 객체, 배열, 문자열, 숫자, 참/거짓)으로만 구성된 배열이에요.

```typescript
import { isJSONArray } from 'es-toolkit/predicate';

// 유효한 JSON 배열들
console.log(isJSONArray([1, 2, 3])); // true
console.log(isJSONArray(['hello', 'world'])); // true
console.log(isJSONArray([true, false, null])); // true
console.log(isJSONArray([{ name: 'John' }, { name: 'Jane' }])); // true
console.log(isJSONArray([[1, 2], [3, 4]])); // true (중첩 배열)
console.log(isJSONArray([])); // true (빈 배열)

// 복합적인 유효한 JSON 배열
const complexArray = [
  42,
  'text',
  true,
  null,
  { key: 'value' },
  [1, 2, 3]
];
console.log(isJSONArray(complexArray)); // true
```

유효하지 않은 JSON 배열들과 구분해요:

```typescript
// 함수가 포함된 배열 - 유효하지 않음
console.log(isJSONArray([1, 2, () => {}])); // false
console.log(isJSONArray([function() {}])); // false

// undefined가 포함된 배열 - 유효하지 않음
console.log(isJSONArray([1, undefined, 3])); // false

// Symbol이 포함된 배열 - 유효하지 않음
console.log(isJSONArray([Symbol('test')])); // false

// Date 객체가 포함된 배열 - 유효하지 않음 (JSON에서는 문자열로 변환되어야 함)
console.log(isJSONArray([new Date()])); // false

// 배열이 아닌 값들
console.log(isJSONArray('not an array')); // false
console.log(isJSONArray({ 0: 'a', 1: 'b', length: 2 })); // false (유사 배열 객체)
console.log(isJSONArray(42)); // false
console.log(isJSONArray(null)); // false
```

API 응답 검증이나 데이터 직렬화 전 검증에서 유용해요:

```typescript
// API 응답 검증
function processApiArray(data: unknown) {
  if (isJSONArray(data)) {
    // 안전하게 JSON.stringify 사용 가능
    const jsonString = JSON.stringify(data);
    console.log('직렬화된 배열:', jsonString);
    return data;
  }
  
  throw new Error('유효한 JSON 배열이 아닙니다');
}

// 사용자 입력 데이터 검증
function validateUserList(input: unknown): any[] {
  if (isJSONArray(input)) {
    // TypeScript가 input을 any[]로 타입 추론
    return input;
  }
  
  return [];
}

// 설정 배열 검증
function loadArrayConfig(config: unknown) {
  if (isJSONArray(config)) {
    return {
      isValid: true,
      items: config,
      count: config.length
    };
  }
  
  return {
    isValid: false,
    items: [],
    count: 0
  };
}

// 중첩된 구조에서도 동작
const nestedData = [
  { users: [{ name: 'Alice' }, { name: 'Bob' }] },
  { users: [{ name: 'Charlie' }] }
];
console.log(isJSONArray(nestedData)); // true
```

다른 배열 유형들과의 차이점:

```typescript
// 일반 배열 vs JSON 배열
const regularArray = [1, 2, function() {}]; // 일반적으로는 유효한 배열
const jsonArray = [1, 2, 3]; // JSON 직렬화 가능한 배열

console.log(Array.isArray(regularArray)); // true (일반 배열 검사)
console.log(isJSONArray(regularArray)); // false (JSON 배열 검사)

console.log(Array.isArray(jsonArray)); // true
console.log(isJSONArray(jsonArray)); // true

// TypedArray는 JSON 배열이 아님
const typedArray = new Int32Array([1, 2, 3]);
console.log(Array.isArray(typedArray)); // false
console.log(isJSONArray(typedArray)); // false
```

#### 파라미터

- `value` (`unknown`): 유효한 JSON 배열인지 확인할 값이에요.

#### 반환 값

(`value is any[]`): 값이 유효한 JSON 배열이면 `true`, 그렇지 않으면 `false`를 반환해요.
