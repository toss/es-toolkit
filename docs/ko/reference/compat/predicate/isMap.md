# isMap (Lodash 호환성)

::: warning es-toolkit의 [isMap](../../predicate/isMap.md)를 사용하세요

이 `isMap` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isMap](../../predicate/isMap.md)를 사용하세요.

:::

값이 Map인지 확인해요.

```typescript
const result = isMap(value);
```

## 사용법

### `isMap(value)`

값이 Map인지 타입 안전하게 확인하고 싶을 때 `isMap`을 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isMap } from 'es-toolkit/compat';

// Map 확인
const map = new Map();
isMap(map); // true

// 다른 타입들은 false
isMap(new Set()); // false
isMap(new WeakMap()); // false
isMap({}); // false
isMap([]); // false
isMap('map'); // false
isMap(123); // false
isMap(null); // false
isMap(undefined); // false
```

Map과 비슷한 다른 컬렉션들과도 구분해요.

```typescript
import { isMap } from 'es-toolkit/compat';

// Map vs Set vs WeakMap
isMap(new Map([['key', 'value']])); // true
isMap(new Set(['value'])); // false
isMap(new WeakMap()); // false

// Map vs 일반 객체
isMap({}); // false
isMap({ key: 'value' }); // false
isMap(Object.create(null)); // false
```

#### 파라미터

- `value` (`unknown`): Map인지 확인할 값이에요.

#### 반환 값

(`value is Map<any, any>`): 값이 Map이면 `true`, 아니면 `false`를 반환해요.
