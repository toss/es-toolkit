# padStart

문자열을 주어진 길이가 될 때까지 앞에 글자를 추가해서 늘려요.

이미 문자열이 충분히 길거나, 앞에 추가할 글자가 빈 문자열이라면, 아무 동작도 하지 않아요.

## 인터페이스

```typescript
function padStart(str: string, length = 0, chars = ' '): string;
```

## 파라미터

- `str` (`string`): 길이를 늘릴 문자열.
- `length` (`number`): 늘리고 싶은 길이. 기본값은 `0`.
- `char` (`string`): 길이를 늘릴 때 추가할 글자. 기본값은 `' '`.

## 반환 값

주어진 길이까지 길어진, 앞에 글자가 추가된 문자열.

## 예시 값

```javascript
padStart('hello', 10, 'a'); // 'aaaaahello'
padStart('hello', 3, 'a'); // 'hello'
padStart('hello', 5, ''); // 'hello'
```
