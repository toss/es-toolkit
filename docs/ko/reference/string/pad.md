# pad

문자열이 `length` 보다 짧다면, 길이를 맞추기 위해서 양옆에 문자를 추가해요. 양옆에 같은 길이의 문자열을 추가할 수 없다면, 왼쪽이 한 글자 짧게 문자가 추가될 수 있어요.

문자열이 `length` 보다 길거나, 길이를 맞추기 위해 채울 문자열이 비어 있다면, 원래 문자열을 반환해요.

## 인터페이스

```typescript
function pad(str: string, length: number, chars = ' '): string;
```

### 파라미터

- `str` (`string`): 길이를 맞출 문자열.
- `length` (`number`): 문자열을 맞출 길이.
- `char` (`string`): 문자열의 길이를 맞추기 위해 사용할 문자. 기본값은 `' '`이에요.

### 반환 값

(`string`): 길이가 맞춰진 문자열.

## 예시

```javascript
pad('abc', 8);
// => '  abc   '

pad('abc', 8, '_-');
// => '_-abc_-_'

pad('abc', 3);
// => 'abc'
```
