# unset (Lodash 호환성)

::: warning `delete` 연산자를 사용하세요

이 `unset` 함수는 복잡한 경로 파싱과 중첩 객체 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `delete` 연산자를 직접 사용하세요.

:::

객체의 지정된 경로에 있는 속성을 제거해요.

```typescript
const success = unset(obj, path);
```

## 사용법

### `unset(obj, path)`

중첩된 객체에서 특정 경로의 속성을 삭제하고 싶을 때 `unset`을 사용하세요. 경로는 문자열이나 배열로 지정할 수 있어요.

```typescript
import { unset } from 'es-toolkit/compat';

// 문자열 경로로 중첩 속성 제거
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // => true
console.log(obj); // { a: { b: {} } }

// 배열 경로로 중첩 속성 제거
const obj2 = { a: { b: { c: 42 } } };
unset(obj2, ['a', 'b', 'c']); // => true
console.log(obj2); // { a: { b: {} } }
```

배열 인덱스로도 요소를 제거할 수 있어요.

```typescript
import { unset } from 'es-toolkit/compat';

const arr = [1, 2, 3, 4];
unset(arr, 1); // => true
console.log(arr); // [1, undefined, 3, 4] (요소가 삭제되고 undefined가 됨)
```

속성이 존재하지 않거나 이미 삭제된 경우에도 `true`를 반환해요.

```typescript
import { unset } from 'es-toolkit/compat';

const obj = { a: { b: 1 } };
unset(obj, 'a.c'); // => true (존재하지 않는 속성)
```

`null`이나 `undefined` 객체는 안전하게 처리돼요.

```typescript
import { unset } from 'es-toolkit/compat';

unset(null, 'a.b'); // => true
unset(undefined, 'a.b'); // => true
```

#### 파라미터

- `obj` (`any`): 수정할 객체예요.
- `path` (`PropertyKey | PropertyKey[]`): 제거할 속성의 경로예요.

#### 반환 값

(`boolean`): 속성이 삭제되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환해요.
