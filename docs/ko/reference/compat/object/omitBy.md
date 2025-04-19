# omitBy

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

조건 함수에 맞는 프로퍼티들을 제외한 새로운 객체를 생성해요.

이 함수는 객체와 조건 함수를 받아, 조건 함수가 false를 반환하는 프로퍼티들만 포함하는 새로운 객체를 반환해요.

## 인터페이스

```typescript
function omitBy<T extends Record<string, any>>(
  obj: T,
  shouldOmit?: (value: T[keyof T], key: keyof T, obj: T) => boolean
): Partial<T>;
```

### 파라미터

- `obj` (`T`): 프로퍼티를 생략할 객체예요.
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): 프로퍼티를 생략할지 결정하는 조건 함수예요. 이 함수는 프로퍼티의 키와 값을 인자로 받아, 프로퍼티를 생략해야 하면 true, 그렇지 않으면 false를 반환해요.

### 반환 값

(`Partial<T>`): 조건 함수에 맞지 않는 프로퍼티들로 구성된 새로운 객체예요.

## 예시

```typescript
const obj = { a: 1, b: 'omit', c: 3 };
const shouldOmit = (value, key) => typeof value === 'string';
const result = omitBy(obj, shouldOmit);
// 결과는 다음과 같아요 { a: 1, c: 3 }
```
