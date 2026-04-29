# extend (Lodash 호환성)

::: warning `Object.assign()`을 사용하세요

이 `extend` 함수는 프로토타입 체인에서 상속된 속성들까지 처리하는 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.assign()`을 사용하세요.

:::

객체의 고유 속성과 상속된 속성을 다른 객체에 복사해요.

```typescript
const result = extend(object, source);
```

## 사용법

### `extend(object, ...sources)`

객체의 속성을 다른 객체로 복사할 때 `extend`를 사용하세요. `Object.assign()`과 비슷하지만 상속된 속성도 함께 복사해요. 이 함수는 `assignIn`의 별칭이에요.

```typescript
import { extend } from 'es-toolkit/compat';

// 기본 속성 복사
const target = { a: 1 };
extend(target, { b: 2 }, { c: 3 });
// 반환값: { a: 1, b: 2, c: 3 }

// 상속된 속성도 복사해요
function Parent() {
  this.a = 1;
}
Parent.prototype.b = 2;

const source = new Parent();
extend({}, source);
// 반환값: { a: 1, b: 2 }
```

같은 속성이 있을 때는 나중에 오는 소스 객체의 값으로 덮어써요.

```typescript
import { extend } from 'es-toolkit/compat';

extend({ a: 1, b: 2 }, { b: 3 }, { c: 4 });
// 반환값: { a: 1, b: 3, c: 4 }
```

#### 파라미터

- `object` (`any`): 속성을 복사받을 대상 객체예요.
- `...sources` (`any[]`): 속성을 제공하는 소스 객체들이에요.

#### 반환 값

(`any`): 속성이 복사된 객체를 반환해요. 첫 번째 인수인 `object`가 수정돼요.
