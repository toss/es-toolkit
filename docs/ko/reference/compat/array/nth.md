# nth

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열에서 인덱스 `n`에 해당하는 요소를 가져와요. `n`이 음수라면 끝에서부터 계산된 요소를 반환해요.

## 인터페이스

```typescript
function nth<T>(array: ArrayLike<T> | null | undefined, n: number): T | undefined;
```

### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 조회할 배열.
- `n` (`number`): 반환할 요소의 인덱스.

### 반환 값

(`T | undefined`): `array`의 n번째 요소.

## 예시

```typescript
nth([1, 2, 3], 1); // => 2
nth([1, 2, 3], -1); // => 3
```
