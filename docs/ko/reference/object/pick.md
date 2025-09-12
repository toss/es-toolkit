# pick

지정된 키들에 해당하는 속성들만 포함한 새로운 객체를 반환해요.

```typescript
const result = pick(obj, keys);
```

## 레퍼런스

### `pick(obj, keys)`

객체에서 특정 키들에 해당하는 속성들만 선택하고 싶을 때 `pick`을 사용하세요. 지정된 키에 해당하는 속성들만 포함한 새로운 객체를 반환해요.

```typescript
import { pick } from 'es-toolkit/object';

// 특정 키들만 선택해요
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// result는 { a: 1, c: 3 }이 돼요

// 존재하지 않는 키를 지정해도 무시돼요
const safe = pick(obj, ['a', 'nonexistent']);
// safe는 { a: 1 }이 돼요

// 중첵된 객체에서도 사용할 수 있어요
const nested = {
  user: { name: 'John', age: 30 },
  posts: ['post1', 'post2'],
  settings: { theme: 'dark' }
};
const picked = pick(nested, ['user', 'settings']);
// picked는 { user: { name: 'John', age: 30 }, settings: { theme: 'dark' } }가 돼요
```

#### 파라미터

- `obj` (`T extends Record<string, any>`): 속성들을 선택할 객체예요.
- `keys` (`readonly K[]`): 객체에서 선택할 키들의 배열이에요.

#### 반환 값

(`Pick<T, K>`): 지정된 키들에 해당하는 속성들만 포함한 새로운 객체를 반환해요.

## Lodash와의 호환성

`es-toolkit/compat`에서 `pick` 함수를 가져오면, 깊은 경로를 선택할 수 있어요.

```typescript
import { pick } from 'es-toolkit/compat';

const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
const result = pick(obj, ['a.b.c', 'f.g']);
// 결괏값: { a: { b: { c: 1 } }, 'f.g': 4 }
```
