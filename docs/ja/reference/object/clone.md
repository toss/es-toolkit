# clone

与えられたオブジェクトの浅いコピーを作成します。

## シグネチャ

```typescript
function clone<T>(value: T): T;
```

### パラメータ

- `obj` (`T`): コピーするオブジェクトです。

### 戻り値

(`T`): 与えられたオブジェクトの浅いコピーです。

## 例

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
