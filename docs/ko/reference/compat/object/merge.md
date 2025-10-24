# merge (Lodash 호환성)

::: warning `es-toolkit`의 `merge`를 사용하세요

이 `merge` 함수는 내부적으로 복잡한 `mergeWith` 함수를 호출하여 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [merge](../../object/merge.ts)를 사용하세요.

:::

여러 객체를 깊게 병합해서 하나의 객체로 만들어요.

```typescript
const result = merge(target, ...sources);
```

## 레퍼런스

### `merge(object, ...sources)`

대상 객체에 하나 이상의 소스 객체를 깊게 병합해요. 중첩된 객체와 배열도 재귀적으로 병합돼요. 소스 객체의 속성이 `undefined`이면 대상 객체의 기존 값을 덮어쓰지 않아요. 객체 설정 병합이나 기본값 적용에 유용해요.

```typescript
import { merge } from 'es-toolkit/compat';

// 기본 객체 병합
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// 결과: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

// 배열 병합
const obj1 = { arr: [1, 2] };
const obj2 = { arr: [3, 4] };
const merged = merge(obj1, obj2);
// 결과: { arr: [3, 4] } (배열은 교체됨)

// 여러 객체 병합
const base = { a: 1 };
const ext1 = { b: 2 };
const ext2 = { c: 3 };
const ext3 = { d: 4 };
const combined = merge(base, ext1, ext2, ext3);
// 결과: { a: 1, b: 2, c: 3, d: 4 }

// 중첩된 객체 병합
const config = {
  api: { url: 'https://api.example.com', timeout: 5000 },
  features: { auth: true },
};
const overrides = {
  api: { timeout: 10000, retries: 3 },
  features: { analytics: true },
};
const finalConfig = merge(config, overrides);
// 결과: {
//   api: { url: 'https://api.example.com', timeout: 10000, retries: 3 },
//   features: { auth: true, analytics: true }
// }
```

대상 객체가 수정되므로 원본을 보존하려면 빈 객체를 사용하세요.

```typescript
import { merge } from 'es-toolkit/compat';

const original = { a: 1, b: { x: 1 } };
const source = { b: { y: 2 } };

// 원본 보존
const result = merge({}, original, source);
// original은 변경되지 않음
```

#### 파라미터

- `object` (`any`): 병합 대상이 되는 객체예요. 이 객체가 수정돼요.
- `...sources` (`any[]`): 병합할 소스 객체들이에요.

#### 반환 값

(`any`): 병합된 대상 객체를 반환해요.
