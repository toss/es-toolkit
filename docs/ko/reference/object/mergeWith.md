# mergeWith

`source`가 가지고 있는 값들을 `target` 객체로 병합해요.

어떻게 프로퍼티를 병합하는지 지정하기 위해서 `merge` 함수 인자를 정의하세요. `merge` 함수 인자는 `target` 객체에 설정될 값을 반환해야 해요.

만약 `undefined`를 반환한다면, 기본적으로 두 값을 깊이 병합해요. 깊은 병합에서는, 중첩된 객체나 배열을 다음과 같이 재귀적으로 병합해요.

- `source`와 `target`의 프로퍼티가 모두 객체 또는 배열이라면, 두 객체와 배열은 병합돼요.
- 만약에 `source`의 프로퍼티가 `undefined` 라면, `target`의 프로퍼티를 덮어씌우지 않아요.

이 함수는 `target` 객체를 수정해요.

## 인터페이스

```typescript
function mergeWith<T, S>(
  target: T,
  source: S,
  merge: (targetValue: any, sourceValue: any, key: string, target: T, source: S) => any
): T & S;
```

### 파라미터

- `target` (`T`): `source` 객체가 가지고 있는 프로퍼티를 병합할 객체. 이 객체는 함수에 의해 수정돼요.
- `source` (`S`): `target` 객체로 프로퍼티를 병합할 객체.
- `merge` (`(targetValue: any, sourceValue: any, key: string, target: T, source: S) => any`): 두 값을 어떻게 병합할지 정의하는 함수. 아래와 같은 인자로 호출돼요.
  - `targetValue`: `target` 객체가 가지고 있는 값.
  - `sourceValue`: `source` 객체가 가지고 있는 값.
  - `key`: 병합되고 있는 프로퍼티 이름.
  - `target`: `target` 객체.
  - `source`: `source` 객체.

### 반환 값

(`T & S`): `source` 객체가 가지고 있는 프로퍼티가 병합된 `target` 객체.

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
