# words

words 함수는 문자열을 단어 단위로 분리해 배열로 반환해요. ASCII 및 유니코드 문자를 모두 단어로 인식할 수 있어요.

## 인터페이스

```ts
function words(str: string, pattern?: RegExp | string): string[];
```

### 파라미터

- `str` (`string`): 단어로 분리할 문자열.
- `pattern` (`RegExp | string, 선택 사항`): 문자열을 분리할 사용자 정의 패턴. 지정하지 않으면 기본 정규식이 적용돼요.

### 반환 값

(`string[]`): 문자열을 단어 단위로 분리한 배열.

## 예시

```typescript
const result1 = words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

const result2 = words('fred, barney, & pebbles', /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
```
