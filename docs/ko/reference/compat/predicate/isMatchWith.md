# isMatchWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 비교 함수를 사용해서 `target`과 `source`을 깊은 비교로 일치하는지 확인해요. 비교 함수로 값의 일치 여부를 세밀하게 제어할 수 있어요.

이 함수는 두 값을 재귀적으로 순회하면서 각 프로퍼티-값 쌍마다 커스텀 비교 함수를 호출해요. 비교 함수가 불리언 값을 반환하면 그 결과를 직접 사용하고, `undefined`를 반환하면 [isMatch](./isMatch.md)에서 사용하는 기본 비교 함수를 사용해요.

데이터 타입에 따라 값을 비교하는 방법이 달라져요.

- **객체**: `source`의 모든 프로퍼티가 `target`에 존재하고 일치하면 `true`.
- **배열**: `source` 배열의 모든 요소가 `target` 배열에서 찾을 수 있으면 `true`. (순서 무관)
- **Map**: `source` Map의 모든 키-값 쌍이 `target` Map에 존재하고 일치하면 `true`.
- **Set**: `source` Set의 모든 요소를 `target` Set에서 찾을 수 있으면 `true`.
- **함수**: 엄격한 동등성(`===`)으로 비교하고, 함수에 속성이 있다면 객체와 같이 비교.
- **원시 값**: 엄격한 동등성(`===`)으로 비교.

특별한 경우들은 다음과 같아요.

- `source`가 빈 객체, 배열, Map, Set라면, 항상 어떤 `target`과도 `true`를 반환해요.
- 자기 자신을 참조하는 객체는 내부 스택을 사용해서 무한 재귀를 방지해요.

## 인터페이스

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  compare?: (objValue: any, srcValue: any, key: PropertyKey, object: any, source: any, stack?: Map<any, any>) => unknown
): boolean;
```

### 파라미터

- `target` (`unknown`): 일치하는지 검사할 값.
- `source` (`unknown`): 일치하는지 비교할 패턴/템플릿.
- `compare` (`function`, 옵셔널): 선택적인 커스텀 비교 함수. 다음 인자들을 받아요:
  - `objValue`: 현재 경로의 target 값
  - `srcValue`: 현재 경로의 source 값
  - `key`: 비교 중인 프로퍼티 키나 배열 인덱스
  - `object`: target의 부모 객체/배열
  - `source`: source의 부모 객체/배열
  - `stack`: 순환 참조 감지에 사용되는 내부 Map
    일치하면 `true`, 일치하지 않으면 `false`, 기본 동작을 계속하려면 `undefined`를 반환해야 해요

### 반환 값

(`boolean`): 객체가 일치하면 `true`, 그렇지 않으면 `false`를 반환해요.

## 예시

### 비교 함수 없이 비교하기

```typescript
// Basic matching without custom comparator
isMatchWith({ a: 1, b: 2 }, { a: 1 }); // true
isMatchWith([1, 2, 3], [1, 3]); // true
```

### 문자열을 대소문자를 구분하지 않도록 비교하기

```typescript
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // Use default behavior for non-strings
};

isMatchWith({ name: 'JOHN', age: 30 }, { name: 'john' }, caseInsensitiveCompare); // true
```

### 숫자 범위를 비교하도록 비교 함수 정의하기

```typescript
// Custom comparison for range matching
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith({ name: 'John', age: 25 }, { age: { min: 18, max: 30 } }, rangeCompare); // true
```
