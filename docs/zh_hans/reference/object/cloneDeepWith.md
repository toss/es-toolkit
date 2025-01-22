# cloneDeepWith

深度克隆给定的对象。

可以使用 `cloneValue` 函数来调整深度克隆的方法。该函数接受当前值 `value`、属性名 `key` 和整个对象 `obj` 作为参数。如果函数返回一个值，则使用该值；如果返回 `undefined`，则使用默认方法进行克隆。

## 签名

```typescript
function cloneDeepWith<T>(
  obj: T,
  cloneValue: (value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any
): T;
```

### 参数

- `obj` (`T`): 要克隆的对象。
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any`): 表示如何克隆值的函数。可以返回克隆后的值而不是使用默认方法。如果返回 `undefined`，则使用默认方法克隆值。
  - `value`: 当前正在克隆的值。
  - `key`: 当前正在克隆的值的属性名。
  - `obj`: 要克隆的整个对象 `obj`。
  - `stack`: 处理循环引用的内部栈(`Map`)。

### 返回值

(`T`): 给定对象的深层克隆。

## 示例

```typescript
// Clone a primitive value
const num = 29;
const clonedNum = cloneDeepWith(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// Clone an object with a customizer
const obj = { a: 1, b: 2 };
const clonedObj = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value * 2; // Double the number
  }
});
console.log(clonedObj); // { a: 2, b: 4 }
console.log(clonedObj === obj); // false

// Clone an array with a customizer
const arr = [1, 2, 3];
const clonedArr = cloneDeepWith(arr, value => {
  return value + 1; // Increment each value
});
console.log(clonedArr); // [2, 3, 4]
console.log(clonedArr === arr); // false
```
