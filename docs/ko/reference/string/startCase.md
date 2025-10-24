# startCase

문자열의 각 단어의 첫 글자를 대문자로 변환해요.

```typescript
const converted = startCase(str);
```

## 레퍼런스

### `startCase(str)`

문자열을 스타트 케이스(각 단어의 첫 글자가 대문자)로 변환하고 싶을 때 `startCase`를 사용하세요. 각 단어의 첫 글자는 대문자로, 나머지는 소문자로 변환하고 단어 사이를 공백으로 연결해요.

```typescript
import { startCase } from 'es-toolkit/string';

// 기본 사용법
startCase('hello world'); // 'Hello World'
startCase('HELLO WORLD'); // 'Hello World'

// 카멜 케이스나 파스칼 케이스 변환
startCase('fooBar'); // 'Foo Bar'
startCase('PascalCase'); // 'Pascal Case'

// 하이픈이나 언더스코어로 연결된 단어들
startCase('hello-world'); // 'Hello World'
startCase('hello_world'); // 'Hello World'
```

다양한 구분자와 특수 문자가 포함된 문자열도 올바르게 처리해요.

```typescript
import { startCase } from 'es-toolkit/string';

// 여러 구분자가 포함된 경우
startCase('--foo-bar--'); // 'Foo Bar'
startCase('__FOO_BAR__'); // 'Foo Bar'

// 연속된 대문자와 숫자 처리
startCase('XMLHttpRequest'); // 'Xml Http Request'
startCase('_abc_123_def'); // 'Abc 123 Def'

// 빈 문자나 의미 없는 구분자만 있는 경우
startCase('_-_-_-_'); // ''
startCase('12abc 12ABC'); // '12 Abc 12 Abc'
```

#### 파라미터

- `str` (`string`): 스타트 케이스로 변환할 문자열이에요.

#### 반환 값

(`string`): 각 단어의 첫 글자가 대문자로 변환되고 공백으로 연결된 새로운 문자열을 반환해요.

## 데모

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
