# repeat

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 문자열을 주어진 횟수만큼 반복한 뒤에 리턴해요.

만약, 문자열이 없거나 횟수가 0인 경우에는 내용물이 없는 문자열을 리턴해요.

## 인터페이스

```typescript
function repeat(str: string, n: number): string;
```

### 파라미터

- `str` (`string`): 반복할 문자열.
- `n` (`number`): 반복하시고 싶은 횟수.

### 반환 값

주어진 문자열이 n번째 반복된 문자열.

## 예시

```javascript
repeat('abc', 0); // ''
repeat('abc', 2); // 'abcabc'
```
