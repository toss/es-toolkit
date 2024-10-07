# toLength

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

값을 유효한 인덱스로 변환해요. 유효한 인덱스란, `0` 이상 `2^32 - 1` 이하의 정수를 말해요.

주어진 값을 숫자로 변환하고, 정수로 내림해요. 값이 0 미만이라면, `0`을 반환해요. 값이 `2^32 - 1`를 초과하면, `2^32 - 1`을 반환해요.

## 인터페이스

```typescript
function toLength(value?: unknown): number;
```

### 파라미터

- `value` (`unknown`): 유효한 인덱스로 변환할 값.

### 반환 값

(`number`): 유효한 인덱스로 변환된 값.

## 예시

```typescript
toLength(3.2); // => 3
toLength(-1); // => 0
toLength(1.9); // => 1
toLength('42'); // => 42
toLength(null); // => 0
```
