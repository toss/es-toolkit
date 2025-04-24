# toPairsIn

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체, 집합 또는 맵에서 키-값 쌍의 배열을 생성해요. 상속된 속성도 포함돼요.

- 객체가 제공되면, 객체의 속성과 값으로 구성된 쌍(`[key, value]`)의 배열을 반환해요.
- `Set`이 제공되면, `[value, value]` 형식으로 구성된 쌍의 배열을 반환해요.
- `Map`이 제공되면, 키와 값으로 구성된 쌍(`[key, value]`)의 배열을 반환해요.

## 인터페이스

```typescript
function toPairsIn<T>(object: Record<string | number, T>): Array<[string, T]>;
function toPairsIn<T>(set: Set<T>): Array<[T, T]>;
function toPairsIn<K, V>(map: Map<K, V>): Array<[K, V]>;
function toPairsIn(object: Record<any, any> | Set<any> | Map<any, any>): Array<[PropertyKey, any]>;
```

### 파라미터

- `object` (`Record<any, any> | Set<any> | Map<any, any>`): 조회할 객체, 집합 또는 맵이에요.

### 반환 값

(`Array<[key: PropertyKey, value: any]>`): 키-값 쌍의 배열을 반환해요.

## 예시

```typescript
const object = { a: 1, b: 2 };
toPairsIn(object); // [['a', 1], ['b', 2]]

const set = new Set([1, 2]);
toPairsIn(set); // [[1, 1], [2, 2]]

const map = new Map();
map.set('a', 1);
map.set('b', 2);
toPairsIn(map); // [['a', 1], ['b', 2]]
```
