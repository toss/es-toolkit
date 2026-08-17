# dedent

여러 줄 문자열의 모든 줄에서 공통된 들여쓰기를 제거해요.

코드의 들여쓰기에 맞춰 여러 줄 문자열을 작성해도, 그 들여쓰기가 실제 문자열에 포함되지 않도록 해줘요.

```typescript
const text = dedent`
  Hello
  World
`;
```

## 사용법

### `` dedent`text` ``

들여쓰기된 코드 안에서 여러 줄 문자열을 작성하고 싶을 때, `dedent`를 태그드 템플릿 리터럴로 사용하세요. 비어 있지 않은 줄들이 공통으로 가진 가장 작은 들여쓰기를 찾아서 모든 줄에서 제거하기 때문에, 줄 사이의 상대적인 들여쓰기 차이는 유지돼요. 첫 줄이나 마지막 줄이 공백만 포함하면 제거돼요.

```typescript
import { dedent } from 'es-toolkit/string';

// 코드의 들여쓰기가 제거돼요
const message = dedent`
  Hello
  World
`;
// message는 'Hello\nWorld'가 돼요

// 줄 사이의 상대적인 들여쓰기는 유지돼요
const list = dedent`
  Items:
    - First
    - Second
`;
// list는 'Items:\n  - First\n  - Second'가 돼요

// 삽입된 값은 들여쓰기를 제거하기 전에 채워져요
const name = 'es-toolkit';
const greeting = dedent`
  Hello, ${name}!
`;
// greeting은 'Hello, es-toolkit!'이 돼요
```

공백만 있는 줄은 빈 줄이 되고, Windows 줄바꿈(`\r\n`)은 `\n`으로 정규화돼요.

```typescript
import { dedent } from 'es-toolkit/string';

// 공백만 있는 줄은 빈 줄이 돼요
const text = dedent`
  First

  Second
`;
// text는 'First\n\nSecond'가 돼요
```

#### 파라미터

- `str` (`TemplateStringsArray`): 들여쓰기를 제거할 템플릿 리터럴이에요.
- `values` (`unknown[]`): 템플릿 리터럴에 삽입할 값들이에요.

#### 반환 값

(`string`): 공통 들여쓰기가 제거된 문자열을 반환해요.

### `dedent(str)`

파일에서 읽었거나 코드의 다른 곳에서 만들어진 문자열이 이미 있을 때는, `dedent`를 일반 함수로 사용하세요.

```typescript
import { dedent } from 'es-toolkit/string';

// 이미 있는 문자열에서 공통 들여쓰기를 제거해요
const raw = '  Hello\n    World';
const text = dedent(raw);
// text는 'Hello\n  World'가 돼요
```

#### 파라미터

- `str` (`string`): 들여쓰기를 제거할 문자열이에요.

#### 반환 값

(`string`): 공통 들여쓰기가 제거된 문자열을 반환해요.

### `dedent(tagFn)`

다른 태그 함수와 조합해서 사용하고 싶다면, `dedent(tagFn)`처럼 태그 함수를 인자로 전달하세요. 이렇게 만들어진 새로운 태그 함수는 공통 들여쓰기가 미리 제거된 템플릿 문자열을 받아요.

```typescript
import { dedent } from 'es-toolkit/string';

// 전달받은 파이썬 코드를 실행하는 태그 함수예요
function pythonInterpreter(strings: TemplateStringsArray, ...values: unknown[]) {
  return runPython(strings.join(''));
}

// dedent로 감싸면 들여쓰기가 제거된 코드를 받게 돼요
const python = dedent(pythonInterpreter);

python`
  def greet():
      print("Hello!")

  greet()
`;
// pythonInterpreter는 다음 코드를 받아요:
// 'def greet():\n    print("Hello!")\n\ngreet()'
```

#### 파라미터

- `tagFn` (`(strings: TemplateStringsArray, ...values: unknown[]) => T`): 조합할 태그 함수예요.

#### 반환 값

(`(strings: TemplateStringsArray, ...values: unknown[]) => T`): 템플릿 문자열에서 공통 들여쓰기를 제거한 뒤 `tagFn`에 전달하는 새로운 태그 함수를 반환해요.
