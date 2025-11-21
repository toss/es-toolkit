# reverseString

문자열을 거꾸로 뒤집어요.

```typescript
const reversed = reverseString(value);
```

## 사용법

### `reverseString(value)`

문자열의 글자 순서를 거꾸로 뒤집고 싶을 때 `reverseString`을 사용하세요. 유니코드 문자와 이모지도 올바르게 처리해요.

```typescript
import { reverseString } from 'es-toolkit/string';

// 기본 문자열 뒤집기
reverseString('hello'); // 'olleh'
reverseString('world'); // 'dlrow'

// 대소문자가 섞인 문자열
reverseString('PascalCase'); // 'esaClacsaP'

// 공백이 포함된 문자열
reverseString('hello world'); // 'dlrow olleh'
```

이모지와 특수 문자도 정확하게 처리해요.

```typescript
import { reverseString } from 'es-toolkit/string';

// 이모지가 포함된 문자열
reverseString('foo 😄 bar'); // 'rab 😄 oof'
reverseString('안녕하세요'); // '요세하녕안'

// 숫자와 특수 문자
reverseString('12345'); // '54321'
reverseString('a-b-c'); // 'c-b-a'
```

#### 파라미터

- `value` (`string`): 뒤집을 문자열이에요.

#### 반환 값

(`string`): 글자 순서가 뒤집힌 새로운 문자열을 반환해요.

## 데모

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit';

console.log(reverseString('hello'));
```

:::
