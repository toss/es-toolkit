# max

::: info
이 함수는 [lodash와 완전히 호환](../../../compatibility.md)돼요. `es-toolkit/compat` 라이브러리에서 쓸 수 있어요.
:::

배열에서 최댓값을 가지는 요소를 반환해요.

배열이 비어 있다면, `undefined`를 반환해요.

## 인터페이스

```typescript
function max<T>(items: [T, ...T[]]): T;
function max(): undefined;
function max<T>(items?: T[]): T | undefined;
```

### 파라미터

- `items` (`T[]`): 최댓값을 가지는 요소를 찾을 배열.

### 반환 값

(`T`): 배열에서 최솟값을 가지는 요소. 배열이 비어 있다면 `undefined`를 반환해요.

### 예시

```typescript
max([1, 2, 3]); // Returns: 3
max(['a', 'b']); // Returns: 'b'
```
