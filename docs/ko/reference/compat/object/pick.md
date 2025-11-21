# pick (Lodash 호환성)

::: warning `es-toolkit`의 `pick`을 사용하세요

이 `pick` 함수는 복잡한 경로 처리, `get`/`set` 함수 호출, `null`/`undefined` 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [pick](../../object/pick.md)을 사용하세요.

:::

객체에서 지정한 속성들만 선택해서 새로운 객체를 만들어요.

```typescript
const result = pick(obj, ...keys);
```

## 사용법

### `pick(object, ...props)`

객체에서 원하는 속성들만 골라서 새로운 객체를 만들고 싶을 때 `pick`을 사용하세요. 배열로 여러 키를 한번에 전달하거나, 개별 인수로 하나씩 전달할 수 있어요. 깊은 키 경로도 지원하므로 중첩된 속성도 선택할 수 있어요.

```typescript
import { pick } from 'es-toolkit/compat';

// 기본 사용법
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// 결과: { a: 1, c: 3 }

// 개별 인수로 전달
const result2 = pick(obj, 'a', 'c');
// 결과: { a: 1, c: 3 }

// 깊은 경로 선택
const nested = {
  user: { profile: { name: 'John', age: 30 }, settings: { theme: 'dark' } },
  admin: true,
};
const userInfo = pick(nested, 'user.profile.name', 'admin');
// 결과: { user: { profile: { name: 'John' } }, admin: true }

// 배열과 개별 키 혼합
const mixed = { a: 1, b: 2, c: 3, d: { e: 4, f: 5 } };
const selected = pick(mixed, ['a', 'b'], 'c', 'd.e');
// 결과: { a: 1, b: 2, c: 3, d: { e: 4 } }

// 점 표기법 키와 실제 점이 있는 키 구분
const ambiguous = {
  'a.b': 1, // 실제로 'a.b'라는 키
  a: { b: 2, c: 3 }, // 중첩된 객체
};
const dotKey = pick(ambiguous, 'a.b');
// 결과: { 'a.b': 1 } (실제 키를 우선 선택)
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { pick } from 'es-toolkit/compat';

pick(null, ['a', 'b']); // {}
pick(undefined, ['a', 'b']); // {}
```

#### 파라미터

- `object` (`T | null | undefined`): 속성을 선택할 객체예요.
- `...props` (`Array<Many<PropertyPath>>`): 선택할 속성의 키들이에요. 단일 키, 키 배열, 또는 깊은 키 경로를 지정할 수 있어요.

#### 반환 값

(`Pick<T, U> | Partial<T>`): 지정한 속성들만 포함하는 새로운 객체를 반환해요.
