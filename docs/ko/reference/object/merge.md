# merge

소스 객체를 대상 객체에 깊게 병합해서 대상 객체를 수정해요.

```typescript
const result = merge(target, source);
```

## 레퍼런스

### `merge(target, source)`

두 객체를 깊게 병합하고 싶을 때 `merge`를 사용하세요. 중첩된 객체와 배열도 재귀적으로 병합돼요. [toMerged](./toMerged.md)와 다르게 원본 `target` 객체가 수정돼요.

```typescript
import { merge } from 'es-toolkit/object';

// 기본적인 객체 병합
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// result와 target 모두 { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }가 돼요

// 배열도 병합돼요
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
merge(arrayTarget, arraySource);
// arrayTarget은 { a: [3, 2], b: { x: 1, y: 2 } }가 돼요

// null 값도 적절히 처리해요
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
merge(nullTarget, nullSource);
// nullTarget은 { a: [1, 2, 3] }이 돼요
```

`undefined` 값은 기존 값을 덮어쓰지 않아요.

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
merge(target, source);
// target은 { a: 1, b: 2, c: 3 }이 돼요 (b는 덮어쓰이지 않음)
```

#### 파라미터

- `target` (`T extends Record<PropertyKey, any>`): 소스 객체를 병합할 대상 객체예요. 이 객체가 수정돼요.
- `source` (`S extends Record<PropertyKey, any>`): 대상 객체에 병합할 소스 객체예요.

#### 반환 값

(`T & S`): 소스 객체가 병합된 대상 객체를 반환해요.

## 예시

```typescript
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
// 반환 값: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

const target = { a: [1, 2], b: { x: 1 } };
const source = { a: [3], b: { y: 2 } };
const result = merge(target, source);
console.log(result);
// 반환 값: { a: [3, 2], b: { x: 1, y: 2 } }

const target = { a: null };
const source = { a: [1, 2, 3] };
const result = merge(target, source);
console.log(result);
// 반환 값: { a: [1, 2, 3] }
```

## 데모

::: sandpack

```ts index.ts
import { merge } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
```

:::

## 성능 비교

|                   | [번들 사이즈](../../bundle-size.md) | [런타임 성능](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 271 바이트 (97.8% 작음)             | 1,952,436 회 (3.65× 빠름)           |
| es-toolkit/compat | 4,381 바이트 (64.9% 작음)           | 706,558 회 (1.32× 빠름)             |
| lodash-es         | 12,483 바이트                       | 533,484 회                          |
