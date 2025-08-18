# zipObjectDeep

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

두 배열을 하나의 객체로 결합해요. 첫 번째 배열은 프로퍼티 경로를 나타내고, 두 번째 배열은 값을 나타내요. [zipObject](../../array/zipObject.md)와 다르게, 프로퍼티로 `a.b` 와 같은 경로를 지정할 수 있어요.

프로퍼티 이름을 나타내는 배열이 값을 나타내는 배열보다 길면, 값들은 `undefined`로 채워져요.

## 인터페이스

```typescript
function zipObjectDeep<P extends PropertyKey, V>(keys: ArrayLike<P | P[]>, values: ArrayLike<V>): Record<P, V>;
```

### 파라미터

- `keys` (`ArrayLike<P | P[]>`): 프로퍼티 경로가 포함된 배열.
- `values` (`ArrayLike<V>`): 값에 대응되는 값이 포함된 배열.

### 반환 값

(`Record<P, V>`): 주어진 속성 이름과 값으로 구성된 새로운 객체예요.

## 예시

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result 는 { a: { b: { c: 1 } }, d: { e: { f: 2 } } }가 돼요

const paths = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result 는 { a: { b: { c: 1 } }, d: { e: { f: 2 } } }가 돼요

const paths = ['a.b[0].c', 'a.b[1].d'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result 는 { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }가 돼요
```

## 성능 비교

|                   | [번들 사이즈](../../../bundle-size.md) | [성능](../../../performance.md) |
| ----------------- | -------------------------------------- | ------------------------------- |
| es-toolkit/compat | 938 바이트 (88% 작음)                  | 1,102,767 회 (25% 빠름)         |
| lodash-es         | 7,338 바이트                           | 1,476,660 회                    |
