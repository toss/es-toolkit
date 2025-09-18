# defaults (Lodash 호환성)

::: warning `Object.assign()`을 사용하세요

이 `defaults` 함수는 `undefined`와 `Object.prototype`에서 상속된 속성들을 특별히 처리하는 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.assign()`을 사용하세요.

:::

객체에 기본값을 설정해서 `undefined` 속성을 채워요.

```typescript
const result = defaults(object, source);
```

## 레퍼런스

### `defaults(object, ...sources)`

객체의 `undefined` 속성이나 `Object.prototype`에서 상속된 속성에 기본값을 설정할 때 `defaults`를 사용하세요. 여러 개의 기본값 객체를 전달할 수 있고, 왼쪽에서 오른쪽 순서로 적용돼요.

```typescript
import { defaults } from 'es-toolkit/compat';

// 기본값으로 undefined 속성 채우기
defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 });
// 반환값: { a: 1, b: 2, c: 3 }

// undefined 속성만 기본값으로 채워져요
defaults({ a: undefined }, { a: 1 });
// 반환값: { a: 1 }

// null 값은 그대로 유지해요
defaults({ a: null }, { a: 1 });
// 반환값: { a: null }
```

속성이 이미 값을 가지고 있다면 기본값으로 덮어쓰지 않아요.

```typescript
import { defaults } from 'es-toolkit/compat';

defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
// 반환값: { a: 1, b: 2, c: 3 }
```

#### 파라미터

- `object` (`any`): 기본값을 설정할 대상 객체예요.
- `...sources` (`any[]`): 기본값을 제공하는 소스 객체들이에요.

### 반환 값

(`any`): 기본값이 설정된 객체를 반환해요. 첫 번째 인수인 `object`가 수정돼요.
