# conforms

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`source`의 프로퍼티들이 가지는 조건 함수들을 `target`이 가지고 있는 프로퍼티들에 적용해서, 모든 조건이 참이면 `true`를, 아니면 `false`를 반환하는 함수를 생성해요.

생성된 함수는 부분적으로 적용된 [conformsTo](./conformsTo.md)와 동일해요.

## 인터페이스

```typescript
function conforms(source: Record<PropertyKey, (value: any) => boolean>): (object: Record<PropertyKey, any>) => boolean;
```

### 파라미터

- `source` (`Record<PropertyKey, (value: any) => boolean>`): 조건 함수들을 가지고 있는 객체.

### 반환 값

(`(object: Record<PropertyKey, any>) => boolean`): 인자로 주어진 객체가 조건들을 만족시키는지 확인하는 함수.

## 예시

```typescript
const isPositive = n => n > 0;
const isEven = n => n % 2 === 0;
const predicates = { a: isPositive, b: isEven };
const conform = conforms(predicates);

console.log(conform({ a: 2, b: 4 })); // true
console.log(conform({ a: -1, b: 4 })); // false
console.log(conform({ a: 2, b: 3 })); // false
console.log(conform({ a: 0, b: 2 })); // false
```
