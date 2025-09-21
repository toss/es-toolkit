# isElement (Lodash 호환성)

::: warning `instanceof HTMLElement`를 사용하세요

이 `isElement` 함수는 구조적 검사로 인해 정확성이 떨어지고 느리게 동작해요.

대신 더 정확하고 현대적인 `instanceof HTMLElement` 또는 `element.nodeType === 1` 검사를 사용하세요.

:::

값이 DOM 요소인지 확인해요.

```typescript
const result = isElement(value);
```

## 레퍼런스

### `isElement(value)`

주어진 값이 DOM 요소인지 확인할 때 `isElement`를 사용하세요. 이 함수는 구조적으로 확인하기 때문에 결과가 완전히 정확하지 않을 수 있어요.

```typescript
import { isElement } from 'es-toolkit/compat';

// DOM 요소들
isElement(document.body); // true
isElement(document.createElement('div')); // true
isElement(document.querySelector('p')); // true (요소가 존재하는 경우)

// DOM 요소가 아닌 값들
isElement('<body>'); // false
isElement({}); // false
isElement(null); // false
isElement(undefined); // false

// 텍스트 노드나 다른 노드 타입들
isElement(document.createTextNode('text')); // false
isElement(document.createComment('comment')); // false
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

### 반환 값

(`boolean`): 값이 DOM 요소로 보이면 `true`, 아니면 `false`를 반환해요.
