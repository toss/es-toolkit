# set (Lodash 호환성)

::: warning 직접 할당을 사용하세요

이 `set` 함수는 내부적으로 `updateWith` 함수를 호출하여 복잡한 경로 처리와 객체 생성 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 할당이나 구조 분해 할당을 사용하세요.

:::

객체의 지정된 경로에 값을 설정해요.

```typescript
const result = set(obj, path, value);
```

## 레퍼런스

### `set(object, path, value)`

객체의 특정 경로에 값을 설정하고 싶을 때 `set`을 사용하세요. 경로의 일부가 존재하지 않으면 자동으로 생성해요. 중첩된 객체나 배열을 다룰 때 유용해요.

```typescript
import { set } from 'es-toolkit/compat';

// 기본 사용법
const obj = { a: { b: { c: 3 } } };
set(obj, 'a.b.c', 4);
console.log(obj.a.b.c); // 4

// 배열에 값 설정
const arr = [1, 2, 3];
set(arr, '1', 4);
console.log(arr[1]); // 4

// 존재하지 않는 경로 생성
const empty = {};
set(empty, 'user.profile.name', 'John');
console.log(empty);
// 결과: { user: { profile: { name: 'John' } } }

// 배열 경로 사용
const data = {};
set(data, ['nested', 'array', 0], 'first item');
console.log(data);
// 결과: { nested: { array: ['first item'] } }

// 배열 인덱스 자동 생성
const list = {};
set(list, 'items[0]', 'first');
set(list, 'items[2]', 'third');
console.log(list);
// 결과: { items: ['first', undefined, 'third'] }

// 중첩된 객체와 배열 혼합
const complex = {};
set(complex, 'users[0].profile.settings.theme', 'dark');
console.log(complex);
// 결과: { users: [{ profile: { settings: { theme: 'dark' } } }] }

// 숫자 키 처리
const numeric = {};
set(numeric, 123, 'number key');
console.log(numeric[123]); // 'number key'

// 기존 값 덮어쓰기
const existing = { a: { b: 'old' } };
set(existing, 'a.b', 'new');
console.log(existing.a.b); // 'new'
```

원본 객체가 직접 수정되고 반환돼요.

```typescript
import { set } from 'es-toolkit/compat';

const original = { x: 1 };
const result = set(original, 'y', 2);

console.log(original === result); // true
console.log(original); // { x: 1, y: 2 }
```

#### 파라미터

- `object` (`T`): 값을 설정할 객체예요.
- `path` (`PropertyPath`): 값을 설정할 속성의 경로예요. 문자열, 배열, 또는 키의 배열이 될 수 있어요.
- `value` (`any`): 설정할 값이에요.

#### 반환 값

(`T`): 수정된 객체를 반환해요 (원본 객체와 동일).
