# cloneDeep

与えられたオブジェクトを深くコピーします。

## インターフェース

```typescript
function cloneDeep<T>(obj: T): T;
```

### パラメータ

- `obj` (`T`): コピーするオブジェクトです。

### 戻り値

(`T`): 与えられたオブジェクトの深いコピーです。

## 例

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

// ネストされたオブジェクトと配列
const nestedObj = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const clonedNestedObj = cloneDeep(nestedObj);
console.log(clonedNestedObj); // { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] }
console.log(clonedNestedObj === nestedObj); // false
console.log(clonedNestedObj.a === nestedObj.a); // false
console.log(clonedNestedObj.d === nestedObj.d); // false
console.log(clonedNestedObj.d[2] === nestedObj.d[2]); // false
```

### 読み取り専用プロパティ

getterとして定義された読み取り専用プロパティを持つオブジェクトを深くコピーすると、新しくコピーされたオブジェクトはgetterの返す値を持ちます。

```tsx
const source = {
  get value() {
    return 3;
  },
};

const cloned = cloneDeep(source);
// cloned is now { value: 3 }
```

## デモ

::: sandpack

```ts index.ts
import { cloneDeep } from 'es-toolkit/object';

const original = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const cloned = cloneDeep(original);

console.log(cloned);
console.log(original !== cloned);
```

:::
