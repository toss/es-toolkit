# isIterable

값이 이터러블(iterable)인지 확인해요.

```typescript
const result = isIterable(value);
```

## 사용법

### `isIterable(value)`

값이 이터러블 프로토콜을 구현하는지, 즉 `Symbol.iterator` 메서드를 가지고 있는지 확인하고 싶을 때 `isIterable`을 사용하세요. 배열, 문자열, `Set`, `Map`, 타입 배열(typed array), 제너레이터는 이터러블이에요. 일반 객체와 `null`, `undefined`는 이터러블이 아니에요.

```typescript
import { isIterable } from 'es-toolkit/predicate';

// 이터러블인 값
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable('abc')); // true
console.log(isIterable(new Set([1, 2, 3]))); // true
console.log(isIterable(new Map())); // true

// 이터러블이 아닌 값
console.log(isIterable({ a: 1 })); // false
console.log(isIterable(123)); // false
console.log(isIterable(null)); // false
```

타입스크립트에서 타입 가드로도 사용할 수 있어요.

```typescript
function collect(value: unknown): unknown[] {
  // 이 분기 안에서 `value`는 `Iterable<unknown>`으로 좁혀져요
  if (isIterable(value)) {
    return [...value];
  }
  return [];
}
```

#### 파라미터

- `value` (`unknown`): 확인할 값이에요.

#### 반환 값

(`value is Iterable<unknown>`): 값이 이터러블이면 `true`, 그렇지 않으면 `false`를 반환해요.
