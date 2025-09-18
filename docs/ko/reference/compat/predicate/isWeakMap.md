# isWeakMap (Lodash 호환성)

::: warning `instanceof` 연산자를 사용하세요

이 `isWeakMap` 함수는 Lodash 호환성을 위한 함수이지만, 단순한 타입 확인이에요.

대신 더 간단하고 현대적인 `value instanceof WeakMap`을 사용하세요.

:::

값이 WeakMap인지 확인해요.

```typescript
const result = isWeakMap(value);
```

## 레퍼런스

### `isWeakMap(value)`

값이 WeakMap인지 타입 안전하게 확인하고 싶을 때 `isWeakMap`을 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap 확인
const weakMap = new WeakMap();
isWeakMap(weakMap); // true

// 다른 타입들은 false
isWeakMap(new Map()); // false
isWeakMap(new Set()); // false
isWeakMap(new WeakSet()); // false
isWeakMap({}); // false
isWeakMap([]); // false
isWeakMap('weakmap'); // false
isWeakMap(123); // false
isWeakMap(null); // false
isWeakMap(undefined); // false
```

WeakMap과 비슷한 다른 컬렉션들과도 구분해요.

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap vs Map
const obj = {};
const weakMap = new WeakMap([[obj, 'value']]);
const map = new Map([[obj, 'value']]);

isWeakMap(weakMap); // true
isWeakMap(map); // false

// WeakMap vs WeakSet
isWeakMap(new WeakMap()); // true
isWeakMap(new WeakSet()); // false

// WeakMap vs 일반 객체
isWeakMap(new WeakMap()); // true
isWeakMap({}); // false
```

WeakMap의 특별한 속성들을 활용할 때 유용해요.

```typescript
import { isWeakMap } from 'es-toolkit/compat';

function setupWeakReference(collection: unknown, key: object, value: any) {
  if (isWeakMap(collection)) {
    // WeakMap은 객체만 키로 사용할 수 있고, 약한 참조를 유지해요
    collection.set(key, value);
    console.log('WeakMap에 약한 참조로 저장했어요');

    // WeakMap은 크기를 알 수 없어요
    console.log('WeakMap은 크기 정보가 없어요');
  } else {
    console.log('WeakMap이 아니에요');
  }
}

const weakMap = new WeakMap();
const regularMap = new Map();
const obj = { id: 1 };

setupWeakReference(weakMap, obj, 'data'); // "WeakMap에 약한 참조로 저장했어요"
setupWeakReference(regularMap, obj, 'data'); // "WeakMap이 아니에요"
```

#### 파라미터

- `value` (`unknown`): WeakMap인지 확인할 값이에요.

### 반환 값

(`value is WeakMap<object, any>`): 값이 WeakMap이면 `true`, 아니면 `false`를 반환해요.
