# isWeakSet

주어진 값이 `WeakSet` 인스턴스인지 확인해요.

```typescript
const result = isWeakSet(value);
```

## 사용법

### `isWeakSet(value)`

값이 WeakSet 인스턴스인지 확인하고 싶을 때 `isWeakSet`을 사용하세요.

```typescript
import { isWeakSet } from 'es-toolkit/predicate';

// WeakSet 인스턴스들
const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet([{}, []]);

console.log(isWeakSet(weakSet1)); // true
console.log(isWeakSet(weakSet2)); // true

// WeakSet이 아닌 값들
console.log(isWeakSet(new Set())); // false
console.log(isWeakSet(new Map())); // false
console.log(isWeakSet(new WeakMap())); // false
console.log(isWeakSet([])); // false
console.log(isWeakSet({})); // false
console.log(isWeakSet(null)); // false
console.log(isWeakSet(undefined)); // false
```

#### 파라미터

- `value` (`unknown`): WeakSet 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is WeakSet<WeakKey>`): 값이 WeakSet 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
