# sortKeys

키가 정렬된 새로운 객체를 생성해요.

```typescript
const sorted = sortKeys(object, compare?);
```

## 사용법

### `sortKeys(object, compare?)`

객체의 키를 일정한 순서로 정렬하고 싶을 때 `sortKeys`를 사용하세요. 기본적으로 키가 알파벳순으로 정렬되어서, 직렬화, 비교, 표시 등의 용도에 유용해요.

```typescript
import { sortKeys } from 'es-toolkit/object';

const sorted = sortKeys({ c: 3, a: 1, b: 2 });
// { a: 1, b: 2, c: 3 }
```

커스텀 비교 함수를 전달해서 다른 정렬 방식을 사용할 수도 있어요.

```typescript
// 역 알파벳 순으로 정렬해요
const reversed = sortKeys({ a: 1, b: 2, c: 3 }, (a, b) => b.localeCompare(a));
// { c: 3, b: 2, a: 1 }
```

값은 중첩된 객체나 배열을 포함해서 그대로 유지돼요.

```typescript
const obj = { z: [1, 2], a: { nested: true }, m: 'hello' };
const sorted = sortKeys(obj);
// { a: { nested: true }, m: 'hello', z: [1, 2] }
```

#### 파라미터

- `object` (`T`): 키를 정렬할 객체예요.
- `compare` (`(a: string, b: string) => number`, 선택): 키 정렬에 사용할 커스텀 비교 함수예요. 기본값은 알파벳순이에요.

#### 반환 값

(`T`): 키가 정렬된 새로운 객체를 반환해요.
