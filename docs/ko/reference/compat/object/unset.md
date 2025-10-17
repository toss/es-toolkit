# unset (Lodash 호환성)

::: warning `delete` 연산자를 사용하세요

이 `unset` 함수는 복잡한 경로 파싱과 중첩 객체 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `delete` 연산자를 직접 사용하세요.

:::

객체의 지정된 경로에 있는 속성을 제거해요.

```typescript
const success = unset(object, path);
```

## 인터페이스

```typescript
function unset(obj: any, path: PropertyKey | PropertyKey[]): boolean;
```

### 파라미터

- `obj` (`any`): 수정할 객체예요.
- `path` (`PropertyKey | PropertyKey[]`): 제거할 속성의 경로예요.

#### 반환 값

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
