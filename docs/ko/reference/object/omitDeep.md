# omitDeep

지정된 중첩 경로들을 제외한 새로운 객체를 반환해요.

```typescript
const result = omitDeep(object, paths);
```

## 사용법

### `omitDeep(object, paths)`

객체에서 특정 중첩 속성들을 제외하고 싶을 때 `omitDeep`을 사용하세요. 점(`.`)으로 구분된 경로에 해당하는 속성들을 제거한 새로운 객체를 반환해요. 중첩된 객체와 배열 내의 객체들도 재귀적으로 처리돼요.

```typescript
import { omitDeep } from 'es-toolkit/object';

// 중첩된 속성을 제외해요
const obj = { a: 1, b: { x: 2, y: 3 }, c: 4 };
const result = omitDeep(obj, ['b.x']);
// result는 { a: 1, b: { y: 3 }, c: 4 }가 돼요

// 깊게 중첩된 속성을 제외해요
const nested = {
  user: {
    id: 1,
    profile: {
      name: 'John',
      email: 'john@example.com',
    },
  },
};
const nestedResult = omitDeep(nested, ['user.profile.email']);
// nestedResult는 {
//   user: {
//     id: 1,
//     profile: {
//       name: 'John',
//     },
//   },
// }가 돼요

// 배열 내 모든 객체에서 특정 속성을 제외해요
const users = {
  users: [
    { id: 1, secret: 'abc' },
    { id: 2, secret: 'def' },
  ],
};
const withoutSecrets = omitDeep(users, ['users.secret']);
// withoutSecrets는 {
//   users: [
//     { id: 1 },
//     { id: 2 },
//   ],
// }가 돼요

// 중첩된 객체나 배열 전체를 제외해요
const data = {
  user: { id: 1, profile: { name: 'John' } },
  items: [1, 2, 3],
};
const trimmed = omitDeep(data, ['user.profile', 'items']);
// trimmed는 { user: { id: 1 } }가 돼요
```

#### 파라미터

- `object` (`T`): 경로를 제외할 객체예요.
- `paths` (`readonly string[]`): 객체에서 제외할 점으로 구분된 경로들의 배열이에요.

#### 반환 값

(`OmitDeep<T, P>`): 지정된 경로들이 제외된 새로운 객체를 반환해요.
