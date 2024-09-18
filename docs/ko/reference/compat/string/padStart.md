# padStart

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

문자열을 주어진 길이가 될 때까지 앞에 글자를 추가해서 늘려요.

이미 문자열이 충분히 길거나, 앞에 추가할 글자가 빈 문자열이라면, 아무 동작도 하지 않아요.

## 인터페이스

```typescript
function padStart(str: string, length = 0, chars = ' '): string;
```

### 파라미터

- `str` (`string`): 길이를 늘릴 문자열.
- `length` (`number`): 늘리고 싶은 길이. 기본값은 `0`.
- `char` (`string`): 길이를 늘릴 때 추가할 글자. 기본값은 `' '`.

### 반환 값

주어진 길이까지 길어진, 앞에 글자가 추가된 문자열.

## 예시

```javascript
padStart('hello', 10, 'a'); // 'aaaaahello'
padStart('hello', 3, 'a'); // 'hello'
padStart('hello', 5, ''); // 'hello'
```
