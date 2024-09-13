# matches

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`source`의 모양 및 값과 일치하는지 확인하는 함수를 만들어요.
객체, 배열, `Map`, `Set`과의 깊은 비교를 지원해요.

이 함수의 동작은 [isMatch](./isMatch.md)와 동일하고, 호출하는 방법만 달라요.

## 인터페이스

```typescript
function matches(source: unknown): (target: unknown) => boolean;
```

## 파라미터

- `source` (`unknown`): 확인하는 함수가 참고할 객체.

## 반환 값

- (`(target: unknown) => boolean`): `source`의 모양 및 값과 일치하는지 확인하는 함수. `target`이 `source`과 일치하면 `true`, 아니면 `false`를 반환해요.

## 예시

### 객체 일치

```typescript
const matcher = matches({ a: 1, b: 2 });
matcher({ a: 1, b: 2, c: 3 }); // true
matcher({ a: 1, c: 3 }); // false
```

### 배열 일치

```typescript
const arrayMatcher = matches([1, 2, 3]);
arrayMatcher([1, 2, 3, 4]); // true
arrayMatcher([4, 5, 6]); // false
```

### 중첩된 구조 일치

```typescript
// Matching objects with nested structures
const nestedMatcher = matches({ a: { b: 2 } });
nestedMatcher({ a: { b: 2, c: 3 } }); // true
nestedMatcher({ a: { c: 3 } }); // false
```
