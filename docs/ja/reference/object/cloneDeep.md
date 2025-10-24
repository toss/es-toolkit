# cloneDeep

与えられた値をディープコピーします。

```typescript
const deepCloned = cloneDeep(obj);
```

## 参照

### `cloneDeep(obj)`

オブジェクトや配列を、ネストされた構造まですべて新しくコピーしたい場合は `cloneDeep` を使用してください。ディープコピーは、すべてのネストされたオブジェクトと配列を完全に独立してコピーするため、元の値とコピーはお互いに影響しません。

```typescript
import { cloneDeep } from 'es-toolkit/object';

// プリミティブ値はそのまま返されます
const num = 29;
const clonedNum = cloneDeep(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// ネストされたオブジェクトをディープコピー
const obj = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const clonedObj = cloneDeep(obj);
console.log(clonedObj); // { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] }
console.log(clonedObj === obj); // false
console.log(clonedObj.a === obj.a); // false (ネストされたオブジェクトも新しくコピーされます)
console.log(clonedObj.d === obj.d); // false (ネストされた配列も新しくコピーされます)
console.log(clonedObj.d[2] === obj.d[2]); // false (配列内のオブジェクトも新しくコピーされます)

// 元の値を修正してもコピーに影響しません
const original = { a: { count: 1 } };
const copied = cloneDeep(original);
original.a.count = 2;
console.log(copied.a.count); // 1 (変わりません)
```

`Map` や `Set` などのさまざまな JavaScript 型をサポートし、循環参照も安全に処理します。

```typescript
// Map と Set をディープコピー
const map = new Map([['key', { nested: 'value' }]]);
const clonedMap = cloneDeep(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key') !== map.get('key')); // true (ネストされたオブジェクトも新しくコピーされます)

// 循環参照も安全に処理
const circular: any = { name: 'test' };
circular.self = circular;
const clonedCircular = cloneDeep(circular);
console.log(clonedCircular !== circular); // true
console.log(clonedCircular.self === clonedCircular); // true (循環参照が維持されます)
```

getter として定義された読み取り専用プロパティの場合、コピーされたオブジェクトには getter の戻り値が通常のプロパティとして保存されます。

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

#### パラメータ

- `obj` (`T`):ディープコピーする値です。オブジェクト、配列、プリミティブ値など、すべての型が可能です。

#### 戻り値

(`T`):与えられた値のディープコピーです。
