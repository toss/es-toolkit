# assign (Lodash 호환성)

::: warning `Object.assign`을 사용하세요

이 `assign` 함수는 값이 같은지 비교하는 추가 검사 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.assign`을 사용하세요.

:::

소스 객체들의 속성을 대상 객체에 할당해요.

```typescript
const result = assign(target, ...sources);
```

## 레퍼런스

### `assign(target, ...sources)`

하나 이상의 소스 객체의 속성을 대상 객체에 복사하고 싶을 때 `assign`을 사용하세요. 동일한 키가 있으면 나중에 오는 소스의 값이 이전 값을 덮어써요.

```typescript
import { assign } from 'es-toolkit/compat';

// 기본 사용법
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assign(target, source);
// 결과: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (대상 객체가 변경됨)

// 여러 소스 객체 병합
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
const source3 = { d: 4 };
assign(target2, source1, source2, source3);
// 결과: { a: 1, b: 2, c: 3, d: 4 }

// 속성 덮어쓰기
const target3 = { x: 1, y: 2 };
const source4 = { y: 3, z: 4 };
const source5 = { y: 5 };
assign(target3, source4, source5);
// 결과: { x: 1, y: 5, z: 4 } (y는 가장 마지막 값으로 덮어써짐)
```

이 함수는 객체의 고유 속성만 복사하고, 상속된 속성은 복사하지 않아요. 또한 값이 같으면 덮어쓰지 않는 최적화가 있어요.

#### 파라미터

- `target` (`any`): 속성을 복사받을 대상 객체예요.
- `...sources` (`any[]`): 속성을 복사할 소스 객체들이에요.

#### 반환 값

(`any`): 수정된 대상 객체를 반환해요. 대상 객체 자체가 변경되어 반환돼요.
