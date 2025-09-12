# mergeWith

사용자 정의 병합 함수를 사용해서 소스 객체를 대상 객체에 깊게 병합해서 대상 객체를 수정해요.

```typescript
const result = mergeWith(target, source, mergeFunction);
```

## 레퍼런스

### `mergeWith(target, source, merge)`

두 객체를 병합할 때 각 속성에 대해 사용자 정의 병합 로직을 적용하고 싶을 때 `mergeWith`를 사용하세요. 병합 함수가 `undefined`를 반환하면 기본 깊은 병합 로직을 사용해요.

```typescript
import { mergeWith } from 'es-toolkit/object';

// 숫자 값을 더해서 병합해요
const target = { a: 1, b: 2, c: { x: 10 } };
const source = { b: 3, c: { x: 20, y: 30 }, d: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue, key) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue; // 숫자는 더해요
  }
  // undefined를 반환하면 기본 병합 로직을 사용해요
});
// result와 target 모두 { a: 1, b: 5, c: { x: 30, y: 30 }, d: 4 }가 돼요

// 배열을 연결해서 병합해요
const arrayTarget = { items: [1, 2], metadata: { count: 2 } };
const arraySource = { items: [3, 4], metadata: { count: 2 } };

mergeWith(arrayTarget, arraySource, (targetValue, sourceValue) => {
  if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
    return targetValue.concat(sourceValue);
  }
});
// arrayTarget은 { items: [1, 2, 3, 4], metadata: { count: 2 } }가 돼요

// 키에 따라 다른 병합 로직 적용해요
const config = { timeout: 1000, retries: 3, features: { featureA: true } };
const updates = { timeout: 2000, retries: 5, features: { featureB: false } };

mergeWith(config, updates, (targetValue, sourceValue, key) => {
  if (key === 'timeout') {
    return Math.max(targetValue, sourceValue); // timeout은 더 큰 값 선택
  }
  if (key === 'retries') {
    return Math.min(targetValue, sourceValue); // retries는 더 작은 값 선택
  }
  // 다른 속성은 기본 병합 로직 사용
});
// config는 { timeout: 2000, retries: 3, features: { featureA: true, featureB: false } }가 돼요
```

#### 파라미터

- `target` (`T extends Record<PropertyKey, any>`): 소스 객체를 병합할 대상 객체예요. 이 객체가 수정돼요.
- `source` (`S extends Record<PropertyKey, any>`): 대상 객체에 병합할 소스 객체예요.
- `merge` (`(targetValue: any, sourceValue: any, key: string, target: T, source: S) => any`): 사용자 정의 병합 함수예요. 다음 파라미터를 받아요:
  - `targetValue`: 대상 객체의 현재 값
  - `sourceValue`: 소스 객체의 값
  - `key`: 병합 중인 속성의 키
  - `target`: 대상 객체
  - `source`: 소스 객체

#### 반환 값

(`T & S`): 소스 객체가 병합된 대상 객체를 반환해요.

## 예시

```typescript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
// 반환 값: { a: 1, b: 5, c: 4 }

const target = { a: [1], b: [2] };
const source = { a: [3], b: [4] };

const result = mergeWith(target, source, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 반환 값: { a: [1, 3], b: [2, 4] })
```

## 데모

::: sandpack

```ts index.ts
import { mergeWith } from 'es-toolkit';

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
console.log(result);
```

:::
