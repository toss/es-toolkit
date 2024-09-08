# some

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열에서 하나 이상의 요소가 주어진 조건을 만족하는지 확인하는 함수예요. `predicate`로 함수를 넘기거나, 객체의 특정 프로퍼티 이름을 넘겨 사용할 수 있어요.

## 인터페이스

```typescript
function some<T>(
  arr: T[] | null | undefined,
  predicate: ((value: T, index: number, arr: T[]) => unknown) | keyof T
): boolean;
```

### 파라미터

- `arr` (`T[] | null | undefined`): 확인할 배열. `null` 또는 `undefined`면 `false`를 반환해요.
- `predicate` (`((value: T, index: number, arr: T[]) => unknown) | keyof T`): 각 요소를 검사할 함수이거나, 객체의 프로퍼티 이름이에요.

  - 함수로 전달된 경우, 각 요소에 대해 다음 세 가지 인자를 받아요:

    - `value`: 현재 배열의 요소
    - `index`: 요소의 인덱스
    - `arr`: 배열 자체

  - 문자열로 전달된 경우, 배열 내 객체의 해당 프로퍼티 값을 확인해요.

### 반환 값

- 배열의 요소 중 하나라도 `predicate` 조건을 만족하면 `true`, 그렇지 않으면 `false`를 반환해요.

## 예시

```typescript
some([1, 2, 3], number => number % 2 === 0); // true;
some([1, 'string'], Number); // true
some([false, false, false], value => value); // false
some([1, false, 'string'], () => true); // true
```
