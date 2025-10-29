# startsWith (Lodash 호환성)

::: warning JavaScript의 `String.prototype.startsWith`를 사용하세요

이 `startsWith` 함수는 `null`이나 `undefined` 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.startsWith`를 사용하세요.

:::

문자열이 지정된 문자열로 시작하는지 확인해요.

```typescript
const result = startsWith(str, target);
```

## 레퍼런스

### `startsWith(str, target, position?)`

문자열이 특정 문자열로 시작하는지 확인하고 싶을 때 `startsWith`를 사용하세요. 검색을 시작할 위치도 지정할 수 있어요.

```typescript
import { startsWith } from 'es-toolkit/compat';

// 문자열 시작 확인
startsWith('fooBar', 'foo');
// Returns: true

startsWith('fooBar', 'bar');
// Returns: false

// 특정 위치부터 확인
startsWith('fooBar', 'Bar', 3);
// Returns: true (3번째 위치부터 'Bar'로 시작하는지 확인)
```

`null`이나 `undefined`는 `false`를 반환해요.

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith(null, 'test');
// Returns: false

startsWith('test', null);
// Returns: false
```

#### 파라미터

- `str` (`string`, 선택): 확인할 문자열이에요.
- `target` (`string`, 선택): 시작 부분에 있는지 찾을 문자열이에요.
- `position` (`number`, 선택): 검색을 시작할 위치예요. 기본값은 `0`이에요.

#### 반환 값

(`boolean`): 문자열이 지정된 문자열로 시작하면 `true`, 아니면 `false`를 반환해요.
