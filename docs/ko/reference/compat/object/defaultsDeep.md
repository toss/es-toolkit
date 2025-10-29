# defaultsDeep (Lodash 호환성)

::: warning 구조 분해 할당과 `Object.assign()`을 사용하세요

이 `defaultsDeep` 함수는 중첩 객체의 재귀적 병합과 순환 참조 처리로 인해 복잡하고 느리게 동작해요.

대신 더 빠르고 현대적인 구조 분해 할당과 `Object.assign()`을 사용하세요.

:::

중첩된 객체에 재귀적으로 기본값을 설정해요.

```typescript
const result = defaultsDeep(target, ...sources);
```

## 레퍼런스

### `defaultsDeep(target, ...sources)`

중첩된 객체의 `undefined` 속성에 기본값을 재귀적으로 설정할 때 `defaultsDeep`을 사용하세요. `defaults`와 비슷하지만 중첩된 객체도 병합해요.

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

// 중첩 객체의 기본값 설정
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// 반환값: { a: { b: 2, c: 3 }, d: 4 }

// undefined 속성만 기본값으로 채워져요
defaultsDeep({ a: { b: undefined } }, { a: { b: 1 } });
// 반환값: { a: { b: 1 } }

// null 값은 그대로 유지해요
defaultsDeep({ a: null }, { a: { b: 1 } });
// 반환값: { a: null }
```

여러 소스 객체를 전달해서 기본값을 단계적으로 적용할 수 있어요.

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { a: { d: 4 }, e: 5 });
// 반환값: { a: { b: 2, c: 3, d: 4 }, e: 5 }
```

#### 파라미터

- `target` (`any`): 기본값을 설정할 대상 객체예요.
- `...sources` (`any[]`): 기본값을 제공하는 소스 객체들이에요.

#### 반환 값

(`any`): 기본값이 재귀적으로 설정된 객체를 반환해요. 첫 번째 인수인 `target`이 수정돼요.
