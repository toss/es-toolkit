# result

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체의 주어진 경로에서 값을 가져와요.

[get](./get.md) 함수와 기본적인 동작은 같지만, 값을 찾는 과정에서 함수를 만나면 해당 함수를 호출하며 진행해요.

찾은 값이 `undefined`인 경우, 기본값을 반환하며 기본값이 함수라면 해당 함수를 호출해요.

## 인터페이스

```typescript
function result(
  object: any,
  path: PropertyKey | PropertyKey[],
  defaultValue?: any | ((...args: any[]) => any)
): any;
```

### 파라미터

- `object` (`any`): 검색할 객체.
- `path` (`PropertyKey | PropertyKey[]`): 속성을 가져올 경로.
- `defaultValue` (`any`): 찾은 값이 `undefined` 일 때 반환할 값.

### 반환 값

(`any`): 해결된 값을 반환해요.

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
