# endsWith

::: info
이 함수는 [lodash와 완전히 호환](../../../compatibility.md)돼요. `es-toolkit/compat` 라이브러리에서 쓸 수 있어요.
:::

문자열이 주어진 문자열로 끝나는지 확인해요. 검색을 마칠 인덱스를 지정할 수 있어요.

## 인터페이스

```typescript
function endsWith(str: string, target: string, position: number = 0): string;
```

### 파라미터

- `str` (`string`): 검색할 문자열.
- `target` (`string`): 끝날 때 일치해야 할 문자열.
- `position` (`number`, 선택): 검색을 마칠 인덱스.

### 반환 값

(`boolean`): 문자열이 주어진 문자열로 끝나는지 여부.

## 예시

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith('fooBar', 'foo') // returns true
endsWith('fooBar', 'Bar') // returns false
endsWith('fooBar', 'abcdef') // returns false
endsWith('fooBar', 'Bar', 3) // returns true
```
