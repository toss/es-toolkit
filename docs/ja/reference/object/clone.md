# clone

与えられた値をシャローコピーします。

```typescript
const cloned = clone(obj);
```

## 参照

### `clone(obj)`

オブジェクト、配列、Date、RegExp などの値をシャローコピーしたい場合は `clone` を使用してください。シャローコピーは、最上位レベルのプロパティのみが新しくコピーされ、ネストされたオブジェクトや配列は元の値と参照を共有します。

```typescript
import { clone } from 'es-toolkit/object';

// プリミティブ値はそのまま返されます
const num = 29;
const clonedNum = clone(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// 配列をシャローコピー
const arr = [1, 2, 3];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

// オブジェクトをシャローコピー
const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = clone(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false
console.log(clonedObj.c === obj.c); // true (シャローコピーのため、ネストされた配列は参照を共有)
```

`Date`、`RegExp`、`Map`、`Set` などのさまざまな JavaScript 型をサポートしています。

```typescript
// Date オブジェクト
const date = new Date();
const clonedDate = clone(date);
console.log(clonedDate !== date); // true
console.log(clonedDate.getTime() === date.getTime()); // true

// RegExp オブジェクト
const regex = /abc/gi;
const clonedRegex = clone(regex);
console.log(clonedRegex !== regex); // true
console.log(clonedRegex.source === regex.source); // true

// Map と Set
const map = new Map([['key', 'value']]);
const clonedMap = clone(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key')); // 'value'
```

#### パラメータ

- `obj` (`T`):コピーする値です。オブジェクト、配列、プリミティブ値など、すべての型が可能です。

#### 戻り値

(`T`):与えられた値のシャローコピーです。
