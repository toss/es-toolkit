# unset

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 경로에 있는 객체의 속성을 제거해요.

## 인터페이스

```typescript
function unset(obj: unknown, path: PropertyKey | PropertyKey[]): boolean;
```

### 파라미터

- `obj` (`unknown`): 수정할 객체예요.
- `path` (`PropertyKey | PropertyKey[]`): 제거할 속성의 경로예요.

### 반환 값

(`boolean`): 속성이 삭제되면 true를 반환하고, 그렇지 않으면 false를 반환해요.
문자열.

## 예시

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
