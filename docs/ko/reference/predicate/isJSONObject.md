# isJSONObject

주어진 값이 유효한 JSON 객체인지 확인해요.

```typescript
const result = isJSONObject(value);
```

## 레퍼런스

### `isJSONObject(value)`

객체의 모든 키가 문자열이고 모든 값이 유효한 JSON 값인지 확인하고 싶을 때 `isJSONObject`를 사용하세요. 유효한 JSON 객체란 문자열 키와 JSON으로 직렬화할 수 있는 값(`null`, 객체, 배열, 문자열, 숫자, 참/거짓)으로만 구성된 순수 객체예요.

```typescript
import { isJSONObject } from 'es-toolkit/predicate';

// 유효한 JSON 객체들
console.log(isJSONObject({ name: 'John', age: 30 })); // true
console.log(isJSONObject({ active: true, score: null })); // true
console.log(isJSONObject({})); // true (빈 객체)

// 중첩된 구조도 검증
const nested = {
  user: {
    name: 'Alice',
    preferences: {
      theme: 'dark',
      notifications: true,
    },
  },
  data: [1, 2, 3],
  timestamp: null,
};
console.log(isJSONObject(nested)); // true

// 복합적인 유효한 JSON 객체
const complex = {
  id: 42,
  title: 'Example',
  published: true,
  tags: ['javascript', 'tutorial'],
  author: {
    name: 'Developer',
    email: 'dev@example.com',
  },
  metadata: null,
};
console.log(isJSONObject(complex)); // true
```

함수, `Symbol`, `Date` 객체, `undefined` 같은 JSON으로 직렬화할 수 없는 값이나 클래스 인스턴스가 포함된 유효하지 않은 JSON 객체들을 정확하게 구분해요.

```typescript
// 함수가 포함된 객체 - 유효하지 않음
console.log(isJSONObject({ name: 'John', greet: () => {} })); // false
console.log(isJSONObject({ method: function () {} })); // false

// undefined가 포함된 객체 - 유효하지 않음
console.log(isJSONObject({ name: 'John', age: undefined })); // false

// Symbol 키나 값이 포함된 객체 - 유효하지 않음
console.log(isJSONObject({ [Symbol('key')]: 'value' })); // false
console.log(isJSONObject({ name: Symbol('name') })); // false

// Date, RegExp 등의 객체 - 유효하지 않음
console.log(isJSONObject({ created: new Date() })); // false
console.log(isJSONObject({ pattern: /test/ })); // false

// 클래스 인스턴스 - 유효하지 않음
class Person {
  constructor(public name: string) {}
}
console.log(isJSONObject(new Person('John'))); // false

// 객체가 아닌 값들
console.log(isJSONObject('not an object')); // false
console.log(isJSONObject(42)); // false
console.log(isJSONObject([1, 2, 3])); // false
console.log(isJSONObject(null)); // false
```

`JSON.stringify` 를 안전하게 사용할 수 있는지 검증하기 위해 사용할 수 있어요.

```typescript
// API 응답 검증
function processApiResponse(data: unknown) {
  if (isJSONObject(data)) {
    // 안전하게 JSON.stringify 사용 가능
    const jsonString = JSON.stringify(data);
    console.log('직렬화된 객체:', jsonString);

    // TypeScript가 data를 Record<string, any>로 타입 추론
    return data;
  }

  throw new Error('유효한 JSON 객체가 아닙니다');
}

// 설정 객체 검증
function loadConfig(config: unknown) {
  if (isJSONObject(config)) {
    return {
      isValid: true,
      config,
      keys: Object.keys(config),
    };
  }

  return {
    isValid: false,
    config: {},
    keys: [],
  };
}

// 사용자 입력 데이터 검증
function validateUserData(input: unknown): Record<string, any> {
  if (isJSONObject(input)) {
    // 모든 속성이 JSON 직렬화 가능함을 보장
    return input;
  }

  throw new Error('사용자 데이터는 유효한 JSON 객체여야 합니다');
}

// 중첩된 객체 검증
function validateNestedConfig(data: unknown) {
  if (isJSONObject(data)) {
    // 중첩된 모든 객체와 배열도 JSON 유효성이 보장됨
    console.log('설정이 완전히 JSON 호환됩니다');
    return data;
  }

  return null;
}
```

`isJSONObject`는 다른 객체 검사 함수들과 다른 목적을 가져요. `isPlainObject`는 순수 객체인지 확인하지만, `isJSONObject`는 JSON으로 직렬화할 수 있는 객체인지 확인해요.

```typescript
import { isPlainObject } from 'es-toolkit/predicate';

const objectWithFunction = {
  name: 'John',
  greet: function () {
    return 'Hello';
  },
};

const plainJsonObject = {
  name: 'John',
  age: 30,
};

// 순수 객체 vs JSON 객체
console.log(isPlainObject(objectWithFunction)); // true (순수 객체)
console.log(isJSONObject(objectWithFunction)); // false (함수 포함으로 JSON 객체 아님)

console.log(isPlainObject(plainJsonObject)); // true
console.log(isJSONObject(plainJsonObject)); // true

// 빌트인 객체들
console.log(isPlainObject(new Date())); // false
console.log(isJSONObject(new Date())); // false

// 배열
console.log(isPlainObject([])); // false
console.log(isJSONObject([])); // false (배열은 JSON 값이지만 JSON "객체"는 아님)
```

#### 파라미터

- `value` (`unknown`): 유효한 JSON 객체인지 확인할 값이에요.

#### 반환 값

(`value is Record<string, any>`): 값이 유효한 JSON 객체이면 `true`, 그렇지 않으면 `false`를 반환해요.
