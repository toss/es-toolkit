# pick

지정된 키들에 해당하는 속성들만 포함한 새로운 객체를 반환해요.

```typescript
const result = pick(obj, keys);
```

## 사용법

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
  settings: { theme: 'dark' },
};
const picked = pick(nested, ['user', 'settings']);
// picked는 { user: { name: 'John', age: 30 }, settings: { theme: 'dark' } }가 돼요
```

#### 파라미터

- `obj` (`T extends Record<string, any>`): 속성들을 선택할 객체예요.
- `keys` (`readonly [...Keys]`): 객체에서 선택할 키들의 배열 또는 튜플이에요.

#### 반환 값

`keys`가 튜플인지 가변 길이 배열인지에 따라 반환 타입이 달라져요.

- `keys`가 **튜플**인 경우 (예: `['a', 'b']`): `Pick<T, 'a' | 'b'>`를 반환해요 — 지정된 키들이 모두 존재하는 것이 보장돼요.
- `keys`가 **가변 길이 배열**인 경우 (예: `keys: ('a' | 'b')[]`): `Partial<Pick<T, 'a' | 'b'>>`를 반환해요 — 배열에 실제로 포함된 키들만 결과 객체에 존재해요.
