# assignIn (Lodash 호환성)

::: warning `Object.assign`을 사용하세요

이 `assignIn` 함수는 상속된 속성까지 복사하는 추가 처리와 값 비교 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.assign`을 사용하세요.

:::

소스 객체들의 모든 속성(상속된 속성 포함)을 대상 객체에 할당해요.

```typescript
const result = assignIn(target, ...sources);
```

## 레퍼런스

### `assignIn(target, ...sources)`

소스 객체의 고유 속성과 상속된 속성을 모두 대상 객체에 복사하고 싶을 때 `assignIn`을 사용하세요. `assign`과 달리 프로토타입 체인의 속성도 포함해요.

```typescript
import { assignIn } from 'es-toolkit/compat';

// 기본 사용법
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assignIn(target, source);
// 결과: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (대상 객체가 변경됨)

// 여러 소스 객체 병합
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
assignIn(target2, source1, source2);
// 결과: { a: 1, b: 2, c: 3 }

// 상속된 속성도 복사
function Parent() {}
Parent.prototype.inherited = 'inheritedValue';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = {};
assignIn(target3, child);
// 결과: { own: 'ownValue', inherited: 'inheritedValue' }

// 배열의 인덱스 속성과 length 등도 복사
const arr = [1, 2, 3];
arr.customProp = 'custom';
const target4 = {};
assignIn(target4, arr);
// 결과: { '0': 1, '1': 2, '2': 3, customProp: 'custom' }
```

이 함수는 `assign`과 달리 상속된 속성도 포함하여 복사해요. 값이 같으면 덮어쓰지 않는 최적화도 있어요.

#### 파라미터

- `target` (`any`): 속성을 복사받을 대상 객체예요.
- `...sources` (`any[]`): 속성을 복사할 소스 객체들이에요. 고유 속성과 상속된 속성 모두 복사돼요.

#### 반환 값

(`any`): 수정된 대상 객체를 반환해요. 대상 객체 자체가 변경되어 반환돼요.
