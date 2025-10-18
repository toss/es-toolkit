# cloneDeep

주어진 값을 깊게 복사해요.

```typescript
const deepCloned = cloneDeep(obj);
```

## 레퍼런스

### `cloneDeep(obj)`

객체나 배열을 중첩된 구조까지 모두 새롭게 복사하고 싶을 때 `cloneDeep`을 사용하세요. 깊은 복사는 모든 중첩된 객체와 배열까지 완전히 독립적으로 복사해서, 원본과 복사본이 서로 영향을 주지 않아요.

```typescript
import { cloneDeep } from 'es-toolkit/object';

// 원시 값은 그대로 반환돼요
const num = 29;
const clonedNum = cloneDeep(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// 중첩된 객체를 깊게 복사해요
const obj = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const clonedObj = cloneDeep(obj);
console.log(clonedObj); // { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] }
console.log(clonedObj === obj); // false
console.log(clonedObj.a === obj.a); // false (중첩된 객체도 새로 복사됨)
console.log(clonedObj.d === obj.d); // false (중첩된 배열도 새로 복사됨)
console.log(clonedObj.d[2] === obj.d[2]); // false (배열 안의 객체도 새로 복사됨)

// 원본을 수정해도 복사본에 영향 없음
const original = { a: { count: 1 } };
const copied = cloneDeep(original);
original.a.count = 2;
console.log(copied.a.count); // 1 (변하지 않음)
```

`Map`, `Set` 같은 다양한 JavaScript 타입들을 지원하고, 순환 참조가 있는 객체도 지원해요.

```typescript
// Map과 Set을 깊게 복사
const map = new Map([['key', { nested: 'value' }]]);
const clonedMap = cloneDeep(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key') !== map.get('key')); // true (중첩된 객체도 새로 복사)

// 순환 참조도 안전하게 처리
const circular: any = { name: 'test' };
circular.self = circular;
const clonedCircular = cloneDeep(circular);
console.log(clonedCircular !== circular); // true
console.log(clonedCircular.self === clonedCircular); // true (순환 참조 유지)
```

접근자(getter)로 정의된 읽기 전용 속성의 경우, 복사된 객체에는 접근자의 반환 값이 일반 속성으로 저장돼요.

```typescript
const source = {
  get computedValue() {
    return 42;
  },
  normalValue: 'hello',
};

const cloned = cloneDeep(source);
console.log(cloned); // { computedValue: 42, normalValue: 'hello' }
```

#### 파라미터

- `obj` (`T`): 깊게 복사할 값이에요. 객체, 배열, 원시값 등 모든 타입이 가능해요.

#### 반환 값

(`T`): 주어진 값의 깊은 복사본이에요.
