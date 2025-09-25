# isSet (Lodash 호환성)

::: warning `es-toolkit`의 [isSet](../../predicate/isSet.md)를 사용하세요

이 `isSet` 함수는 Lodash 호환성을 위한 함수이지만, 메인 라이브러리와 같은 구현이에요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isSet](../../predicate/isSet.md)를 사용하세요.

:::

값이 Set인지 확인해요.

```typescript
const result = isSet(value);
```

## 레퍼런스

### `isSet(value)`

값이 Set인지 타입 안전하게 확인하고 싶을 때 `isSet`를 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isSet } from 'es-toolkit/compat';

// Set 확인
const set = new Set();
isSet(set); // true

// 다른 타입들은 false
isSet(new Map()); // false
isSet(new WeakSet()); // false
isSet([]); // false
isSet({}); // false
isSet('set'); // false
isSet(123); // false
isSet(null); // false
isSet(undefined); // false
```

Set과 비슷한 다른 컬렉션들과도 구분해요.

```typescript
import { isSet } from 'es-toolkit/compat';

// Set vs Map vs WeakSet
isSet(new Set([1, 2, 3])); // true
isSet(new Map([['key', 'value']])); // false
isSet(new WeakSet()); // false

// Set vs 배열
isSet(new Set([1, 2, 3])); // true
isSet([1, 2, 3]); // false

// Set vs 일반 객체
isSet(new Set()); // true
isSet({}); // false
isSet(Object.create(null)); // false
```

#### 파라미터

- `value` (`unknown`): Set인지 확인할 값이에요.

#### 반환 값

(`value is Set<any>`): 값이 Set이면 `true`, 아니면 `false`를 반환해요.
