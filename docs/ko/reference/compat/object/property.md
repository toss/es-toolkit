# property

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체에서 주어진 경로에 있는 값을 가져오는 함수를 만들어요. 값을 가져오기 위해서는 [`get`](./get.md) 함수를 사용해요.

## 인터페이스

```typescript
function property(path: PropertyKey | readonly PropertyKey[]): (object: unknown) => any;
```

### 파라미터

- `path` (`string` or `number` or `symbol` or `Array<string | number | symbol>`): 프로퍼티를 가져올 경로.

### 반환 값

(`(object: unknown) => any`): 객체에서 주어진 경로에 있는 값을 가져오는 함수.

## 예시

```typescript
import { property } from 'es-toolkit/compat';

const getObjectValue = property('a.b.c');
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3

const getObjectValue = property(['a', 'b', 'c']);
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3
```
