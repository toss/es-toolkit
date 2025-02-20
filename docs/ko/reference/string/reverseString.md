# reverseString

문자열을 뒤집어요.

이 함수는 문자열을 입력으로 받아서 그 문자열의 역순을 반환해요.

## 인터페이스

```typescript
function reverseString(value: string): string;
```

### 파라미터

- `value` (`string`): 뒤집을 문자열.

### 반환 값

(`string`): 뒤집힌 문자열.

## 예시

```typescript
import { reverseString } from 'es-toolkit/string';

const reversedStr1 = reverseString('hello'); // returns 'olleh'
const reversedStr2 = reverseString('PascalCase'); // returns 'esaClaP'
const reversedStr3 = reverseString('foo 😄 bar'); // returns 'rab 😄 oof'
```

## 데모

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit';

console.log(reverseString('hello'));
```

:::
