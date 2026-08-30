# serialize

어떤 값이든 안정적인 문자열로 직렬화해요.

```typescript
const serialized = serialize(value);
```

## 사용법

### `serialize(value)`

해싱, 캐시 키, 변경 감지처럼 값의 안정적인 문자열 표현이 필요할 때 `serialize`를 사용하세요. 구조가 같은 두 값은 항상 같은 문자열로 직렬화돼요. 일반 객체의 키, `Map`의 키, `Set`의 값이 정렬되기 때문에 삽입 순서에 상관없이 같은 결과가 나와요.

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

클래스 인스턴스는 클래스 이름과 함께 직렬화돼요. 인스턴스에 `toJSON` 메서드가 있으면 `toJSON`의 결과를 직렬화해요.

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// "User{name:'Alice'}"를 반환해요
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

::: warning 보안 용도로 설계되지 않았어요

`serialize`는 문자열이나 키를 이스케이프하지 않기 때문에, 의도적으로 서로 다른 값이 같은 문자열로 직렬화되도록 만들 수 있어요. 캐시 키나 변경 감지에 사용하고, 보안이 중요한 곳에는 사용하지 마세요.

:::

#### 파라미터

- `value` (`unknown`): 직렬화할 값.

#### 반환 값

(`string`): 직렬화된 문자열.

#### 에러

(`TypeError`): `Promise`, `WeakMap`, `WeakSet`, `Blob`, `DataView`처럼 직렬화할 수 없는 객체가 포함되어 있으면 던져요.
