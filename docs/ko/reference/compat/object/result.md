# result

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체의 주어진 경로에서 값을 가져와요.
해결된 값이 함수라면, 객체를 `this` 컨텍스트로 하여 호출돼요.
값이 `undefined`인 경우, `defaultValue`가 반환돼요.

## 인터페이스

```typescript
function result<T>(
  object: unknown,
  path: string | number | symbol | ReadonlyArray<string | number | symbol>,
  defaultValue?: T | ((...args: unknown[]) => T)
): T;
```

### 파라미터

- `object` (`unknown`): 쿼리할 객체예요.
- `path` (`string | number | symbol | ReadonlyArray<string | number | symbol>`): 얻고자 하는 속성의 경로예요.
- `defaultValue` (`T | ((...args: unknown[]) => T)`): 해결된 값이 `undefined`일 때 반환되는 값이에요.

### 반환 값

(`T`): 해결된 값을 반환해요.

## 예시

```typescript
const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.c');
// => 3

const obj = { a: () => 5 };
result(obj, 'a');
// => 5 (calls the function `a` and returns its result)

const obj = { a: { b: null } };
result(obj, 'a.b.c', 'default');
// => 'default'

const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.d', () => 'default');
// => 'default'
```
