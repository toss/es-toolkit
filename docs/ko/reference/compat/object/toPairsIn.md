# toPairsIn (Lodash 호환성)

::: warning `Object.entries`나 `for...in` 루프를 사용하세요

이 `toPairsIn` 함수는 상속된 속성 처리, `Map`과 `Set` 처리 등의 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.entries()`나 상속된 속성이 필요하면 `for...in` 루프를 사용하세요.

:::

객체를 키-값 쌍의 배열로 변환하되, 상속된 속성까지 포함해요.

```typescript
const pairs = toPairsIn(object);
```

## 레퍼런스

### `toPairsIn(object)`

객체의 모든 열거 가능한 속성들(상속된 속성 포함)을 `[키, 값]` 형태의 배열로 변환하고 싶을 때 `toPairsIn`을 사용하세요. `toPairs`와 달리 프로토타입 체인의 속성들도 함께 포함돼요.

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// 기본 객체 변환
const object = { a: 1, b: 2 };
toPairsIn(object);
// => [['a', 1], ['b', 2]]

// 상속된 속성도 포함
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.proto = 'property';

const child = new Parent();
child.own = 'own';
toPairsIn(child);
// => [['inherited', 'value'], ['own', 'own'], ['proto', 'property']]
```

`Map`과 `Set`도 처리할 수 있어요.

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// Map 객체 변환
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
toPairsIn(map);
// => [['key1', 'value1'], ['key2', 'value2']]

// Set 객체 변환
const set = new Set([1, 2, 3]);
toPairsIn(set);
// => [[1, 1], [2, 2], [3, 3]]
```

#### 파라미터

- `object` (`object`): 변환할 객체, Map, 또는 Set이에요.

### 반환 값

(`Array<[string, any]>`): 키-값 쌍들의 배열을 반환해요(상속된 속성 포함).
