# isEqualWith

두 값이 동일한지를 주어진 비교 함수를 이용해서 비교해요.

비교 함수를 제공함으로써 두 값이 동일한지를 검증하는 방법을 세세하게 조정할 수 있어요.
주어진 비교 함수가 `true`를 반환하면, 두 값은 동일하게 취급돼요. `false`를 반환하면, 두 값은 다르게 취급돼요.
`undefined`를 반환하면, [isEqual](./isEqual.md)이 제공하는 기본 방법으로 두 값을 비교해요.

객체, 배열, `Map`, `Set`처럼 여러 요소를 가지고 있을 때도, 주어진 비교 함수로 요소 사이의 값들을 비교해요.

기본적인 비교 방법 위에서, 복잡한 비교를 처리하기 위한 방법을 정의할 수 있어서, 유연하게 두 값을 비교할 수 있어요.

## 인터페이스

```typescript
function isEqualWith(
  a: any,
  b: any,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
): boolean;
```

### 파라미터

- `a` (`unknown`): 비교할 첫 번째 값.
- `b` (`unknown`): 비교할 두 번째 값.
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 두 값을 비교하는 방법을 나타내는 비교 함수. 두 값이 같은지를 나타내는 불리언 값을 반환할 수 있어요. `undefined`를 반환하면, 기본 방법으로 두 값을 비교해요.
  - `x`: 첫 번째 객체 `a`에 속한 값.
  - `y`: 두 번째 객체 `b`에 속한 값.
  - `property`: `x`와 `y`를 가져오기 위해 사용한 프로퍼티 키.
  - `xParent`: 첫 번째 값 `x`의 부모.
  - `yParent`: 두 번째 값 `y`의 부모.
  - `stack`: 순환 참조를 처리하기 위한 내부 스택(`Map`).

### 반환 값

(`boolean`): 값이 사용자 지정 기준에 따라 동등하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.
문자열.

## 예시

```typescript
const customizer = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};
isEqualWith('Hello', 'hello', customizer); // true
isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true
isEqualWith([1, 2, 3], [1, 2, 3], customizer); // true
```
