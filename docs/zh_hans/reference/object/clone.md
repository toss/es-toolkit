# clone

创建给定对象的浅拷贝。

## 签名

```typescript
function clone<T>(value: T): T;
```

### 参数

- `obj` (`T`): 要克隆的对象。

### 返回

(`T`): 给定对象的浅拷贝

## 示例

```typescript
const num = 29;
const clonedNum = clone(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = clone(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false
```
