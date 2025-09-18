# isMatchWith (Lodash 호환성)

::: warning `es-toolkit`의 `isEqualWith`이나 직접 비교를 사용하세요

이 `isMatchWith` 함수는 복잡한 커스텀 비교와 부분 일치 검사로 인해 느리게 동작해요.

대신 더 빠른 `es-toolkit`의 [isEqualWith](../../predicate/isEqualWith.md)이나 직접적인 조건부 비교를 사용하세요.

:::

커스텀 비교 함수를 사용해서 객체가 부분적으로 일치하는지 확인해요.

```typescript
const result = isMatchWith(target, source, customizer);
```

## 레퍼런스

### `isMatchWith(target, source, customizer)`

커스텀 비교 로직이 필요할 때 `isMatchWith`를 사용하세요. 각 프로퍼티 비교에 대해 직접 제어할 수 있어요.

```typescript
import { isMatchWith } from 'es-toolkit/compat';

// 대소문자 구분 없는 문자열 비교
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // 기본 동작 사용
};

isMatchWith(
  { name: 'ALICE', age: 25 },
  { name: 'alice' },
  caseInsensitiveCompare
); // true

// 숫자 범위 비교
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith(
  { name: 'John', age: 25 },
  { age: { min: 18, max: 30 } },
  rangeCompare
); // true

// 배열 길이 비교
const lengthCompare = (objVal, srcVal, key) => {
  if (key === 'items' && Array.isArray(objVal) && typeof srcVal === 'number') {
    return objVal.length === srcVal;
  }
  return undefined;
};

isMatchWith(
  { items: ['a', 'b', 'c'], count: 3 },
  { items: 3 },
  lengthCompare
); // true

// 복잡한 조건부 비교
const conditionalCompare = (objVal, srcVal, key, object, source) => {
  // 특정 키에서만 특별한 로직 적용
  if (key === 'status') {
    return objVal === 'active' || srcVal === 'any';
  }
  
  // 중첩 객체에서 특별한 처리
  if (typeof objVal === 'object' && objVal !== null && srcVal?.special) {
    return objVal.id === srcVal.special;
  }
  
  return undefined; // 기본 동작
};

isMatchWith(
  { user: { id: 123, status: 'active' } },
  { user: { special: 123 }, status: 'any' },
  conditionalCompare
); // true
```

더 직접적이고 빠른 방법들:

```typescript
// es-toolkit의 isEqualWith 사용 (완전 비교)
import { isEqualWith } from 'es-toolkit';
isEqualWith(obj1, obj2, customizer);

// 직접적인 조건부 비교
function customMatch(target, source) {
  return target.name?.toLowerCase() === source.name?.toLowerCase() &&
         target.age >= source.minAge;
}

// 특정 프로퍼티만 비교
function partialMatch(target, pattern) {
  return Object.keys(pattern).every(key => {
    if (key === 'name') {
      return target[key]?.toLowerCase() === pattern[key]?.toLowerCase();
    }
    return target[key] === pattern[key];
  });
}
```

#### 파라미터

- `target` (`unknown`): 일치하는지 확인할 객체예요.
- `source` (`unknown`): 일치 패턴이 되는 객체예요.
- `customizer` (`function`, 선택): 비교 로직을 커스터마이징하는 함수예요. `true`, `false`, 또는 `undefined`를 반환해야 해요.

### 반환 값

(`boolean`): target이 source에 커스텀 로직으로 부분적으로 일치하면 `true`, 아니면 `false`를 반환해요.