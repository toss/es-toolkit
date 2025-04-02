# toPairs

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체, `Set`, 또는 `Map`에서 프로퍼티와 값을 쌍으로 묶은 요소의 배열을 만들어요.

- 객체가 주어지면, 객체의 프로퍼티와 값을 쌍으로 묶은 요소(`[key, value]`)들의 배열을 반환해요.
- `Set`이 주어지면, 요소를 `[value, value]` 형식으로 쌍으로 만든 배열을 반환을 반환해요.
- `Map`이 주어지면, 키와 값을 쌍으로 묶은 요소(`[key, value]`)들의 배열을 반환해요.

## 인터페이스

```typescript
function toPairs<T>(object: Record<string | number, T>): Array<[string, T]>;
function toPairs<T>(set: Set<T>): Array<[T, T]>;
function toPairs<K, V>(map: Map<K, V>): Array<[K, V]>;
```

### 파라미터

- `object` (`Record<string | number, T> | Set<T> | Map<K, V>`): 조회할 객체, `Set`, 또는 `Map`.

### 반환 값

(`Array<[key: PropertyKey, value: T]>`): 프로퍼티-값 쌍.

## 예시

```typescript
const object = { a: 1, b: 2 };
toPairs(object); // [['a', 1], ['b', 2]]

const set = new Set([1, 2]);
toPairs(set); // [[1, 1], [2, 2]]

const map = new Map();
map.set('a', 1);
map.set('b', 2);
toPairs(map); // [['a', 1], ['b', 2]]
```
