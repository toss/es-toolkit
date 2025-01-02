# first

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열의 첫 번째 요소를 반환해요.

이 함수는 배열을 입력받아 배열의 첫 번째 요소를 반환해요. 배열이 비어 있는 경우, 함수는 `undefined`를 반환해요.

## 인터페이스

```typescript
function first<T>(arr: ArrayLike<T> | undefined | null): T | undefined;
```

### 파라미터

- `arr` (`T[]`): 첫 번째 요소를 가져올 배열.

### 반환 값

(`T | undefined`): 배열의 첫 번째 요소, 배열이 비어 있는 경우 `undefined`.

## 예시

```typescript
const arr1 = [1, 2, 3];
const firstElement1 = first(arr1);
// firstElement1은 1이에요.

const arr2: string[] = [];
const firstElement2 = first(arr2);
// firstElement2는 undefined예요.

const arr3 = ['a', 'b', 'c'];
const firstElement3 = first(arr3);
// firstElement3는 'a'예요.

const arr4 = [true, false, true];
const firstElement4 = first(arr4);
// firstElement4는 true에요.

const arr5: [number, string, boolean] = [1, 'a', true];
const firstElement5 = first(arr5);
// firstElement5는 1이에요.
```
