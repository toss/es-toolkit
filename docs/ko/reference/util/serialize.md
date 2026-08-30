# serialize

값을 문자열로 직렬화해요.

```typescript
const serialized = serialize(value);
```

## 사용법

### `serialize(value)`

값을 문자열로 변환하고 싶을 때 `serialize`를 사용하세요. 내장 `JSON.stringify()`와 다르게, `Map`이나 `Set`, `Date`, `RegExp`와 같은 내장 객체나 `BigInt` 같은 값도 직렬화할 수 있어요.

`{ a: 1, b: 2 }`나 `{ b: 2, a: 1 }`처럼 구조가 같은 값은 항상 같은 값으로 안정적으로 직렬화돼요.

```typescript
import { serialize } from 'es-toolkit/util';

serialize({ b: 2, a: 1 });
// '{a:1,b:2}'를 반환해요

serialize({ a: 1, b: 2 }) === serialize({ b: 2, a: 1 });
// true를 반환해요

serialize([1, 2n, 'a', { k: 1 }]);
// "[1,2n,'a',{k:1}]"를 반환해요

serialize(new Set([3, 1, 2]));
// 'Set[1,2,3]'을 반환해요

serialize(
  new Map([
    ['b', 2],
    ['a', 1],
  ])
);
// 'Map{a:1,b:2}'를 반환해요

serialize(new Date(0));
// 'Date(1970-01-01T00:00:00.000Z)'를 반환해요

serialize(new Uint8Array([1, 2, 3]));
// 'Uint8Array[1,2,3]'을 반환해요
```

기본 타입은 다음과 같이 직렬화돼요.

| 타입        | 입력                     | 결과          |
| ----------- | ------------------------ | ------------- |
| 문자열      | `serialize('abc')`       | `"'abc'"`     |
| 숫자        | `serialize(123)`         | `"123"`       |
|             | `serialize(-0)`          | `"0"`         |
|             | `serialize(NaN)`         | `"NaN"`       |
|             | `serialize(Infinity)`    | `"Infinity"`  |
| 불리언      | `serialize(true)`        | `"true"`      |
| `undefined` | `serialize(undefined)`   | `"undefined"` |
| `null`      | `serialize(null)`        | `"null"`      |
| `BigInt`    | `serialize(123n)`        | `"123n"`      |
| 심볼        | `serialize(Symbol('a'))` | `"Symbol(a)"` |

클래스 인스턴스는 클래스 이름과 함께 직렬화돼요. 인스턴스에 `toJSON` 메서드가 있으면 `toJSON`의 결과를 직렬화해요.

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// "User{name:'Alice'}"를 반환해요
```

함수는 `이름:소스` 형태로 직렬화돼요. 코드 포매팅에 따라 결과가 달라지지 않도록 소스의 줄바꿈과 주변 공백은 제거돼요. 소스를 확인할 수 없는 네이티브 함수는 `이름:[native]`로 직렬화돼요.

```typescript
function sum(a, b) {
  return a + b;
}
serialize(sum);
// 'sum:function sum(a, b) {return a + b;}'를 반환해요

serialize(Math.max);
// 'max:[native]'를 반환해요
```

순환 참조는 `#ref{n}` 형태의 백레퍼런스로 직렬화돼요. `n`은 객체를 처음 방문한 순서예요.

```typescript
const obj = {};
obj.self = obj;
serialize(obj);
// '{self:#ref0}'을 반환해요
```

`Promise`, `WeakMap`, `Blob`처럼 의미 있게 직렬화할 수 없는 객체는 `TypeError`를 던져요.

```typescript
serialize(new WeakMap());
// TypeError: Cannot serialize WeakMap
```

::: warning 보안에 민감한 용도로는 사용하지 마세요

`serialize`는 성능을 위해 문자열이나 키를 이스케이프하지 않아요. 그래서 의도적으로 서로 다른 값이 같은 문자열로 직렬화되도록 악의적인 입력을 만들 수 있어요. 일반적인 용도의 캐시 키나 변경 감지에 사용하고, 보안이 중요한 곳에는 사용하지 마세요.

:::

#### 파라미터

- `value` (`unknown`): 직렬화할 값.

#### 반환 값

(`string`): 직렬화된 문자열.

#### 에러

(`TypeError`): `Promise`, `WeakMap`, `WeakSet`, `Blob`, `DataView`처럼 직렬화할 수 없는 객체가 포함되어 있으면 에러가 발생해요.
