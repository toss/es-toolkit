# startCase

문자열을 각 단어의 첫 글자를 대문자로 변환해요.

스타트 표기법은 여러 단어로 구성된 식별자의 각 단어의 첫 글자를 대문자로 쓰고, 나머지 글자는 소문자로 쓰며, 단어를 공백( )으로 연결하는 명명 규칙입니다. 예를 들어 `Start Case`처럼 써요.

## 인터페이스

```typescript
function startCase(str: string): string;
```

### 파라미터

- `str` (`string`): 각 단어의 첫 글자를 대문자로 변환할 문자열이에요.

### 반환 값

(`string`) 각 단어의 첫 글자가 대문자로 변환된 문자열이에요.

## 예시

```typescript
import { startCase } from 'es-toolkit/string';

startCase('--foo-bar--'); // returns 'Foo Bar'
startCase('fooBar'); // returns 'Foo Bar'
startCase('__FOO_BAR__'); // returns 'Foo Bar'
startCase('XMLHttpRequest'); // returns 'Xml Http Request'
startCase('_abc_123_def'); // returns 'Abc 123 Def'
startCase('__abc__123__def__'); // returns 'Abc 123 Def'
startCase('_-_-_-_'); // returns ''
startCase('12abc 12ABC'); // returns '12 Abc 12 ABC'
```

## 데모

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
