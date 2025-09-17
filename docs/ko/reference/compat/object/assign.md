# assign (Lodash 호환성)

::: warning `Object.assign`을 사용하세요

이 `assign` 함수는 Lodash 호환성을 위해 복잡한 처리를 포함하고 있어 상대적으로 느려요.

대신 더 빠르고 현대적인 `Object.assign`을 사용하세요.

:::

소스 객체들의 속성을 대상 객체에 할당해요.

```typescript
const result = assign(target, source1, source2);
```

## 레퍼런스

### `assign(object, ...sources)`

소스 객체들의 속성을 대상 객체에 복사할 때 `assign`을 사용하세요. 여러 소스 객체를 지정할 수 있어요.

```typescript
import { assign } from 'es-toolkit/compat';

// 기본 사용법
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assign(target, source);
// Returns: { a: 1, b: 3, c: 4 }

// 여러 소스 객체 병합
const target2 = { a: 1 };
const result2 = assign(target2, { b: 2 }, { c: 3 }, { d: 4 });
// Returns: { a: 1, b: 2, c: 3, d: 4 }

// 기존 값이 같으면 덮어쓰지 않음
const target3 = { a: 1, b: 2 };
const source3 = { b: 2, c: 3 };
const result3 = assign(target3, source3);
// Returns: { a: 1, b: 2, c: 3 }
```

#### 파라미터

- `object` (`any`): 속성이 할당될 대상 객체예요.
- `...sources` (`any[]`): 속성을 복사할 소스 객체들이에요.

### 반환 값

(`any`): 소스 객체들의 속성이 병합된 대상 객체를 반환해요.
