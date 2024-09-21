# min

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열에서 최솟값을 가진 요소를 찾아요.

## 인터페이스

```typescript
function min<T>(items: [T, ...T[]]): T;
function min(): undefined;
function min<T>(items?: T[]): T | undefined;
function min<T>(items: T[]): T;
```

### 파라미터

- `items` (`T[]`): 검색할 요소의 배열. 기본값은 빈 배열이에요.

### 반환 값

(`T`): 배열에서 최솟값을 가지는 요소. 배열이 비어 있다면 `undefined`를 반환해요.

## 예시

```typescript
// Returns 1
min([3, 1, 4, 1, 5, 9]);

// Returns -3
min([0, -3, 2, 8, 7]);
```
