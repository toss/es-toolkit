# isWeakMap

주어진 값이 `WeakMap` 인스턴스인지 확인해요.

```typescript
const result = isWeakMap(value);
```

## 사용법

### `isWeakMap(value)`

값이 `WeakMap` 인스턴스인지 확인하고 싶을 때 `isWeakMap`을 사용하세요. `WeakMap`은 약한 참조로 객체를 키로 하는 키-값 저장소로, 메모리 누수를 방지할 때 유용해요.

```typescript
import { isWeakMap } from 'es-toolkit/predicate';

// WeakMap 인스턴스들
const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, 'value']]);

console.log(isWeakMap(weakMap1)); // true
console.log(isWeakMap(weakMap2)); // true

// WeakMap이 아닌 값들
console.log(isWeakMap(new Map())); // false
console.log(isWeakMap(new Set())); // false
console.log(isWeakMap(new WeakSet())); // false
console.log(isWeakMap({})); // false
console.log(isWeakMap([])); // false
console.log(isWeakMap(null)); // false
console.log(isWeakMap(undefined)); // false
```

#### 파라미터

- `value` (`unknown`): WeakMap 인스턴스인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 WeakMap 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
