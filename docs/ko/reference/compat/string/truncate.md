# truncate

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

문자열이 주어진 최대 길이보다 길면 문자열을 잘라요. 잘린 문자열의 마지막 부분은 생략을 나타내는 문자열로 대체돼요. 생략을 나타내는 문자열의 기본값은 `"..."`이에요.

## 인터페이스

```typescript
function truncate(
  string: string,
  options?: {
    length?: number;
    separator?: string | RegExp;
    omission?: string;
  }
): string;
```

### 파라미터

- `string` (`string`): 자를 문자열.
- `options` (`Object`, 선택): 옵션 객체.
  - `length` (`number`, 선택): 최대 문자열 길이. 기본값은 `30`.
  - `omission` (`string`, 선택): 텍스트가 생략되었음을 나타내는 문자열. 기본값은 `'...'`.
  - `separator` (`RegExp|string`, 선택): 자를 위치를 결정하는 구분자 패턴.

### 반환 값

(`string`): 잘린 문자열.

## 예시

```typescript
const test = 'hi-diddly-ho there, neighborino';

truncate(test);
// => 'hi-diddly-ho there, neighbo...'

truncate(test, { length: 24, separator: ' ' });
// => 'hi-diddly-ho there,...'

truncate(test, { length: 24, separator: /,? +/ });
// => 'hi-diddly-ho there...'

truncate(test, { omission: ' [...]' });
// => 'hi-diddly-ho there, neig [...]'

truncate('ABC', { length: 3 });
// => 'ABC'

truncate('ABC', { length: 2 });
// => '...'

truncate('¥§✈✉🤓', { length: 5 });
// => '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// => '¥§✈…'
```
