# startsWith

::: info
`es-toolkit/compat` 라이브러리에서 [lodash와 완전히 호환](../../../compatibility.md)돼요.
:::

문자열이 주어진 문자열로 시작하는지 확인해요. 검색을 시작할 인덱스를 지정할 수 있어요.

## 인터페이스

```typescript
function startsWith(str: string, target: string, position: number = 0): string;
```

### 파라미터

- `str` (`string`): 검색할 문자열.
- `target` (`string`): 시작할 때 일치해야 할 문자열.
- `position` (`number`, 선택): 검색을 시작할 인덱스.

### 반환 값

(`boolean`): 문자열이 주어진 문자열로 시작하는지 여부

## 예시

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith('fooBar', 'foo') // returns true
startsWith('fooBar', 'Bar') // returns false
startsWith('fooBar', 'abcdef') // returns false
startsWith('fooBar', 'Bar', 3) // returns true
```
