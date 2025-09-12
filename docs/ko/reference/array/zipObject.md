# zipObject

키 배열과 값 배열을 받아서 하나의 객체로 결합해요.

이 함수는 두 개의 배열을 받아요. 첫 번째 배열은 객체의 프로퍼티 이름(키)이 되고, 두 번째 배열은 해당 프로퍼티의 값이 돼요. 키 배열이 값 배열보다 길면, 대응하는 값이 없는 키들은 `undefined` 값을 가져요. 값 배열이 더 길면, 초과하는 값들은 무시돼요.

## 인터페이스

```typescript
function zipObject<P extends PropertyKey, V>(
  keys: readonly P[], 
  values: readonly V[]
): Record<P, V>;
```

### 파라미터

- `keys` (`readonly P[]`): 객체의 프로퍼티 이름으로 사용할 키 배열이에요. (`P`는 `PropertyKey` 타입이에요)
- `values` (`readonly V[]`): 각 키에 대응하는 값 배열이에요.

### 반환 값

(`Record<P, V>`): 키와 값이 결합된 새 객체예요.

## 예시

```typescript
import { zipObject } from 'es-toolkit/array';

// 기본 사용법
const keys = ['name', 'age', 'city'];
const values = ['Alice', 30, 'New York'];
const result = zipObject(keys, values);
console.log(result);
// 출력: { name: 'Alice', age: 30, city: 'New York' }

// 키 배열이 값 배열보다 긴 경우
const keys2 = ['a', 'b', 'c', 'd'];
const values2 = [1, 2, 3];
const result2 = zipObject(keys2, values2);
console.log(result2);
// 출력: { a: 1, b: 2, c: 3, d: undefined }

// 값 배열이 키 배열보다 긴 경우
const keys3 = ['x', 'y'];
const values3 = [10, 20, 30, 40];
const result3 = zipObject(keys3, values3);
console.log(result3);
// 출력: { x: 10, y: 20 } (30, 40은 무시됨)

// 빈 배열들
const emptyKeys: string[] = [];
const emptyValues: number[] = [];
const result4 = zipObject(emptyKeys, emptyValues);
console.log(result4);
// 출력: {}

// 숫자 키 사용
const numKeys = [1, 2, 3];
const strValues = ['first', 'second', 'third'];
const result5 = zipObject(numKeys, strValues);
console.log(result5);
// 출력: { 1: 'first', 2: 'second', 3: 'third' }

// 실용적인 예시: 폼 데이터 생성
const formFields = ['username', 'email', 'password'];
const userInput = ['john_doe', 'john@example.com', 'secretPass123'];
const formData = zipObject(formFields, userInput);
console.log(formData);
// 출력: { username: 'john_doe', email: 'john@example.com', password: 'secretPass123' }
```

## Lodash 호환성

`es-toolkit/compat`에서 `zipObject`를 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { zipObject } from 'es-toolkit/compat';

const result = zipObject(['a', 'b', 'c'], [1, 2, 3]);
// 결과: { a: 1, b: 2, c: 3 }
```
