# hasIn (Lodash 호환성)

::: warning `in` 연산자를 사용하세요

이 `hasIn` 함수는 복잡한 경로 파싱과 프로토타입 체인 검사 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `in` 연산자나 `Object.hasOwn()` 함수를 사용하세요.

:::

객체에 지정된 경로의 속성이 존재하는지 상속된 속성까지 포함해서 확인해요.

```typescript
const exists = hasIn(object, path);
```

## 레퍼런스

### `hasIn(object, path)`

객체에 특정 경로의 속성이 있는지 확인하고 싶을 때 `hasIn`을 사용하세요. `has`와 달리 상속된 속성(프로토타입 체인의 속성)도 함께 확인해요.

```typescript
import { hasIn } from 'es-toolkit/compat';

// 자체 속성 확인
const object = { a: 1, b: 2 };
hasIn(object, 'a');
// => true

// 중첩된 객체 확인
const nested = { a: { b: { c: 3 } } };
hasIn(nested, 'a.b.c');
// => true
hasIn(nested, ['a', 'b', 'c']);
// => true

// 존재하지 않는 속성
hasIn(nested, 'a.b.d');
// => false

// 배열 인덱스 확인
const array = [1, 2, 3];
hasIn(array, 2);
// => true
hasIn(array, 5);
// => false
```

상속된 속성도 확인해요.

```typescript
import { hasIn } from 'es-toolkit/compat';

// 프로토타입 체인의 속성 확인
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - 상속된 속성도 찾음
has(rect, 'area'); // false - has는 자체 속성만 확인
```

`null`이나 `undefined`를 안전하게 처리해요.

```typescript
import { hasIn } from 'es-toolkit/compat';

hasIn(null, 'a');
// => false

hasIn(undefined, 'b');
// => false
```

#### 파라미터

- `object` (`any`): 검사할 객체예요.
- `path` (`PropertyPath`): 확인할 속성의 경로예요. 문자열, 숫자, 심볼, 또는 배열로 나타낼 수 있어요.

#### 반환 값

(`boolean`): 경로의 속성이 존재하면(자체 속성이든 상속된 속성이든) `true`, 그렇지 않으면 `false`를 반환해요.
