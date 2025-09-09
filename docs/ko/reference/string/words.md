# words

문자열을 단어 단위로 분리해 배열로 반환해요. ASCII 및 유니코드 문자를 모두 단어로 인식할 수 있어요.

## 인터페이스

```ts
function words(str: string): string[];
```

### 파라미터

- `str` (`string`): 단어로 분리할 문자열.

### 반환 값

(`string[]`): 문자열을 단어 단위로 분리한 배열.

## 예시

```typescript
words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

words('camelCaseHTTPRequest🚀');
// => ['camel', 'Case', 'HTTP', 'Request', '🚀']

words('Lunedì 18 Set');
// => ['Lunedì', '18', 'Set']
```

## Lodash 호환성

`es-toolkit/compat`에서 `words`를 가져오면 lodash와 호환돼요.

- `words`에서 문자열을 분리하는 정규식을 바꾸기 위해서 두 번째 인자 `pattern`을 제공할 수 있어요.
- `words`는 첫 번째 인자가 문자열이 아닌 경우, 자동으로 문자열로 바꿔요.

```typescript
import { words } from 'es-toolkit/compat';

words('fred, barney, & pebbles', /[^, ]+/g);
// 반환 값: ['fred', 'barney', '&', 'pebbles']
```
