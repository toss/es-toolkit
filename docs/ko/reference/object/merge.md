# merge

`source`가 가지고 있는 값들을 `target` 객체로 병합해요.

이 함수는 깊은 병합을 수행하는데요, 중첩된 객체나 배열도 재귀적으로 병합돼요.

- `source`와 `target`의 프로퍼티가 모두 객체 또는 배열이라면, 두 객체와 배열은 병합돼요.
- 만약에 `source`의 프로퍼티가 `undefined` 라면, `target`의 프로퍼티를 덮어씌우지 않아요.

[toMerged](./toMerged.md)와 다르게, 이 함수는 `target` 객체를 수정해요.

## 인터페이스

```typescript
function merge<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(target: T, source: S): T & S;
```

### 파라미터

- `target` (`T`): `source` 객체가 가지고 있는 프로퍼티를 병합할 객체. 이 객체는 함수에 의해 수정돼요.
- `source` (`S`): `target` 객체로 프로퍼티를 병합할 객체.

### 반환 값

(`T & S`): `source` 객체가 가지고 있는 프로퍼티가 병합된 `target` 객체.

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
