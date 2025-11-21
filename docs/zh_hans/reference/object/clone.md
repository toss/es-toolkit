# clone

创建给定值的浅拷贝。

```typescript
const cloned = clone(obj);
```

## 用法

### `clone(obj)`

当您想要浅拷贝对象、数组、Date、RegExp 等值时使用 `clone`。浅拷贝意味着只复制顶层属性,嵌套的对象或数组与原始值共享引用。

```typescript
import { clone } from 'es-toolkit/object';

// 原始值按原样返回
const num = 29;
const clonedNum = clone(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// 浅拷贝数组
const arr = [1, 2, 3];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

// 浅拷贝对象
const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = clone(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false
console.log(clonedObj.c === obj.c); // true (由于浅拷贝,嵌套数组共享引用)
```

支持各种 JavaScript 类型,如 `Date`、`RegExp`、`Map` 和 `Set`。

```typescript
// Date 对象
const date = new Date();
const clonedDate = clone(date);
console.log(clonedDate !== date); // true
console.log(clonedDate.getTime() === date.getTime()); // true

// RegExp 对象
const regex = /abc/gi;
const clonedRegex = clone(regex);
console.log(clonedRegex !== regex); // true
console.log(clonedRegex.source === regex.source); // true

// Map 和 Set
const map = new Map([['key', 'value']]);
const clonedMap = clone(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key')); // 'value'
```

#### 参数

- `obj` (`T`):要复制的值。可以是任何类型,如对象、数组或原始值。

#### 返回值

(`T`):给定值的浅拷贝。
