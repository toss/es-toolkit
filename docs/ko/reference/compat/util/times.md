# times

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

함수를 첫 번째 파라미터로 인덱스를 제공해서 `n`번 실행하고, 그 결괏값으로 이루어진 배열을 반환해요.

## 인터페이스

```typescript
function times<R = number>(n?: number, getValue?: (index: number) => R): R[];
```

### 파라미터

- `n` (`number`): 함수를 호출할 횟수.
- `getValue` (`(index: number) => R`): 반복마다 호출되는 함수.
  - 제공되지 않으면, `0` 이상 `n-1` 미만의 배열.

### 반환 값

(`R[]`): 결괏값의 배열.

## 예시

```typescript
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
times(2, () => 'es-toolkit'); // => ['es-toolkit', 'es-toolkit']
```
