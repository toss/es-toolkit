# endsWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
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

endsWith('fooBar', 'foo'); // returns false
endsWith('fooBar', 'Bar'); // returns true
endsWith('fooBar', 'abcdef'); // returns false
endsWith('fooBar', 'foo', 3); // returns true
```
