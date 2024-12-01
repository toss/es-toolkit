# cloneDeepWith

指定されたオブジェクトをディープクローンします。

`cloneValue` 関数を使用してディープクローンの方法を調整できます。この関数は現在の値 `value`、プロパティ名 `key`、全体のオブジェクト `obj` を引数として受け取ります。関数が値を返すと、その値が使用され、`undefined` を返すとデフォルトの方法でクローンされます。

## インターフェース

```typescript
function cloneDeepWith<T>(
  obj: T,
  cloneValue: (value: any, key: PropertyKey | undefined, object: T | undefined, stack: Map<any, any>) => any
): T;
```

### パラメータ

- `obj` (`T`): クローンするオブジェクト。
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T | undefined, stack: Map<any, any>) => any`): 値をクローンする方法を示す関数。デフォルトの方法を使用せずに値をクローンして返すことができます。`undefined`を返すと、デフォルトの方法で値がクローンされます。
  - `value`: 現在クローンされている値。
  - `key`: 現在クローンされている値のプロパティ名。
  - `obj`: クローンする全体のオブジェクト `obj`。
  - `stack`: 循環参照を処理するための内部スタック(`Map`)。

### 戻り値

(`T`): 指定されたオブジェクトのディープクローン。

## 例

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
