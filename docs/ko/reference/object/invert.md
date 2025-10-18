# invert

객체의 키와 값을 뒤바꾼 새 객체를 생성해요.

```typescript
const inverted = invert(obj);
```

## 레퍼런스

### `invert(obj)`

객체의 키와 값을 뒤바꾼 새로운 객체를 만들고 싶을 때 `invert`를 사용하세요. 원본 객체의 키는 새 객체의 값이 되고, 원본 객체의 값은 새 객체의 키가 돼요. 중복된 값이 있으면 나중에 나오는 키가 사용돼요.

```typescript
import { invert } from 'es-toolkit/object';

// 기본 사용법
const original = { a: 1, b: 2, c: 3 };
const inverted = invert(original);
console.log(inverted); // { 1: 'a', 2: 'b', 3: 'c' }

// 중복된 값이 있는 경우
const withDuplicates = { a: 1, b: 1, c: 2 };
const result = invert(withDuplicates);
console.log(result); // { 1: 'b', 2: 'c' } (나중에 나오는 'b'가 키 1의 값으로 사용됨)

// 문자열 키와 숫자 값
const grades = { alice: 85, bob: 92, charlie: 88 };
const invertedGrades = invert(grades);
console.log(invertedGrades); // { 85: 'alice', 92: 'bob', 88: 'charlie' }
```

다양한 타입의 키와 값으로 사용할 수 있어요.

```typescript
// 숫자 키와 문자열 값
const statusCodes = { 200: 'OK', 404: 'Not Found', 500: 'Internal Server Error' };
const invertedCodes = invert(statusCodes);
console.log(invertedCodes);
// { 'OK': '200', 'Not Found': '404', 'Internal Server Error': '500' }

// 역방향 조회가 필요한 경우 유용해요
const userRoles = { admin: 'administrator', user: 'regular_user', guest: 'visitor' };
const roleToKey = invert(userRoles);
console.log(roleToKey);
// { 'administrator': 'admin', 'regular_user': 'user', 'visitor': 'guest' }

// 이제 값으로 키를 찾을 수 있어요
function findRoleKey(roleName: string) {
  return roleToKey[roleName];
}
console.log(findRoleKey('administrator')); // 'admin'
```

열거형(Enum)이나 상수 객체와 함께 사용하면 유용해요.

```typescript
// 색상 코드 매핑
const colorCodes = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
};

const codeToColor = invert(colorCodes);
console.log(codeToColor);
// { '#FF0000': 'red', '#00FF00': 'green', '#0000FF': 'blue' }

// 이제 색상 코드로 색상 이름을 찾을 수 있어요
function getColorName(code: string) {
  return codeToColor[code] || 'unknown';
}
console.log(getColorName('#FF0000')); // 'red'
```

#### 파라미터

- `obj` (`Record<K, V>`): 키와 값을 뒤바꿀 객체예요. 키와 값 모두 문자열, 숫자, 또는 심볼이어야 해요.

#### 반환 값

(`Record<V, K>`): 원본 객체의 키와 값이 뒤바뀐 새 객체예요.
