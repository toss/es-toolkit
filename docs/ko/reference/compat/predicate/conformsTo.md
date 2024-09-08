# conformsTo

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`source`의 프로퍼티들이 가지는 조건 함수들을 `target`이 가지고 있는 프로퍼티들에 적용해서, 모든 조건이 참이면 `true`를, 아니면 `false`를 반환해요.

이 함수를 부분적으로 적용하면 [conforms](./conforms.md) 함수와 동작이 동일해요.

## 인터페이스

```typescript
function conformsTo(target: Record<PropertyKey, any>, source: Record<PropertyKey, (value: any) => boolean>): boolean;
```

### 파라미터

- `target` (`Record<PropertyKey, any>`): 검사할 객체예요.
- `source` (`Record<PropertyKey, (value: any) => boolean>`): 일치할 속성 조건의 객체예요.

### 반환 값

(`boolean`): `object`가 일치하면 `true`, 그렇지 않으면 `false`를 반환해요.

## 예시

```typescript
const object = { a: 1, b: 2 };
const source = {
  a: n => n > 0,
  b: n => n > 1,
};

console.log(conformsTo(object, source)); // => true

const source2 = {
  a: n => n > 1,
  b: n => n > 1,
};

console.log(conformsTo(object, source2)); // => false
```
