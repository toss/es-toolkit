# memoize

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

함수의 결과를 메모이제이션(memoization)하여 동일한 인자로 다시 호출될 때 캐시된 결과를 반환해요.

## 인터페이스

```typescript
function memoize<T extends (...args: any) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T>;
```

### 파라미터

- `func` (`T`): 메모이제이션할 함수
- `resolver` (`(...args: Parameters<T>) => any`): 캐시 키를 결정하는 함수. 기본값은 첫 번째 인자를 키로 사용

### 반환 값

(`MemoizedFunction<T>`): 메모이제이션된 함수를 반환해요. 이 함수는 원본 함수와 동일한 시그니처를 가지며, `cache` 속성을 통해 캐시에 접근할 수 있어요.

## 예시

```typescript
import { memoize } from 'es-toolkit/compat';
import { values } from 'es-toolkit/compat';

const object = { a: 1, b: 2 };
const other = { c: 3, d: 4 };

const memoizedValues = memoize(vales);
memoizedValues(object);
// => [1, 2]

memoizedValues(other);
// => [3, 4]

object.a = 2;
memoizedValues(object);
// => [1, 2] (캐시된 결과)

// 캐시 수정
memoizedValues.cache.set(object, ['a', 'b']);
memoizedValues(object);
// => ['a', 'b']
```
