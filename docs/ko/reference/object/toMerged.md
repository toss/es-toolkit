# toMerged

대상 객체의 복사본에 소스 객체를 깊게 병합한 새로운 객체를 반환해요.

```typescript
const result = toMerged(target, source);
```

## 사용법

### `toMerged(target, source)`

두 객체를 깊게 병합하지만 원본 객체를 수정하고 싶지 않을 때 `toMerged`를 사용하세요. [merge](./merge.md)와 다르게 원본 `target` 객체는 수정되지 않고, 새로운 객체가 반환돼요.

```typescript
import { toMerged } from 'es-toolkit/object';

// 기본적인 객체 병합
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
// result는 { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }가 돼요
// target은 그대로 { a: 1, b: { x: 1, y: 2 } }로 유지돼요

// 배열도 병합돼요
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
const arrayResult = toMerged(arrayTarget, arraySource);
// arrayResult는 { a: [3, 2], b: { x: 1, y: 2 } }가 돼요
// arrayTarget은 변경되지 않아요

// null 값도 적절히 처리해요
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
const nullResult = toMerged(nullTarget, nullSource);
// nullResult는 { a: [1, 2, 3] }이 돼요
```

`undefined` 값은 기존 값을 덮어쓰지 않아요.

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
const result = toMerged(target, source);
// result는 { a: 1, b: 2, c: 3 }이 돼요 (b는 덮어쓰이지 않음)
```

#### 파라미터

- `target` (`T extends Record<PropertyKey, any>`): 병합될 대상 객체예요. 이 객체는 수정되지 않아요.
- `source` (`S extends Record<PropertyKey, any>`): 대상 객체에 병합할 소스 객체예요.

#### 반환 값

(`T & S`): 대상 객체와 소스 객체가 병합된 새로운 객체를 반환해요.

## 데모

::: sandpack

```ts index.ts
import { toMerged } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
console.log(result);
```

:::
