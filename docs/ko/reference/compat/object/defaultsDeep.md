# defaultsDeep

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

[defaults](./defaults.md) 함수와 비슷하지만 프로퍼티가 중첩된 객체에 대해서도 재귀적으로 기본값을 할당해요.

> 주의: 이 함수는 첫 번째 파라미터 `object`를 수정해요.

## 인터페이스

```typescript
function defaultsDeep<T extends object>(object: T): NonNullable<T>;
function defaultsDeep<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function defaultsDeep<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function defaultsDeep<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### 파라미터

- `object` (`T`): 기본값을 받을 대상 객체.
- `sources` (`S[]`): 기본값을 제공할 하나 이상의 소스 객체.

### 반환 값

(`object`): 기본값이 적용된 대상 객체.

## 예시

```typescript
// 기본 사용법
defaultsDeep({ a: 1 }, { a: 2, b: 2 }); // { a: 1, b: 2 }

// 중첩 객체 병합
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// null 값은 덮어쓰지 않음
defaultsDeep({ a: { b: null } }, { a: { b: 2 } }); // { a: { b: null } }

// undefined 값은 덮어씀
defaultsDeep({ a: { b: undefined } }, { a: { b: 2 } }); // { a: { b: 2 } }

// 여러 소스 객체 사용
defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// 순환 참조 처리
const obj1 = { foo: { b: { c: { d: {} } } }, bar: { a: 2 } };
const obj2 = { foo: { b: { c: { d: {} } } }, bar: {} };
obj1.foo.b.c.d = obj1; // 순환 참조 생성
obj2.foo.b.c.d = obj2; // 순환 참조 생성
obj2.bar.b = obj2.foo.b; // 교차 참조
const result = defaultsDeep(obj1, obj2);
// 순환 참조와 참조 구조가 올바르게 유지됨
```
