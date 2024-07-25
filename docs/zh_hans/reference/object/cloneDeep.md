# cloneDeep

创建给定对象的深拷贝。

## 签名

```typescript
function cloneDeep<T>(obj: T): T;
```

### 参数

- `obj` (`T`): 要克隆的对象。

### 返回

(`T`): 给定对象的深拷贝

## 示例

```typescript
const num = 29;
const clonedNum = cloneDeep(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = cloneDeep(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = cloneDeep(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false

// 嵌套对象和数组
const nestedObj = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const clonedNestedObj = cloneDeep(nestedObj);
console.log(clonedNestedObj); // { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] }
console.log(clonedNestedObj === nestedObj); // false
console.log(clonedNestedObj.a === nestedObj.a); // false
console.log(clonedNestedObj.d === nestedObj.d); // false
console.log(clonedNestedObj.d[2] === nestedObj.d[2]); // false
```
