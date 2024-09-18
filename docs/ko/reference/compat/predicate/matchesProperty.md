# matchesProperty

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 객체의 프로퍼티가 `source`의 모양 및 값과 일치하는지 확인하는 함수를 만들어요.

반환된 함수는 `target` 객체를 받아서, 주어진 프로퍼티에 있는 값이 `source`와 일치하는지 확인해요.

## 인터페이스

```typescript
function matchesProperty(property: PropertyKey | PropertyKey[], source: unknown): (target?: unknown) => boolean;
```

### 파라미터

- `property` (`number | string | symbol | Array<number | string | symbol>`): 객체의 프로퍼티를 나타내는 경로. 프로퍼티 이름, 프로퍼티 이름의 배열, 또는 깊은 경로를 나타내는 문자열을 쓸 수 있어요.
- `source` (`unknown`): 객체의 프로퍼티와 비교할 값.

### 반환 값

(`(target: unknown) => boolean`): `target` 객체를 받아서, 주어진 프로퍼티의 값을 가져와서, `source`와 일치하는지 확인하는 함수. 일치하면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
// 단순 프로퍼티 이름
const checkName = matchesProperty('name', 'Alice');
console.log(checkName({ name: 'Alice' })); // true
console.log(checkName({ name: 'Bob' })); // false

// 프로퍼티 배열
const checkNested = matchesProperty(['address', 'city'], '서울');
console.log(checkNested({ address: { city: '서울' } })); // true
console.log(checkNested({ address: { city: '부산' } })); // false

// 깊은 경로
const checkNested = matchesProperty('address.city', '서울');
console.log(checkNested({ address: { city: '서울' } })); // true
console.log(checkNested({ address: { city: '부산' } })); // false
```
