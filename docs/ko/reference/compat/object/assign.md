# assign

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`source` 객체가 가지고 있는 프로퍼티 값들을 `object` 객체에 할당해요. 프로토타입에서 상속된 프로퍼티도 포함돼요.

`source`와 `object`이 같은 값으로 가지고 있는 프로퍼티는 덮어쓰지 않아요.

## 인터페이스

```typescript
function assign<O, S>(object: O, source: S): O & S;
function assign<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;
function assign<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;
function assign<O, S1, S2, S3, S4>(object: O, source1: S1, source2: S2, source3: S3, source4: S4): O & S1 & S2 & S3 & S4;
function assign(object: any, ...sources: any[]): any;
```

### 파라미터

- `object` (`any`): `source`의 프로퍼티 값이 할당될 객체.
- `sources` (`...any[]`): `object`에 할당할 값을 가지고 있는 객체들.

### 반환 값

(`any`): `source`의 값이 할당된 `object` 객체.

## 예시

```typescript
const target = { a: 1 };
const result = assign(target, { b: 2 }, { c: 3 });
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```