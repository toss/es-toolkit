# cloneWith (Lodash 호환성)

::: warning 커스텀 로직 구현을 권장해요

이 `cloneWith` 함수는 복잡한 커스터마이저 함수 처리로 인해 상대적으로 느려요.

대신 `clone`과 커스텀 로직을 직접 구현하는 방식을 사용하세요.

:::

커스터마이저 함수를 사용해서 객체의 얕은 복사본을 만들어요.

```typescript
const cloned = cloneWith(value, customizer);
```

## 레퍼런스

### `cloneWith(value, customizer?)`

복사 방식을 커스터마이징하고 싶을 때 `cloneWith`를 사용하세요. 커스터마이저 함수로 특정 값들의 복사 방식을 제어할 수 있어요.

```typescript
import { cloneWith } from 'es-toolkit/compat';

// 기본 사용법 (커스터마이저 없음)
const obj = { a: 1, b: 'hello' };
const cloned = cloneWith(obj);
// Returns: { a: 1, b: 'hello' } (새로운 객체 인스턴스)

// 숫자 값 변환
const obj2 = { a: 1, b: 2, c: 'text' };
const cloned2 = cloneWith(obj2, (value) => {
  if (typeof value === 'number') {
    return value * 2;
  }
  // undefined 반환 시 기본 복사 방식 사용
});
// Returns: { a: 2, b: 4, c: 'text' }

// 배열 요소 변환
const arr = [1, 2, 3];
const clonedArr = cloneWith(arr, (value) => {
  if (typeof value === 'number') {
    return value + 10;
  }
});
// Returns: [11, 12, 13]

// 특정 타입 처리
const complex = {
  date: new Date('2023-01-01'),
  number: 42,
  text: 'hello'
};
const clonedComplex = cloneWith(complex, (value) => {
  if (value instanceof Date) {
    // Date를 ISO 문자열로 변환
    return value.toISOString();
  }
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  // 다른 타입은 기본 복사
});
// Returns: { date: '2023-01-01T00:00:00.000Z', number: 42, text: 'HELLO' }
```

커스터마이저가 `undefined`를 반환하면 기본 복사 방식을 사용해요.

```typescript
import { cloneWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
const cloned = cloneWith(obj, (value) => {
  // 모든 값에 대해 undefined 반환 = 기본 복사
  return undefined;
});
// Returns: { a: 1, b: { c: 2 } } (clone과 동일한 결과)
```

#### 파라미터

- `value` (`T`): 복사할 값이에요.
- `customizer` (`function`, 선택적): 복사 방식을 결정하는 함수예요. `(value: any) => any` 형태예요.

### 반환 값

(`T`): 커스터마이저에 의해 처리된 얕은 복사본을 반환해요.
