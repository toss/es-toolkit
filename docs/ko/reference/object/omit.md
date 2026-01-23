# omit

지정된 키들을 제외한 새로운 객체를 반환해요.

```typescript
const result = omit(obj, keys);
```

## 사용법

### `omit(obj, keys)`

객체에서 특정 키들만 제외하고 싶을 때 `omit`을 사용하세요. 지정된 키에 해당하는 속성들을 제거한 새로운 객체를 반환해요.

```typescript
import { omit } from 'es-toolkit/object';

// 특정 키들을 제외해요
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = omit(obj, ['b', 'c']);
// result는 { a: 1, d: 4 }가 돼요

// 존재하지 않는 키를 지정해도 에러가 발생하지 않아요
const safe = omit(obj, ['b', 'nonexistent']);
// safe는 { a: 1, c: 3, d: 4 }가 돼요
```

#### 파라미터

- `obj` (`T extends Record<string, any>`): 키를 제외할 객체예요.
- `keys` (`readonly K[]`): 객체에서 제외할 키들의 배열이에요.

#### 반환 값

(`Omit<T, K>`): 지정된 키들이 제외된 새로운 객체를 반환해요.
