# dedent

여러 줄 문자열에서 각 줄의 공통 들여쓰기를 제거해요.

## 인터페이스

```typescript
function dedent(str: string): string;
function dedent(str: TemplateStringsArray, ...values: unknown[]): string;
```

### 파라미터

- `str` (`string | TemplateStringsArray`): 들여쓰기를 제거할 문자열 또는 템플릿 리터럴이에요.
- `values` (`unknown[]`): 태그 템플릿 리터럴로 사용할 때 삽입할 값이에요.

### 반환 값

(`string`): 공통 들여쓰기가 제거된 문자열을 반환해요.

## 예시

```typescript
import { dedent } from 'es-toolkit/string';

// 일반 함수로 사용
dedent('  hello\n  world');
// 결과: 'hello\nworld'

// 태그 템플릿 리터럴로 사용
dedent`
  hello
  world
`;
// 결과: 'hello\nworld'

// 상대적인 들여쓰기를 유지해요
dedent`
  hello
    world
`;
// 결과: 'hello\n  world'

// 보간을 지원해요
const name = 'world';
dedent`
  hello
  ${name}
`;
// 결과: 'hello\nworld'
```
