# cloneDeep

创建给定值的深拷贝。

```typescript
const deepCloned = cloneDeep(obj);
```

## 参考

### `cloneDeep(obj)`

当您想要完整复制对象或数组(包括所有嵌套结构)时使用 `cloneDeep`。深拷贝会完全独立地复制所有嵌套的对象和数组,使原始值和副本互不影响。

```typescript
import { cloneDeep } from 'es-toolkit/object';

// 原始值按原样返回
const num = 29;
const clonedNum = cloneDeep(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// 深拷贝嵌套对象
const obj = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const clonedObj = cloneDeep(obj);
console.log(clonedObj); // { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] }
console.log(clonedObj === obj); // false
console.log(clonedObj.a === obj.a); // false (嵌套对象也被复制)
console.log(clonedObj.d === obj.d); // false (嵌套数组也被复制)
console.log(clonedObj.d[2] === obj.d[2]); // false (数组中的对象也被复制)

// 修改原始值不影响副本
const original = { a: { count: 1 } };
const copied = cloneDeep(original);
original.a.count = 2;
console.log(copied.a.count); // 1 (未改变)
```

支持各种 JavaScript 类型,如 `Map` 和 `Set`,并能安全处理循环引用。

```typescript
// 深拷贝 Map 和 Set
const map = new Map([['key', { nested: 'value' }]]);
const clonedMap = cloneDeep(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key') !== map.get('key')); // true (嵌套对象也被复制)

// 安全处理循环引用
const circular: any = { name: 'test' };
circular.self = circular;
const clonedCircular = cloneDeep(circular);
console.log(clonedCircular !== circular); // true
console.log(clonedCircular.self === clonedCircular); // true (保持循环引用)
```

对于由 getter 定义的只读属性,getter 的返回值将作为普通属性存储在复制的对象中。

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

#### 参数

- `obj` (`T`):要深拷贝的值。可以是任何类型,如对象、数组或原始值。

#### 返回值

(`T`):给定值的深拷贝。
