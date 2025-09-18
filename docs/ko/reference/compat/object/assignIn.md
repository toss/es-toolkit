# assignIn (Lodash 호환성)

::: warning `Object.assign`을 사용하세요

이 `assignIn` 함수는 상속된 속성까지 포함하는 복잡한 처리로 인해 상대적으로 느려요.

대신 더 빠르고 현대적인 `Object.assign`을 사용하세요.

:::

소스 객체들의 모든 속성(상속된 속성 포함)을 대상 객체에 할당해요.

```typescript
const result = assignIn(target, source1, source2);
```

## 레퍼런스

### `assignIn(object, ...sources)`

소스 객체들의 모든 속성을 대상 객체에 복사할 때 `assignIn`을 사용하세요. 프로토타입 체인의 상속된 속성도 포함해요.

```typescript
import { assignIn } from 'es-toolkit/compat';

// 기본 사용법
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assignIn(target, source);
// Returns: { a: 1, b: 3, c: 4 }

// 여러 소스 객체 병합
const target2 = { a: 1 };
const result2 = assignIn(target2, { b: 2 }, { c: 3 }, { d: 4 });
// Returns: { a: 1, b: 2, c: 3, d: 4 }

// 상속된 속성도 포함
function Parent() {}
Parent.prototype.inherited = 'value';
const child = new Parent();
child.own = 'ownValue';

const target3 = {};
const result3 = assignIn(target3, child);
// Returns: { own: 'ownValue', inherited: 'value' }
```

#### 파라미터

- `object` (`any`): 속성이 할당될 대상 객체예요.
- `...sources` (`any[]`): 속성을 복사할 소스 객체들이에요.

### 반환 값

(`any`): 소스 객체들의 속성(상속 속성 포함)이 병합된 대상 객체를 반환해요.
