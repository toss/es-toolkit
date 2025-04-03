# extendWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`source` 객체가 가지고 있는 프로퍼티 값들을 `object` 객체에 할당해요. 각 속성에 대해 어떤 값이 할당될지를 결정하는 `getValueToAssign` 함수를 제공할 수 있어요.

이미 `source`가 가지고 있는 값과 같은 값은 덮어쓰지 않아요.

`getValueToAssign` 함수로 `object` 객체에 할당할 값을 결정할 수 있어요. 함수가 반환하는 값이 할당돼요. 값이 주어지지 않으면, `identity` 함수가 기본값으로 사용돼요.

## 인터페이스

```typescript
function extendWith<O, S>(
  object: O,
  source: S,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S) => any
): O & S;
function extendWith<O, S1, S2>(
  object: O,
  source1: S1,
  source2: S2,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2) => any
): O & S1 & S2;
function extendWith<O, S1, S2, S3>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3) => any
): O & S1 & S2 & S3;
function extendWith<O, S1, S2, S3, S4>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3 | S4) => any
): O & S1 & S2 & S3 & S4;
function extendWith(object: any, ...sources: any[]): any;
```

### 파라미터

- `object` (`any`): `source`의 프로퍼티 값이 할당될 객체.
- `sources` (`...any[]`): `object`에 할당할 값을 가지고 있는 객체들.
- `getValueToAssign` (`(objValue: any, srcValue: any, key: string, object: O, source: S) => any)`): 각 속성에 대해 할당할 값을 결정하는 함수. 함수가 반환하는 값이 해당 속성에 할당돼요.

### 반환 값

(`any`): 새로운 값이 할당된 `object` 객체.

## 예시

```typescript
const target = { a: 1 };
const result = assignInWith(target, { b: 2 }, { c: 3 }, function (objValue, srcValue) {
  return objValue === undefined ? srcValue : objValue;
});
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```
