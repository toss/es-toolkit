# fromPairs

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

키-값 쌍의 배열을 객체로 변환합니다.

## 인터페이스

```typescript
function fromPairs(pairs: any[]): Record<string, any>;
function fromPairs<T extends PropertyKey, U>(pairs: Array<[T, U]> | Map<T, U>): Record<T, U>;
function fromPairs<T extends PropertyKey, U>(data: Array<[T, U]> | Map<T, U>): Record<T, U>;
```

### 파라미터

- `pairs` (`Array<[T, U]>`): `PropertyKey`가 키이며 `U` 타입의 값인 키-값 쌍의 배열입니다. 배열.

### 반환 값

(`Record<T, U>`): 키가 `T` 타입이고 값이 `U` 타입인 객체입니다. 문자열.

## 예시

```typescript
const pairs = [
  ['a', 1],
  ['b', 2],
];
const result = fromPairs(pairs);
// result will be: { a: 1, b: 2 }
```
