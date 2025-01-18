# pullAllBy

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열의 모든 요소들을 매핑한 후, 지정된 값들을 배열에서 제거해요.

이 함수는 `arr`를 제자리에서 변경해요.
원래 배열을 수정하지 않고 값을 제거하려면 `differenceBy`를 사용하세요.

## 인터페이스

```typescript
function pullAllBy<T>(arr: T[], values: T[], iteratee: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: Partial<T>): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: [keyof T, unknown]): T[];
function pullAllBy<T, K extends keyof T>(arr: T[], values: T[], iteratee: K): T[];
```

### 파라미터

- `arr` (`T[]`): 수정할 배열.
- `values` (`T[]`): 배열에서 제거할 값들.
- `iteratee` (`((value: any) => any) | PropertyKey | object | null`): 각 요소마다 호출되는 반복자.

### 반환 값

(`T[]`): 지정된 값이 제거된 수정된 배열. 문자열.
