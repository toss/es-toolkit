# max

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열에서 최대 값을 가진 요소를 찾습니다.


## 인터페이스

```typescript
function max<T>(items: [T, ...T[]]): T;
function max(): undefined;
function max<T>(items?: T[]): T | undefined;
function max<T>(items: T[]): T | undefined;
```

### 파라미터

- `items` (`T[]`): 찾을 요소들의 배열입니다. 기본값은 빈 배열입니다.

### 반환 값

(`T | undefined`): 최대 값을 가진 요소, 또는 배열이 비어 있으면 undefined를 반환합니다.