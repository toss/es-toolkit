# has (Lodash 호환성)

::: warning `Object.hasOwn` 또는 `in` 연산자를 사용하세요

이 `has` 함수는 복잡한 경로 파싱과 배열 인덱스 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.hasOwn()`이나 `in` 연산자를 사용하세요.

:::

객체에 지정된 경로의 속성이 존재하는지 확인해요.

```typescript
const exists = has(object, path);
```

## 레퍼런스

### `has(object, path)`

객체에 특정 경로의 속성이 있는지 확인하고 싶을 때 `has`를 사용하세요. 자체 속성(own property)만 확인하고 상속된 속성은 확인하지 않아요.

```typescript
import { has } from 'es-toolkit/compat';

// 단순 속성 확인
const object = { a: 1, b: 2 };
has(object, 'a');
// => true

// 중첩된 객체 확인
const nested = { a: { b: { c: 3 } } };
has(nested, 'a.b.c');
// => true
has(nested, ['a', 'b', 'c']);
// => true

// 존재하지 않는 속성
has(nested, 'a.b.d');
// => false

// 배열 인덱스 확인
const array = [1, 2, 3];
has(array, 2);
// => true
has(array, 5);
// => false
```

희소 배열(sparse array)에서도 올바르게 동작해요.

```typescript
import { has } from 'es-toolkit/compat';

const sparse = [1, , 3];  // 인덱스 1이 비어있음
has(sparse, 0);  // true
has(sparse, 1);  // false - 실제로 값이 없음
has(sparse, 2);  // true
```

#### 파라미터

- `object` (`any`): 검사할 객체예요.
- `path` (`PropertyPath`): 확인할 속성의 경로예요. 문자열, 숫자, 심볼, 또는 배열로 나타낼 수 있어요.

### 반환 값

(`boolean`): 경로의 속성이 존재하면 `true`, 그렇지 않으면 `false`를 반환해요.
