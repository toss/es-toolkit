# propertyOf

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체의 주어진 경로에 있는 값을 반환하는 함수를 생성해요.

[`property`](./property.md)는 특정 경로에 바인딩된 함수를 생성하여 객체로부터 값을 검색할 수 있게 하고,
`propertyOf`는 특정 객체에 바인딩된 함수를 생성하여 경로로부터 값을 검색할 수 있게 해요.

## 인터페이스

```typescript
function propertyOf(object: unknown): (path: PropertyKey | PropertyKey[]) => unknown;
```

### 파라미터

- `object` (`unknown`): 검색할 객체.

### 반환 값

(`(path: PropertyKey | PropertyKey[]) => unknown`): 경로를 입력받고 지정된 경로에서 객체의 값을 검색하는 함수.

## 예시

```typescript
const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue('a.b.c');
console.log(result); // => 3

const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue(['a', 'b', 'c']);
console.log(result); // => 3
```
