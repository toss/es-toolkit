# endsWith (Lodash 호환성)

::: warning JavaScript의 `String.prototype.endsWith`를 사용하세요

이 `endsWith` 함수는 `null`이나 `undefined` 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.endsWith`를 사용하세요.

:::

문자열이 지정된 문자열로 끝나는지 확인해요.

```typescript
const result = endsWith(str, target);
```

## 레퍼런스

### `endsWith(str, target, position?)`

문자열이 특정 문자열로 끝나는지 확인하고 싶을 때 `endsWith`를 사용하세요. 검색할 위치도 지정할 수 있어요.

```typescript
import { endsWith } from 'es-toolkit/compat';

// 문자열 끝 확인
endsWith('fooBar', 'Bar');
// Returns: true

endsWith('fooBar', 'foo');
// Returns: false

// 특정 위치까지만 확인
endsWith('fooBar', 'foo', 3);
// Returns: true (처음 3글자 'foo'에서 'foo'로 끝나는지 확인)
```

`null`이나 `undefined`는 `false`를 반환해요.

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith(null, 'test');
// Returns: false

endsWith('test', null);
// Returns: false
```

#### 파라미터

- `str` (`string`, 선택): 확인할 문자열이에요.
- `target` (`string`, 선택): 끝에 있는지 찾을 문자열이에요.
- `position` (`number`, 선택): 검색을 끝낼 위치예요. 기본값은 문자열 전체 길이예요.

#### 반환 값

(`boolean`): 문자열이 지정된 문자열로 끝나면 `true`, 아니면 `false`를 반환해요.
