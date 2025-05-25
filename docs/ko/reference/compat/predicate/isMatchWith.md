# isMatchWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

이 메서드는 `isMatch`와 비슷하지만 값을 비교하기 위해 호출되는 `customizer`를 받아요. `customizer`가 `undefined`를 반환하면 메서드가 대신 비교를 처리해요. `customizer`는 다섯 개의 인수와 함께 호출돼요: (objValue, srcValue, index|key, object, source).

## 인터페이스

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown
): boolean;
```

### 파라미터

- `target` (`unknown`): 검사할 객체예요.
- `source` (`unknown`): 일치시킬 속성 값의 객체예요.
- `customizer` (`Function`, 선택적): 비교를 커스터마이즈하는 함수예요.

### 반환 값

(`boolean`): 객체가 일치하면 `true`, 그렇지 않으면 `false`를 반환해요.

## 예시

```typescript
import { isMatchWith } from 'es-toolkit/compat';

function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}

function customizer(objValue, srcValue) {
  if (isGreeting(objValue) && isGreeting(srcValue)) {
    return true;
  }
}

const object = { greeting: 'hello' };
const source = { greeting: 'hi' };

isMatchWith(object, source, customizer);
// => true
```
