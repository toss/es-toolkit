# clone

주어진 값을 얕게 복사해요.

```typescript
const cloned = clone(obj);
```

## 사용법

### `clone(obj)`

객체, 배열, Date, RegExp 등의 값을 얕게 복사하고 싶을 때 `clone`을 사용하세요. 얇은 복사는 최상위 레벨의 속성들만 새로 복사되고, 중첩된 객체나 배열은 원본과 레퍼런스를 공유해요.

```typescript
import { clone } from 'es-toolkit/object';

// 원시 값은 그대로 반환돼요
const num = 29;
const clonedNum = clone(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// 배열을 얇게 복사해요
const arr = [1, 2, 3];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

// 객체를 얇게 복사해요
const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = clone(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false
console.log(clonedObj.c === obj.c); // true (얇은 복사이므로 중첩된 배열은 참조 공유)
```

`Date`, `RegExp`, `Map`, `Set` 같은 다양한 JavaScript 타입들을 지원해요.

```typescript
// Date 객체
const date = new Date();
const clonedDate = clone(date);
console.log(clonedDate !== date); // true
console.log(clonedDate.getTime() === date.getTime()); // true

// RegExp 객체
const regex = /abc/gi;
const clonedRegex = clone(regex);
console.log(clonedRegex !== regex); // true
console.log(clonedRegex.source === regex.source); // true

// Map과 Set
const map = new Map([['key', 'value']]);
const clonedMap = clone(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key')); // 'value'
```

#### 파라미터

- `obj` (`T`): 복사할 값이에요. 객체, 배열, 원시값 등 모든 타입이 가능해요.

#### 반환 값

(`T`): 주어진 값의 얇은 복사본이에요.
